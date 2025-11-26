-- Update pin_categories with new icons

UPDATE pin_categories SET icon = 'Watch' WHERE slug = 'clockwork';
UPDATE pin_categories SET icon = 'Heart' WHERE slug = 'healthitem';
UPDATE pin_categories SET icon = 'Flag' WHERE slug = 'quest';
UPDATE pin_categories SET icon = 'Box' WHERE slug = 'items';
UPDATE pin_categories SET icon = 'KeyRound' WHERE slug = 'Skey';
UPDATE pin_categories SET icon = 'FileText' WHERE slug = 'merchantReq';
UPDATE pin_categories SET icon = 'Crosshair' WHERE slug = 'weapon';
UPDATE pin_categories SET icon = 'Award' WHERE slug = 'Bluemed';
