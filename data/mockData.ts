
import { GalleryItem, Experience, Testimonial } from '../types';

export const SITE_SETTINGS = {
  hero_title: 'wood heaven Farms',
  hero_subtitle: 'Private Luxury farmhouse stay and event estate',
  hero_bg_url: 'https://images.unsplash.com/photo-1536431311719-398b6704d40f?auto=format&fit=crop&q=80&w=2000',
  whatsapp_number: '918852021119',
  whatsapp_prefill: 'Hi Wood Heaven Farms, I want to enquire about a booking.'
};

export const LOCATION_SETTINGS = {
  short_area: 'Sikar Road, Jaipur',
  address: "Wood Heaven Farms, 621, 622, Green Triveni, Opposite Ashiana Greens, Sikar Road, Jaipur, Rajasthan 302013",
  airport_time: '45m',
  railway_time: '30m',
  city_time: '15m'
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Presidential Suite', label: 'Presidential Master Suite' },
  { id: 'ps1', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Presidential Suite', label: 'Presidential Sun Terrace' },
  { id: '2', url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Pool', label: 'Infinity Pool' },
  { id: 'v1', url: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-and-palm-trees-at-sunset-1205-large.mp4', type: 'video', category: 'Pool', label: 'Poolside Sunset' },
  { id: '3', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Lawns', label: 'Event Lawns' },
  { id: '4', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Events', label: 'Dining Area' },
  { id: 'v2', url: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-luxurious-living-room-4467-large.mp4', type: 'video', category: 'Living Area', label: 'Lounge Cinematic' },
  { id: '5', url: 'https://images.unsplash.com/photo-1534349762230-e0caaef4c62b?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Bar Garden', label: 'Vesper Garden' },
  { id: '6', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Living Area', label: 'Grand Hall' },
  { id: '7', url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=1200', type: 'image', category: 'Bedrooms', label: 'Guest Room' },
];

export const HIGHLIGHTS = [
  { id: 'h1', label: 'Bedrooms', image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600' },
  { id: 'h2', label: 'Pool', image_url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=600' },
  { id: 'h3', label: 'Lawns', image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600' },
  { id: 'h4', label: 'Events', image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=600' },
  { id: 'h5', label: 'Bar Garden', image_url: 'https://images.unsplash.com/photo-1534349762230-e0caaef4c62b?auto=format&fit=crop&q=80&w=600' },
  { id: 'h6', label: 'Living Area', image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600' },
];

export const EXPERIENCES: Experience[] = [
  { id: 'e1', title: 'Luxury Staycations', description: 'Escape the city chaos in our private suites.', image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600' },
  { id: 'e2', title: 'Haldi & Mehendi', description: 'Traditional vibes meets modern luxury setups.', image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600' },
  { id: 'e3', title: 'Cocktail Nights', description: 'Glamorous evenings under the starlit sky.', image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=600' },
  { id: 'e4', title: 'Family Getaways', description: 'Reconnect in the peaceful lap of nature.', image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600' },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Rajesh Mehta', text: 'An absolute oasis. The gardens are pristine and the pool is magic.' },
  { id: 't2', name: 'Surbhi Sharma', text: 'The perfect venue for our Haldi ceremony. Staff was extremely supportive.' },
  { id: 't3', name: 'Vikram Singh', text: 'Spacious rooms and elegant decor. Truly a premium experience in Jaipur.' },
];
