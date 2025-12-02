-- Import weapons data into Supabase
-- Run this SQL in your Supabase SQL Editor

-- First, ensure the weapons table exists with the correct structure
CREATE TABLE IF NOT EXISTS weapons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT,
    description TEXT,
    stats JSONB,
    upgrade_path JSONB,
    location TEXT,
    cost NUMERIC,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert weapons data
INSERT INTO weapons (id, name, slug, type, description, stats, upgrade_path, location, cost, image_url, created_at, updated_at) VALUES
('051a92d5-e06f-4d50-8b9c-a1efc8577d25', 'Red9', 'R9', 'Handgun', 'A powerful 9 mm handgun with very high damage per shot but significant recoil and slow handling.', '{"damage": 1.5, "capacity": 8, "fire_rate": 0.9, "reload_speed": 0.85}', '{"exclusive": "1.5× power"}', 'Chapter 4 in the middle of the water in the shiprekk', 9800.0, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763719668/red9_cs34wk.webp', '2025-11-21 10:08:03+00', '2025-11-21 10:08:05+00'),
('1e74ef1e-95ca-451a-a5c3-0752e70c4a14', 'SR M1903', 'SRM1903', 'Rifle', 'A bolt-action sniper rifle built for long‑range precision and high single-shot power.', '{"power": 2.5, "capacity": 5, "fire_rate": 0.42, "reload_speed": 0.46}', '{"exclusive": "2× power"}', 'Merchant (Chapter 2)', 12000.0, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763723517/sr-m1903_iymufs.png', '2025-11-21 11:12:03.634193+00', '2025-11-21 11:12:03.634193+00'),
('28368e59-3cdb-4499-9b66-6f041a20782a', 'TMP', 'tmp', 'Submachine Gun', 'Compact SMG with a high rate of fire.', '{"damage": 0.5, "capacity": 30, "fire_rate": 2.5, "reload_speed": 1.2}', '{"exclusive": "1.5x power"}', 'Merchant (Chapter 3)', 4000.0, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763724409/tmp_vhjjjy.png', '2025-11-21 08:03:28.521887+00', '2025-11-21 08:03:28.521887+00'),
('28b1411b-31f4-455c-a8cc-f54d5914f538', 'Matilda', 'Matilda', 'Handgun', 'A 9 mm handgun that fires in 3‑round bursts (when the stock is attached), giving it a fast, SMG‑like feel.', '{"power": 1.3, "capacity": 18, "fire_rate": 0.96, "reload_speed": 1}', '{"exclusive": "2× ammo capacity (doubles magazine size)"}', 'Merchant (Trade 10 Spinels, from Chapter 8)', 20000.0, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763720136/Matilda_wwwfos.webp', '2025-11-21 10:14:48.073918+00', '2025-11-21 10:14:48.073918+00'),
('32985805-c443-4bab-8c37-d785dde74c85', 'Primal Knife', 'PrimKnife', 'Knife', 'A bonus melee blade that can become completely indestructible, letting you parry and stealth‑kill without worrying about durability', '{"power": 0.8, "durability": 1.6, "attack_speed": 1.1}', '{"exclusive": "Indestructibility (infinite durability)"}', 'Obtain by destroying all 16 Clockwork Castellans (one per chapter), then buy from the Extra Content Shop.', 1000.0, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763724998/primal-knife_cjytia.png', '2025-11-21 11:37:07.911294+00', '2025-11-21 11:37:07.911294+00')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    type = EXCLUDED.type,
    description = EXCLUDED.description,
    stats = EXCLUDED.stats,
    upgrade_path = EXCLUDED.upgrade_path,
    location = EXCLUDED.location,
    cost = EXCLUDED.cost,
    image_url = EXCLUDED.image_url,
    updated_at = NOW();

-- Enable Row Level Security
ALTER TABLE weapons ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
DROP POLICY IF EXISTS "Allow public read access to weapons" ON weapons;
CREATE POLICY "Allow public read access to weapons"
ON weapons FOR SELECT
TO public
USING (true);2