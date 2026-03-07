-- Add the manual ordering column to the gallery media table
ALTER TABLE gallery_media ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Optional: If you want all current items to start at 0 immediately, you can run this just in case:
UPDATE gallery_media SET display_order = 0 WHERE display_order IS NULL;
