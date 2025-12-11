-- Create public.treasures_image table if it does not exist (matches your 2025.sql spec)
BEGIN;

CREATE TABLE IF NOT EXISTS public.treasures_image (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  "Picture" TEXT,
  treasure_id UUID REFERENCES public.treasures(id) ON DELETE CASCADE
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_treasures_image_treasure_id ON public.treasures_image(treasure_id);

-- Enable RLS and set safe policies (idempotent)
ALTER TABLE public.treasures_image ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view treasure images" ON public.treasures_image;
DROP POLICY IF EXISTS "Authenticated users can insert treasure images" ON public.treasures_image;
DROP POLICY IF EXISTS "Authenticated users can update treasure images" ON public.treasures_image;
DROP POLICY IF EXISTS "Authenticated users can delete treasure images" ON public.treasures_image;

CREATE POLICY "Public can view treasure images" ON public.treasures_image FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert treasure images" ON public.treasures_image FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update treasure images" ON public.treasures_image FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete treasure images" ON public.treasures_image FOR DELETE USING (auth.role() = 'authenticated');

COMMIT;