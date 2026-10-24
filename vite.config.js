import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    watch: {
      usePolling: true,
      interval: 300,
      // Large source files (price-list PDFs, videos, raw photo folders) are never imported;
      // polling them slows the watcher until it stops noticing code changes.
      ignored: [
        '**/*.zip', '**/*.pdf', '**/*.mp4', '**/dist/**', '**/.git/**',
        '**/Assets/Chairs/**', '**/Assets/Tables/**', '**/Assets/Cabin Table/**',
        '**/Assets/Auditorium/**', '**/Assets/NextFurn_Sofa_Image_Pack/**',
      ],
    },
  },
});
