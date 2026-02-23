-- Wood Heaven Farms - Universal Management Setup

-- 1. Location Settings (Already exists, but adding a check for columns)
-- ALTER TABLE location_settings ADD COLUMN IF NOT EXISTS about_text TEXT DEFAULT 'Situated in the serene Green Triveni enclave, Wood Heaven Farms offers a peaceful escape with convenient access to Jaipur''s main landmarks.';

-- 2. Estate Sections (Accommodations, Leisure, Service)
CREATE TABLE IF NOT EXISTS estate_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    tag TEXT NOT NULL,
    description TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Estate Protocols/Manifesto
CREATE TABLE IF NOT EXISTS estate_protocols (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Content Blocks (For Hero sections, descriptions, etc.)
CREATE TABLE IF NOT EXISTS content_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_name TEXT NOT NULL,
    section_key TEXT NOT NULL,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    image_url TEXT,
    extra_data JSONB,
    UNIQUE(page_name, section_key)
);

-- Enable RLS
ALTER TABLE estate_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE estate_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;

-- Public Read Access
CREATE POLICY "Public Read Access" ON estate_sections FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON estate_protocols FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON content_blocks FOR SELECT USING (true);

-- Admin All Access
CREATE POLICY "Admin All Access" ON estate_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON estate_protocols FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON content_blocks FOR ALL USING (auth.role() = 'authenticated');

-- Seed Data (Estate Sections)
INSERT INTO estate_sections (title, tag, description, items, display_order)
VALUES 
('Accommodations', 'Residential', 'A sanctuary of rest where Rajasthani heritage meets modern minimalist luxury. Each suite is a private haven.', 
 '[{"label": "Presidential Suite", "detail": "1200+ sq. ft. of pure luxury. Features a private sun deck, walk-in closet, and panoramic lawn views."}, 
  {"label": "8 Deluxe Suites", "detail": "Individually curated interiors with king-sized royal bedding and curated art pieces."}, 
  {"label": "20 Person Capacity", "detail": "Optimized for large-scale family gatherings without compromising on individual privacy."}, 
  {"label": "Open-Air Baths", "detail": "Select suites feature private outdoor showers under the canopy of Jaipur''s stars."}]'::jsonb, 0),
('Leisure & Grounds', 'Recreation', 'Sprawling across acres of manicured greens, our grounds offer diverse spaces for reflection and celebration.', 
 '[{"label": "The Infinity Pool", "detail": "Temperature-controlled azure waters with a submerged lounging deck and poolside service."}, 
  {"label": "The Vesper Garden", "detail": "An intimate bar garden designed for sunset cocktails and moonlit conversations."}, 
  {"label": "Three Grand Lawns", "detail": "Versatile emerald carpets capable of hosting up to 200 guests for private events."}, 
  {"label": "The Fire Pit", "detail": "A sunken stone hearth for evening storytelling, toasted marshmallows, and winter warmth."}]'::jsonb, 1)
ON CONFLICT DO NOTHING;

-- Seed Data (Estate Protocols)
INSERT INTO estate_protocols (title, text, display_order)
VALUES 
('Exclusive Access', 'The estate is exclusively yours. We never host overlapping groups, ensuring total privacy.', 0),
('Curated Sound', 'We celebrate life, but respect the land. High-decibel music is moved to our soundproof basement after 10 PM.', 1),
('External Vendors', 'We maintain high standards. External catering and decor require prior approval by our estate manager.', 2),
('Land Stewardship', 'Guests are guardians of the estate. We ask for mindful enjoyment of our rare flora and fixtures.', 3)
ON CONFLICT DO NOTHING;

-- Seed Data (Content Blocks)
INSERT INTO content_blocks (page_name, section_key, title, description)
VALUES 
('Estate', 'hero', 'Designed for Distinction', 'Wood Heaven Farms is not just a destination; it is a meticulously crafted lifestyle. Every suite, garden, and service is a testament to the art of fine living.'),
('Estate', 'signature_wing', 'The Presidential Suite', 'Our crown jewel. A massive residential suite featuring a double-height ceiling, bespoke handcrafted furniture, and a private balcony that offers the finest view of the sunrise over our infinity pool.'),
('Estate', 'manifesto', 'The Estate Manifesto', 'Our Ethos')
ON CONFLICT (page_name, section_key) DO NOTHING;
