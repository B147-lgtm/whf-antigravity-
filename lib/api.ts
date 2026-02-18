
import { supabase } from './supabaseClient';
import { 
  SITE_SETTINGS, 
  HIGHLIGHTS, 
  EXPERIENCES, 
  TESTIMONIALS, 
  GALLERY_ITEMS, 
  LOCATION_SETTINGS 
} from '../data/mockData';

export const getSiteSettings = async () => {
  if (!supabase) return SITE_SETTINGS;
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .single();
  if (error) return SITE_SETTINGS;
  return data;
};

export const getHomeHighlights = async () => {
  if (!supabase) return HIGHLIGHTS;
  const { data, error } = await supabase
    .from('home_highlights')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) return HIGHLIGHTS;
  return data;
};

export const getExperiences = async () => {
  if (!supabase) return EXPERIENCES;
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) return EXPERIENCES;
  return data;
};

export const getTestimonials = async () => {
  if (!supabase) return TESTIMONIALS;
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) return TESTIMONIALS;
  return data;
};

export const getGalleryMedia = async (category?: string) => {
  if (!supabase) {
    return category && category !== 'All' 
      ? GALLERY_ITEMS.filter(item => item.category === category)
      : GALLERY_ITEMS;
  }
  let query = supabase.from('gallery_media').select('*');
  if (category && category !== 'All') {
    query = query.eq('category', category);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) return GALLERY_ITEMS;
  return data;
};

export const getLocationSettings = async () => {
  if (!supabase) return LOCATION_SETTINGS;
  const { data, error } = await supabase
    .from('location_settings')
    .select('*')
    .eq('id', 1)
    .single();
  if (error) return LOCATION_SETTINGS;
  return data;
};

export const createEnquiry = async (payload: any) => {
  if (!supabase) {
    console.warn("Supabase not configured. Enquiry payload:", payload);
    return { status: 'mocked' };
  }
  const { data, error } = await supabase
    .from('enquiries')
    .insert([{ ...payload, page_source: 'website' }]);
  if (error) throw error;
  return data;
};
