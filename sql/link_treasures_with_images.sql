-- Update treasures_images schema - Safe to run multiple times
-- This script handles existing policies and tables gracefully

BEGIN;

-- Step 1: Create treasures_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS treasures_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    treasure_id UUID NOT NULL REFERENCES treasures(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_file BYTEA,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 2: Add primary_image_id to treasures table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'treasures' AND column_name = 'primary_image_id'
    ) THEN
        ALTER TABLE treasures 
        ADD COLUMN primary_image_id UUID REFERENCES treasures_images(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Step 3: Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_treasures_images_treasure_id ON treasures_images(treasure_id);
CREATE INDEX IF NOT EXISTS idx_treasures_images_primary ON treasures_images(treasure_id, is_primary) WHERE is_primary = true;
CREATE INDEX IF NOT EXISTS idx_treasures_primary_image ON treasures(primary_image_id);

-- Step 4: Enable RLS
ALTER TABLE treasures_images ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop existing policies if they exist, then recreate
DROP POLICY IF EXISTS "Public can view treasure images" ON treasures_images;
DROP POLICY IF EXISTS "Authenticated users can insert treasure images" ON treasures_images;
DROP POLICY IF EXISTS "Authenticated users can update treasure images" ON treasures_images;
DROP POLICY IF EXISTS "Authenticated users can delete treasure images" ON treasures_images;

-- Step 6: Create fresh policies
CREATE POLICY "Public can view treasure images" 
    ON treasures_images FOR SELECT 
    USING (true);

CREATE POLICY "Authenticated users can insert treasure images" 
    ON treasures_images FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update treasure images" 
    ON treasures_images FOR UPDATE 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete treasure images" 
    ON treasures_images FOR DELETE 
    USING (auth.role() = 'authenticated');

-- Step 7: Create or replace function to maintain primary_image_id
CREATE OR REPLACE FUNCTION sync_treasure_primary_image()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_primary = true THEN
        -- Unmark other images as primary for this treasure
        UPDATE treasures_images 
        SET is_primary = false 
        WHERE treasure_id = NEW.treasure_id 
        AND id != NEW.id 
        AND is_primary = true;
        
        -- Update the treasure's primary_image_id
        UPDATE treasures 
        SET primary_image_id = NEW.id 
        WHERE id = NEW.treasure_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Drop and recreate trigger
DROP TRIGGER IF EXISTS trigger_sync_treasure_primary_image ON treasures_images;
CREATE TRIGGER trigger_sync_treasure_primary_image
    AFTER INSERT OR UPDATE OF is_primary ON treasures_images
    FOR EACH ROW
    EXECUTE FUNCTION sync_treasure_primary_image();

-- Step 9: Create or replace function for updated_at
CREATE OR REPLACE FUNCTION update_treasures_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 10: Drop and recreate updated_at trigger
DROP TRIGGER IF EXISTS trigger_treasures_images_updated_at ON treasures_images;
CREATE TRIGGER trigger_treasures_images_updated_at
    BEFORE UPDATE ON treasures_images
    FOR EACH ROW
    EXECUTE FUNCTION update_treasures_images_updated_at();

COMMIT;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'treasures_images schema updated successfully!';
    RAISE NOTICE 'You can now add images to treasures using the treasures_images table.';
END $$;