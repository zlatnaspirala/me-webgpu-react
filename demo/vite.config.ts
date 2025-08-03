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
          demo3: path.resolve(__dirname, 'demo3.html'),
          demo4: path.resolve(__dirname, 'demo4.html'),
          demo5: path.resolve(__dirname, 'demo5.html'),
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
