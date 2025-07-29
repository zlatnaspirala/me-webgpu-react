import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
  const { viteStaticCopy }=await import('vite-plugin-static-copy');

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/me-webgpu-react/dist/res',
            dest: ''
          }
        ]
      })
    ],
    build: {
      outDir: 'dist', // or 'demo-dist' or whatever you want
    },
  };
});
