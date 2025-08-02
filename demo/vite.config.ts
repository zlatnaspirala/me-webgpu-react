import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path'; // modern & explicit

export default defineConfig(async () => {
  const { viteStaticCopy }=await import('vite-plugin-static-copy');

  return {
    base: './',
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
      rollupOptions: {
        input: {
          demo1: path.resolve(__dirname, 'demo1.html'),
          demo2: path.resolve(__dirname, 'demo2.html'),
          // add more demos here
        },
        output: {
          // Optional: keep folder structure in dist
          entryFileNames: `[name]/assets/[name].[hash].js`,
          chunkFileNames: `[name]/assets/[name].[hash].js`,
          assetFileNames: `[name]/assets/[name].[hash].[ext]`,
        }
      },
      outDir: 'dist',
      emptyOutDir: true,
    }
  };
});
