
import { createClient } from "@supabase/supabase-js";

/**
 * Safely retrieves environment variables from common JS environments.
 * Checks both Vite's `import.meta.env` and the standard `process.env`.
 */
const getEnvVar = (key: string): string | undefined => {
  try {
    // Check Vite/ESM environment
    const metaEnv = (import.meta as any).env;
    if (metaEnv && metaEnv[key]) {
      return metaEnv[key];
    }
    
    // Check process.env (Node/CommonJS/Bundlers)
    const procEnv = (globalThis as any).process?.env;
    if (procEnv && procEnv[key]) {
      return procEnv[key];
    }
  } catch (e) {
    // Silently fail and return undefined if access is restricted
  }
  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * The Supabase client is initialized only if the required configuration exists.
 * If not, it returns null, and the API layer will gracefully fallback to mock data.
 */
export const supabase = (isSupabaseConfigured && supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
