-- Seed data for Supabase tables

-- Chapters
INSERT INTO chapters (chapter_number, title, slug, description, content, thumbnail_url) VALUES
(1, 'Chapter 1-1', 'chapter-1-1', 'Leon arrives in a desolate village in search of the President''s daughter.', '<h2>The Village</h2><p>Leon S. Kennedy arrives at the outskirts of a rural village in Spain. The locals are hostile.</p>', 'https://placehold.co/600x400?text=Chapter+1-1'),
(2, 'Chapter 1-2', 'chapter-1-2', 'Leon meets the Merchant and faces new threats.', '<h2>The Valley</h2><p>After escaping the village square, Leon proceeds to the valley where he finds the Hexagonal Emblem.</p>', 'https://placehold.co/600x400?text=Chapter+1-2'),
(3, 'Chapter 1-3', 'chapter-1-3', 'The lake monster awaits.', '<h2>Del Lago</h2><p>Leon must cross the lake to reach the church, but a giant creature stands in his way.</p>', 'https://placehold.co/600x400?text=Chapter+1-3');

-- Weapons
INSERT INTO weapons (name, slug, type, description, stats, upgrade_path, location, cost, image_url) VALUES
('SG-09 R', 'sg-09-r', 'Handgun', 'Standard issue handgun. Reliable and accurate.', '{"damage": 1.0, "fire_rate": 1.0, "capacity": 10, "reload_speed": 1.0}', '{"exclusive": "5x critical hit rate"}', 'Starting Weapon', 0, 'https://placehold.co/400x200?text=SG-09+R'),
('W-870', 'w-870', 'Shotgun', 'Pump-action shotgun. High power at close range.', '{"damage": 5.6, "fire_rate": 0.8, "capacity": 4, "reload_speed": 0.5}', '{"exclusive": "2x power"}', 'Village Square (Second Floor of House)', 0, 'https://placehold.co/400x200?text=W-870'),
('TMP', 'tmp', 'Submachine Gun', 'Compact SMG with a high rate of fire.', '{"damage": 0.5, "fire_rate": 2.5, "capacity": 30, "reload_speed": 1.2}', '{"exclusive": "1.5x power"}', 'Merchant (Chapter 3)', 4000, 'https://placehold.co/400x200?text=TMP'),
('SR M1903', 'sr-m1903', 'Rifle', 'Bolt-action rifle. High accuracy and damage.', '{"damage": 2.5, "fire_rate": 0.4, "capacity": 5, "reload_speed": 0.4}', '{"exclusive": "2x power"}', 'Merchant (Chapter 2)', 12000, 'https://placehold.co/400x200?text=SR+M1903');

-- Bosses
INSERT INTO bosses (name, slug, chapter, description, strategy, weaknesses, rewards, health, image_url) VALUES
('Del Lago', 'del-lago', 3, 'A massive salamander infected with Las Plagas.', 'Avoid the debris in the water. Throw harpoons when it surfaces. Brace for impact when it jumps.', '{"weakness": "Mouth (when open)"}', '{"drop": "None"}', 1000, 'https://placehold.co/600x400?text=Del+Lago'),
('El Gigante', 'el-gigante', 4, 'A towering giant with immense strength.', 'Shoot the plaga that emerges from its back. Use flash grenades to stun it.', '{"weakness": "Plaga on back"}', '{"drop": "Yellow Diamond"}', 2000, 'https://placehold.co/600x400?text=El+Gigante'),
('Bitores Mendez', 'bitores-mendez', 6, 'The village chief. Mutates into a terrifying creature.', 'Aim for the eye on his back. In the second phase, shoot the explosive barrels.', '{"weakness": "Eye on back, Head"}', '{"drop": "Mendez''s False Eye"}', 3000, 'https://placehold.co/600x400?text=Bitores+Mendez');

-- Treasures
INSERT INTO treasures (name, slug, type, value, location, chapter, description, image_url) VALUES
('Velvet Blue', 'velvet-blue', 'Gem', 2500, 'Village Square (Roof)', 1, 'A common blue gem used for trading.', 'https://placehold.co/200x200?text=Velvet+Blue'),
('Ruby', 'ruby', 'Gem', 3000, 'Factory', 2, 'A red gem found in dirty containers.', 'https://placehold.co/200x200?text=Ruby'),
('Pearl Pendant', 'pearl-pendant', 'Treasure', 5000, 'Farm (Shoot the lantern)', 1, 'A necklace with a large pearl. Don''t let it fall into the dirty water!', 'https://placehold.co/200x200?text=Pearl+Pendant'),
('Elegant Mask', 'elegant-mask', 'Treasure', 3000, 'Abandoned Factory', 2, 'A mask that can be inlaid with gems.', 'https://placehold.co/200x200?text=Elegant+Mask');

-- Maps
INSERT INTO maps (area, slug, chapter, map_image_url, markers) VALUES
('Village Square', 'village-square', 1, 'https://placehold.co/800x600?text=Map+Village+Square', '[{"x": 150, "y": 200, "type": "treasure", "name": "Velvet Blue"}, {"x": 300, "y": 400, "type": "weapon", "name": "W-870"}]'),
('Farm', 'farm', 1, 'https://placehold.co/800x600?text=Map+Farm', '[{"x": 100, "y": 100, "type": "treasure", "name": "Pearl Pendant"}, {"x": 500, "y": 300, "type": "request", "name": "Blue Medallions"}]');
