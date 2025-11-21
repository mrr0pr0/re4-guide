-- Merchant Requests
CREATE TABLE merchant_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  chapter INTEGER,
  description TEXT NOT NULL,
  reward TEXT,
  solution TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE merchant_requests ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read" ON merchant_requests FOR SELECT USING (true);
