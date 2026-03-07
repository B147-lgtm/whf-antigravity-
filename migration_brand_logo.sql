-- Add new column for brand logo
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS brand_logo_url TEXT DEFAULT '';

-- Update the existing row (ID 1) with the placeholder logo to match the current look until the user uploads their own
UPDATE site_settings 
SET brand_logo_url = 'https://images.unsplash.com/photo-1505533321630-975218a5f66f?auto=format&fit=crop&q=80&w=200&h=200'
WHERE id = 1 AND (brand_logo_url IS NULL OR brand_logo_url = '');
