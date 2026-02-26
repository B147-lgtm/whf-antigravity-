
export interface GalleryItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  category: 'Presidential Suite' | 'Bedrooms' | 'Pool' | 'Lawns' | 'Events' | 'Bar Garden' | 'Living Area';
  label: string;
  thumbnail?: string; // Optional custom thumbnail for videos
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
}
