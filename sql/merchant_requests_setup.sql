-- =====================================================
-- MERCHANT REQUESTS TABLE SCHEMA FOR SUPABASE
-- =====================================================
-- Updated to match the exact structure from merchant_requests_rows.csv
-- Columns: id, name, slug, chapter, description, reward, solution, image_url, created_at, updated_at
-- =====================================================

-- Check if merchant_requests table exists, if not create it
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'merchant_requests') THEN
        CREATE TABLE public.merchant_requests (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            chapter INTEGER,
            description TEXT,
            reward TEXT,
            solution TEXT,
            image_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );
    END IF;
END $$;

-- Add slug column if it doesn't exist (for existing tables)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'merchant_requests' 
        AND column_name = 'slug'
    ) THEN
        ALTER TABLE public.merchant_requests ADD COLUMN slug TEXT;
    END IF;
END $$;

-- Make slug unique if not already
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'merchant_requests_slug_key'
    ) THEN
        ALTER TABLE public.merchant_requests ADD CONSTRAINT merchant_requests_slug_key UNIQUE (slug);
    END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_merchant_requests_chapter ON public.merchant_requests(chapter);
CREATE INDEX IF NOT EXISTS idx_merchant_requests_slug ON public.merchant_requests(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE public.merchant_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access" ON public.merchant_requests;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.merchant_requests;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.merchant_requests;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.merchant_requests;

-- Create RLS policies
CREATE POLICY "Allow public read access" ON public.merchant_requests
    FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated insert" ON public.merchant_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON public.merchant_requests
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON public.merchant_requests
    FOR DELETE
    TO authenticated
    USING (true);

-- Create or replace function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS set_updated_at ON public.merchant_requests;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.merchant_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- SAMPLE DATA BASED ON CSV
-- =====================================================
-- Insert sample data matching the CSV structure
-- Uncomment to use:

/*
INSERT INTO public.merchant_requests (id, name, slug, chapter, description, reward, solution, image_url) VALUES
('972e4a21-c209-4ad3-903c-5f1378361fbf', 'Destroy the Farm Blue Medallions', 'bluefram', 1, 'destroy medalions', '3x Spinel', 'kill', null)
ON CONFLICT (id) DO NOTHING;
*/

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'merchant_requests'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE tablename = 'merchant_requests';

-- Count records
SELECT COUNT(*) as total_requests FROM public.merchant_requests;

-- View all merchant requests
SELECT 
    id,
    name,
    slug,
    chapter,
    description,
    reward,
    solution,
    image_url,
    created_at,
    updated_at
FROM public.merchant_requests
ORDER BY chapter, name;

-- =====================================================
-- HELPER QUERIES FOR DATA MANAGEMENT
-- =====================================================

-- Add a new merchant request:
/*
INSERT INTO public.merchant_requests (name, slug, chapter, description, reward, solution, image_url) VALUES
('Request Name', 'request-slug', 1, 'Description here', '3x Spinel', 'Solution hint', '/images/photo1764598442.jpg');
*/

-- Update a merchant request:
/*
UPDATE public.merchant_requests 
SET description = 'Updated description',
    reward = '5x Spinel'
WHERE slug = 'bluefram';
*/

-- Delete a merchant request:
/*
DELETE FROM public.merchant_requests 
WHERE slug = 'request-slug';
*/