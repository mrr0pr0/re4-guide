-- Allow public access to maps, pins, and categories for development purposes
-- WARNING: This disables security for these tables. In production, you should use authenticated policies.

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can insert maps" ON maps;
DROP POLICY IF EXISTS "Admins can update maps" ON maps;
DROP POLICY IF EXISTS "Admins can delete maps" ON maps;

DROP POLICY IF EXISTS "Admins can insert categories" ON pin_categories;
DROP POLICY IF EXISTS "Admins can update categories" ON pin_categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON pin_categories;

DROP POLICY IF EXISTS "Admins can insert pins" ON pins;
DROP POLICY IF EXISTS "Admins can update pins" ON pins;
DROP POLICY IF EXISTS "Admins can delete pins" ON pins;

-- Create permissive policies
CREATE POLICY "Public can insert maps" ON maps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update maps" ON maps FOR UPDATE USING (true);
CREATE POLICY "Public can delete maps" ON maps FOR DELETE USING (true);

CREATE POLICY "Public can insert categories" ON pin_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update categories" ON pin_categories FOR UPDATE USING (true);
CREATE POLICY "Public can delete categories" ON pin_categories FOR DELETE USING (true);

CREATE POLICY "Public can insert pins" ON pins FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update pins" ON pins FOR UPDATE USING (true);
CREATE POLICY "Public can delete pins" ON pins FOR DELETE USING (true);
