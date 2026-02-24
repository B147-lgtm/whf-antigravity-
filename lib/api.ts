
import { supabase } from './supabaseClient';
import {
  SITE_SETTINGS,
  HIGHLIGHTS,
  EXPERIENCES,
  TESTIMONIALS,
  GALLERY_ITEMS,
  LOCATION_SETTINGS
} from '../data/mockData';


const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number = 5000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeoutMs))
  ]);
};

export const getSiteSettings = async () => {
  if (!supabase) return SITE_SETTINGS;
  try {
    const { data, error } = await withTimeout(
      supabase.from('site_settings').select('*').eq('id', 1).single()
    );
    if (error || !data) return SITE_SETTINGS;
    return data;
  } catch (e) {
    console.warn("Supabase Fetch Timeout (site_settings), falling back to mocks.");
    return SITE_SETTINGS;
  }
};

export const getHomeHighlights = async () => {
  if (!supabase) return HIGHLIGHTS;
  try {
    const { data, error } = await withTimeout(
      supabase.from('home_highlights').select('*').order('created_at', { ascending: true })
    );
    if (error || !data) return HIGHLIGHTS;
    return data;
  } catch (e) {
    return HIGHLIGHTS;
  }
};

export const getExperiences = async () => {
  if (!supabase) return EXPERIENCES;
  try {
    const { data, error } = await withTimeout(
      supabase.from('experiences').select('*').order('created_at', { ascending: true })
    );
    if (error || !data) return EXPERIENCES;
    return data;
  } catch (e) {
    return EXPERIENCES;
  }
};

export const getTestimonials = async () => {
  if (!supabase) return TESTIMONIALS;
  try {
    const { data, error } = await withTimeout(
      supabase.from('testimonials').select('*').order('created_at', { ascending: true })
    );
    if (error || !data) return TESTIMONIALS;
    return data;
  } catch (e) {
    return TESTIMONIALS;
  }
};

export const getGalleryMedia = async (category?: string) => {
  if (!supabase) {
    return category && category !== 'All'
      ? GALLERY_ITEMS.filter(item => item.category === category)
      : GALLERY_ITEMS;
  }
  try {
    let query = supabase.from('gallery_media').select('*');
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    const { data, error } = await withTimeout(query.order('created_at', { ascending: false }));
    if (error || !data) return GALLERY_ITEMS;
    return data;
  } catch (e) {
    return GALLERY_ITEMS;
  }
};

export const getLocationSettings = async () => {
  if (!supabase) return LOCATION_SETTINGS;
  try {
    const { data, error } = await withTimeout(
      supabase.from('location_settings').select('*').eq('id', 1).single()
    );
    if (error || !data) return LOCATION_SETTINGS;
    return data;
  } catch (e) {
    return LOCATION_SETTINGS;
  }
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

export const getEstateSections = async () => {
  if (!supabase) return [];
  try {
    const { data, error } = await withTimeout(
      supabase.from('estate_sections').select('*').order('display_order', { ascending: true })
    );
    if (error || !data) return [];
    return data;
  } catch (e) {
    return [];
  }
};

export const getEstateProtocols = async () => {
  if (!supabase) return [];
  try {
    const { data, error } = await withTimeout(
      supabase.from('estate_protocols').select('*').order('display_order', { ascending: true })
    );
    if (error || !data) return [];
    return data;
  } catch (e) {
    return [];
  }
};

export const getContentBlocks = async (pageName: string) => {
  if (!supabase) return [];
  try {
    const { data, error } = await withTimeout(
      supabase.from('content_blocks').select('*').eq('page_name', pageName)
    );
    if (error || !data) return [];
    return data;
  } catch (e) {
    return [];
  }
};
