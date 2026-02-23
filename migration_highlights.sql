-- Populate Highlights with default categories and images
INSERT INTO home_highlights (label, image_url)
VALUES 
('Presidential Suite', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'),
('Pool & Sundeck', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1200'),
('Event Lawns', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'),
('Elegant Dining', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200'),
('Bar Garden', 'https://images.unsplash.com/photo-1534349762230-e0caaef4c62b?auto=format&fit=crop&q=80&w=1200'),
('Living Area', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200')
ON CONFLICT DO NOTHING;
