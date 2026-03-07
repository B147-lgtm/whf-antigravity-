-- Add new column for youtube video background
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS youtube_video_url TEXT DEFAULT '';

-- Update the existing row (ID 1) with an empty video placeholder so the user can easily overwrite it
UPDATE site_settings 
SET youtube_video_url = ''
WHERE id = 1 AND (youtube_video_url IS NULL);
