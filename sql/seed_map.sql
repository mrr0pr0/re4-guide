-- Insert a sample map
INSERT INTO maps (title, slug, image_url, order_index)
VALUES 
(
    'Village Square', 
    'village-square', 
    'https://oyster.ignimgs.com/mediawiki/apis.ign.com/resident-evil-4/8/8c/Village_Square_Map.jpg', 
    1
)
ON CONFLICT (slug) DO NOTHING;

-- Insert a sample pin for the map (assuming the map we just inserted has the slug 'village-square')
-- We use a subquery to get the map_id dynamically
INSERT INTO pins (map_id, category_id, x, y, title, description)
VALUES 
(
    (SELECT id FROM maps WHERE slug = 'village-square' LIMIT 1),
    (SELECT id FROM pin_categories WHERE slug = 'treasure' LIMIT 1),
    50.0, -- X coordinate (center)
    50.0, -- Y coordinate (center)
    'Velvet Blue',
    'Found in the mud near the cow.'
);
