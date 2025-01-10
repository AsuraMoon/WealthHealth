import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteCompressionPlugin from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    ViteCompressionPlugin(),
  ],
  base: "/WealthHealth/",
});
