-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Walkthrough chapters
CREATE TABLE chapters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  chapter_number INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weapons
CREATE TABLE weapons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- handgun, shotgun, rifle, etc.
  description TEXT,
  stats JSONB, -- damage, fire_rate, capacity, etc.
  upgrade_path JSONB,
  location TEXT,
  cost INTEGER,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bosses
CREATE TABLE bosses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  chapter INTEGER,
  description TEXT,
  strategy TEXT NOT NULL,
  weaknesses JSONB,
  rewards JSONB,
  health INTEGER,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Treasures
CREATE TABLE treasures (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT, -- treasure, gem, valuable
  value INTEGER NOT NULL,
  location TEXT NOT NULL,
  chapter INTEGER,
  description TEXT,
  image_url TEXT,
  map_coordinates JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Maps
CREATE TABLE maps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  area TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  chapter INTEGER,
  map_image_url TEXT NOT NULL,
  markers JSONB, -- array of collectibles, items, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User favorites
CREATE TABLE favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, -- weapon, boss, treasure, chapter
  item_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- Enable Row Level Security
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE weapons ENABLE ROW LEVEL SECURITY;
ALTER TABLE bosses ENABLE ROW LEVEL SECURITY;
ALTER TABLE treasures ENABLE ROW LEVEL SECURITY;
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Public read access for content
CREATE POLICY "Allow public read" ON chapters FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON weapons FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON bosses FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON treasures FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON maps FOR SELECT USING (true);

-- Authenticated users can manage their favorites
CREATE POLICY "Users can manage favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);