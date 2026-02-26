
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/supabase-api': {
        target: 'https://dvktzelzteixqiophgwl.supabase.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supabase-api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
  }
});
