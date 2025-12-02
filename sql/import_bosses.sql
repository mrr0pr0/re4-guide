-- Import bosses data into Supabase
-- Run this SQL in your Supabase SQL Editor

-- First, ensure the bosses table exists with the correct structure
CREATE TABLE IF NOT EXISTS bosses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    chapter INTEGER,
    description TEXT,
    strategy TEXT,
    weaknesses JSONB,
    rewards JSONB,
    health INTEGER,
    image_url TEXT,
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert bosses data
INSERT INTO bosses (id, name, slug, chapter, description, strategy, weaknesses, rewards, health, image_url, video_url, created_at, updated_at) VALUES
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Salazar', 'salazar', 7, 'The lord of the castle, mutated by Las Plagas for the final battle.', 'Aim for the head and use explosive weapons when he charges.', '{"weakness": "Head"}', '{"drop": "None"}', 3000, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763728376/QL8shPGSQ3tXmqzWgq2JhZ-1200-80_tl2gyr.jpg', 'https://youtube.com', '2025-11-21 08:08:00+00', '2025-11-21 08:08:00+00'),
('3f2c4a1b-6d7e-4f9a-b1c2-3d4e5f6a7b8c', 'El Gigante', 'el-gigante', 4, 'A gigantic humanoid infected with Las Plagas, extremely strong but slow.', 'Aim for the head and use explosives when it grabs you. Dodge its attacks.', '{"weakness": "Head, when grabbed"}', '{"drop": "Money and sometimes Treasures"}', 2000, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763728420/gigante_pqin4t.avif', 'https://youtube.com', '2025-11-21 08:05:00+00', '2025-11-21 08:05:00+00'),
('7b8c9d0e-1f2a-4b3c-8d9e-0f1a2b3c4d5e', 'Dr. Salvador', 'dr-salvador', 5, 'A terrifying Ganado wielding a chainsaw, extremely dangerous up close.', 'Keep distance, shoot legs or head, and use flash grenades.', '{"weakness": "Head and Legs"}', '{"drop": "Green Herbs, First Aid Spray, Money"}', 1500, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763728470/re4_chainsaw_ganado_caf9b97a-c254-44ef-9057-fddc6260d311_hscchy.jpg', 'https://youtube.com', '2025-11-21 08:06:00+00', '2025-11-21 08:06:00+00'),
('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'Verdugo', 'verdugo', 6, 'A fast and lethal creature guarding Salazar''s castle, can climb walls and ceilings.', 'Use heavy weapons, aim for the head. Stay mobile to avoid attacks.', '{"weakness": "Head"}', '{"drop": "Money and Key Items"}', 2500, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763728571/how-to-kill-salazars-verdugo-assassin-in-the-resident-evil-4-remake_fxrl3v.jpg', 'https://youtube.com', '2025-11-21 08:07:00+00', '2025-11-21 08:07:00+00'),
('9de68ded-5a13-4d23-8305-bd51f79d5d58', 'Del Lago', 'del-lago', 3, 'A massive salamander infected with Las Plagas.', 'Avoid the debris in the water. Throw harpoons when it surfaces. Brace for impact when it jumps.', '{"weakness": "Mouth (when open)"}', '{"drop": "Money and sometimes Ammo/Treasure"}', 1000, 'https://res.cloudinary.com/dxeuo6xas/image/upload/v1763728636/Resident_Evil_4_Del_Lago_lake_monster_attack-1024x576_iup1ir.jpg', 'https://youtube.com', '2025-11-21 12:27:33+00', '2025-11-21 12:27:36+00')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    chapter = EXCLUDED.chapter,
    description = EXCLUDED.description,
    strategy = EXCLUDED.strategy,
    weaknesses = EXCLUDED.weaknesses,
    rewards = EXCLUDED.rewards,
    health = EXCLUDED.health,
    image_url = EXCLUDED.image_url,
    video_url = EXCLUDED.video_url,
    updated_at = NOW();

-- Enable Row Level Security
ALTER TABLE bosses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
DROP POLICY IF EXISTS "Allow public read access to bosses" ON bosses;
CREATE POLICY "Allow public read access to bosses"
ON bosses FOR SELECT
TO public
USING (true);