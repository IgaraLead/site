import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served at site root (igaralead.com.br via CNAME). If you ever publish only at
// https://<org>.github.io/<repo>/ without a custom domain, set base: '/<repo>/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
