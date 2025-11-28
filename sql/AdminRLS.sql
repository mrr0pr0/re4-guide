-- Enable write access for public (for development/admin panel usage)
-- WARNING: This allows ANYONE with the anon key to modify data.
-- Ideally, you should use authentication and restrict this to admin users.
-- But for this "admin panel" to work without auth implementation, we need these policies.

-- Weapons
CREATE POLICY "Allow public insert" ON weapons FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON weapons FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON weapons FOR DELETE USING (true);

-- Bosses
CREATE POLICY "Allow public insert" ON bosses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON bosses FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON bosses FOR DELETE USING (true);

-- Treasures
CREATE POLICY "Allow public insert" ON treasures FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON treasures FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON treasures FOR DELETE USING (true);

-- Walkthrough / Chapters
CREATE POLICY "Allow public insert" ON chapters FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON chapters FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON chapters FOR DELETE USING (true);

-- Maps (if not already enabled)
CREATE POLICY "Allow public insert" ON maps FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON maps FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON maps FOR DELETE USING (true);

-- Pins
CREATE POLICY "Allow public insert" ON pins FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON pins FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON pins FOR DELETE USING (true);
