
import React, { useEffect } from 'react';
import { isSupabaseConfigured } from '../lib/supabaseClient';

interface SupabaseGuardProps {
  children: React.ReactNode;
}

const SupabaseGuard: React.FC<SupabaseGuardProps> = ({ children }) => {
  useEffect(() => {
    if (!isSupabaseConfigured) {
      console.info("Estate Management: Supabase is not configured. Running in high-fidelity preview mode with mock data.");
    }
  }, []);

  // Removed the blocking UI. The app now uses the API layer's fallback logic.
  return <>{children}</>;
};

export default SupabaseGuard;
