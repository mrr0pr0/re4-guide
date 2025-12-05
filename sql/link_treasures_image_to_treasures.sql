-- Add treasure_id column to treasures_image table to link it to treasures
ALTER TABLE treasures_image ADD COLUMN IF NOT EXISTS treasure_id UUID REFERENCES treasures(id) ON DELETE CASCADE;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_treasures_image_treasure_id ON treasures_image(treasure_id);

-- Add comment to explain the column
COMMENT ON COLUMN treasures_image.treasure_id IS 'Foreign key linking to the treasures table';

