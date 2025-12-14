-- Create treasures_images table with proper structure
-- This table stores multiple images for each treasure

BEGIN;

-- Create the treasures_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS treasures_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    treasure_id UUID NOT NULL REFERENCES treasures(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_file BYTEA, -- Optional: store actual image binary data
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_treasures_images_treasure_id ON treasures_images(treasure_id);
CREATE INDEX IF NOT EXISTS idx_treasures_images_primary ON treasures_images(treasure_id, is_primary) WHERE is_primary = true;

-- Add comments to explain columns
COMMENT ON TABLE treasures_images IS 'Stores multiple images for each treasure item';
COMMENT ON COLUMN treasures_images.treasure_id IS 'Foreign key linking to the treasures table';
COMMENT ON COLUMN treasures_images.image_url IS 'URL of the image (e.g., Supabase Storage URL or external URL)';
COMMENT ON COLUMN treasures_images.image_file IS 'Optional: Binary data of the image file';
COMMENT ON COLUMN treasures_images.alt_text IS 'Alternative text for accessibility';
COMMENT ON COLUMN treasures_images.display_order IS 'Order in which images should be displayed';
COMMENT ON COLUMN treasures_images.is_primary IS 'Whether this is the primary/main image for the treasure';

-- Enable Row Level Security
ALTER TABLE treasures_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view treasure images" 
    ON treasures_images FOR SELECT 
    USING (true);

-- Create policies for authenticated users (admins) to manage images
CREATE POLICY "Authenticated users can insert treasure images" 
    ON treasures_images FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update treasure images" 
    ON treasures_images FOR UPDATE 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete treasure images" 
    ON treasures_images FOR DELETE 
    USING (auth.role() = 'authenticated');

-- Add a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_treasures_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS trigger_treasures_images_updated_at ON treasures_images;
CREATE TRIGGER trigger_treasures_images_updated_at
    BEFORE UPDATE ON treasures_images
    FOR EACH ROW
    EXECUTE FUNCTION update_treasures_images_updated_at();

COMMIT;