
import { supabase } from './supabaseClient';

export const getSiteSettings = async () => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .single();
  if (error) throw error;
  return data;
};

export const getHomeHighlights = async () => {
  const { data, error } = await supabase
    .from('home_highlights')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const getExperiences = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const getTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const getGalleryMedia = async (category?: string) => {
  let query = supabase.from('gallery_media').select('*');
  if (category && category !== 'All') {
    query = query.eq('category', category);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getLocationSettings = async () => {
  const { data, error } = await supabase
    .from('location_settings')
    .select('*')
    .eq('id', 1)
    .single();
  if (error) throw error;
  return data;
};

export const createEnquiry = async (payload: any) => {
  const { data, error } = await supabase
    .from('enquiries')
    .insert([{ ...payload, page_source: 'website' }]);
  if (error) throw error;
  return data;
};
