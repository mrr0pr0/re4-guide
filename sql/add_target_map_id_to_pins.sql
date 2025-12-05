-- Add target_map_id column to pins table for teleport functionality
ALTER TABLE pins ADD COLUMN IF NOT EXISTS target_map_id UUID REFERENCES maps(id) ON DELETE SET NULL;

-- Add comment to explain the column
COMMENT ON COLUMN pins.target_map_id IS 'Used for teleport pins to reference the destination map';
