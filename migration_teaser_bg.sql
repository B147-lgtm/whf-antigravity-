-- Add teaser_bg_url to site_settings if it doesn't exist
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS teaser_bg_url TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=2000';
