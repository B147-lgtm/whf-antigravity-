
import { createClient } from "@supabase/supabase-js";

/**
 * Safely retrieves environment variables from common environments.
 * We must use explicit import.meta.env.VITE_... for Vite static replacement
 * during production builds.
 */

// 1. Vite Environment (These must be exactly authored as literal import.meta.env.VITE_...)
const getViteEnv = (key: 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY') => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      if (key === 'VITE_SUPABASE_URL') return (import.meta as any).env.VITE_SUPABASE_URL;
      if (key === 'VITE_SUPABASE_ANON_KEY') return (import.meta as any).env.VITE_SUPABASE_ANON_KEY;
    }
  } catch (e) {
    // Ignore
  }
  return undefined;
};

// 2. Node/Vercel standard fallback (process.env)
const getProcessEnv = (key: string) => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key];
    }
  } catch (e) {
    // Ignore
  }
  return undefined;
};

const supabaseUrl =
  getViteEnv('VITE_SUPABASE_URL') ||
  getProcessEnv('VITE_SUPABASE_URL') ||
  getProcessEnv('SUPABASE_URL') ||
  getProcessEnv('NEXT_PUBLIC_SUPABASE_URL') ||
  'https://dvktzelzteixqiophgwl.supabase.co';

const supabaseAnonKey =
  getViteEnv('VITE_SUPABASE_ANON_KEY') ||
  getProcessEnv('VITE_SUPABASE_ANON_KEY') ||
  getProcessEnv('SUPABASE_ANON_KEY') ||
  getProcessEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3R6ZWx6dGVpeHFpb3BoZ3dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MDU4OTMsImV4cCI6MjA4NzM4MTg5M30.EMitfmlaixfcS83toOx0JLUdZvv32-REiHdHnZsNM-Q';

console.log("Supabase Initialization:", {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 10)}...` : 'MISSING',
  hasKey: !!supabaseAnonKey
});

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * The Supabase client is initialized only if the required configuration exists.
 * If not, it returns null, and the API layer will gracefully fallback to mock data.
 */
export const supabase = (isSupabaseConfigured && supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
