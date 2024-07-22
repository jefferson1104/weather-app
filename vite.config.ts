import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    server: isDevelopment ? {
      proxy: {
        '/api': {
          target: 'https://geocoding.geo.census.gov',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    } : {}
  };
});
