-- Puzzles
CREATE TABLE puzzles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  chapter INTEGER,
  location TEXT,
  solution TEXT NOT NULL,
  difficulty TEXT, -- Easy, Normal, Hard
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE puzzles ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read" ON puzzles FOR SELECT USING (true);
