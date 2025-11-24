-- FIX SCHEMA SCRIPT
-- This script will DROP the existing incompatible tables and recreate them with the correct structure.
-- WARNING: This will delete existing map data.

-- 1. Drop existing tables if they exist
DROP TABLE IF EXISTS pins CASCADE;
DROP TABLE IF EXISTS pin_categories CASCADE;
DROP TABLE IF EXISTS maps CASCADE;

-- 2. Create Maps table (Correct Schema)
CREATE TABLE maps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Pin Categories table
CREATE TABLE pin_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL DEFAULT '#ffffff',
    icon TEXT,
    visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Pins table
CREATE TABLE pins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    map_id UUID REFERENCES maps(id) ON DELETE CASCADE,
    category_id UUID REFERENCES pin_categories(id) ON DELETE SET NULL,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    title TEXT,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Seed Categories
INSERT INTO pin_categories (name, slug, color, icon) VALUES
('Treasure', 'treasure', '#FFD700', 'Gem'),
('Merchant', 'merchant', '#00FF00', 'ShoppingBag'),
('Typewriter', 'save', '#FF8C00', 'Save'),
('Enemy', 'enemy', '#FF0000', 'Skull'),
('Key Item', 'key-item', '#3B82F6', 'Key')
ON CONFLICT (slug) DO NOTHING;

-- 6. Enable RLS
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE pin_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pins ENABLE ROW LEVEL SECURITY;

-- 7. Create Permissive Policies (for development)
CREATE POLICY "Public can select maps" ON maps FOR SELECT USING (true);
CREATE POLICY "Public can insert maps" ON maps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update maps" ON maps FOR UPDATE USING (true);
CREATE POLICY "Public can delete maps" ON maps FOR DELETE USING (true);

CREATE POLICY "Public can select categories" ON pin_categories FOR SELECT USING (true);
CREATE POLICY "Public can insert categories" ON pin_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update categories" ON pin_categories FOR UPDATE USING (true);
CREATE POLICY "Public can delete categories" ON pin_categories FOR DELETE USING (true);

CREATE POLICY "Public can select pins" ON pins FOR SELECT USING (true);
CREATE POLICY "Public can insert pins" ON pins FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update pins" ON pins FOR UPDATE USING (true);
CREATE POLICY "Public can delete pins" ON pins FOR DELETE USING (true);

-- 8. Seed Sample Map (Optional, but helpful)
INSERT INTO maps (title, slug, image_url, order_index)
VALUES 
(
    'Village Square', 
    'village-square', 
    'https://oyster.ignimgs.com/mediawiki/apis.ign.com/resident-evil-4/8/8c/Village_Square_Map.jpg', 
    1
);
