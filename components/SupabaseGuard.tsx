
import React from 'react';
import { isSupabaseConfigured } from '../lib/supabaseClient';

interface SupabaseGuardProps {
  children: React.ReactNode;
}

const SupabaseGuard: React.FC<SupabaseGuardProps> = ({ children }) => {
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#1A2F1F]">Configuration Required</h2>
          <p className="text-gray-500 font-light text-sm leading-relaxed">
            Please set your <code className="bg-gray-100 px-2 py-0.5 rounded text-[#1A2F1F] font-mono">VITE_SUPABASE_URL</code> and <code className="bg-gray-100 px-2 py-0.5 rounded text-[#1A2F1F] font-mono">VITE_SUPABASE_ANON_KEY</code> environment variables to connect the estate database.
          </p>
          <div className="pt-6">
            <a href="https://supabase.com" target="_blank" className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D4AF37] hover:text-[#1A2F1F] transition-colors">
              Visit Supabase Console &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SupabaseGuard;
