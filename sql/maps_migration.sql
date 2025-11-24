-- Create Maps table
CREATE TABLE IF NOT EXISTS maps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Pin Categories table
CREATE TABLE IF NOT EXISTS pin_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL DEFAULT '#ffffff',
    icon TEXT, -- Lucide icon name or URL
    visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Pins table
CREATE TABLE IF NOT EXISTS pins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    map_id UUID REFERENCES maps(id) ON DELETE CASCADE,
    category_id UUID REFERENCES pin_categories(id) ON DELETE SET NULL,
    x FLOAT NOT NULL, -- Percentage or Pixel coordinate
    y FLOAT NOT NULL, -- Percentage or Pixel coordinate
    title TEXT,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Categories
INSERT INTO pin_categories (name, slug, color, icon) VALUES
('Treasure', 'treasure', '#FFD700', 'Gem'),
('Merchant', 'merchant', '#00FF00', 'ShoppingBag'),
('Typewriter', 'save', '#FF8C00', 'Save'),
('Enemy', 'enemy', '#FF0000', 'Skull'),
('Key Item', 'key-item', '#3B82F6', 'Key')
ON CONFLICT (slug) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE pin_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE pins ENABLE ROW LEVEL SECURITY;

-- Create policies (Public Read, Admin Write)
-- Note: Adjust 'authenticated' role check if you have specific admin roles
CREATE POLICY "Public maps are viewable by everyone" ON maps FOR SELECT USING (true);
CREATE POLICY "Public categories are viewable by everyone" ON pin_categories FOR SELECT USING (true);
CREATE POLICY "Public pins are viewable by everyone" ON pins FOR SELECT USING (true);

-- For now, allow all operations for authenticated users (assuming only admin logs in)
-- In a real app, you'd check for admin role
CREATE POLICY "Admins can insert maps" ON maps FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update maps" ON maps FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete maps" ON maps FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert categories" ON pin_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update categories" ON pin_categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete categories" ON pin_categories FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert pins" ON pins FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update pins" ON pins FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete pins" ON pins FOR DELETE USING (auth.role() = 'authenticated');
