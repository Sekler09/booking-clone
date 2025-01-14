import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig(({ mode }) => {
  const envFiles = {
    development: '.env.development',
    production: '.env.production',
  };

  return {
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
        assets: path.resolve(__dirname, './src/assets'),
        components: path.resolve(__dirname, './src/components'),
        pages: path.resolve(__dirname, './src/pages'),
        routes: path.resolve(__dirname, './src/routes'),
        store: path.resolve(__dirname, './src/store'),
        styles: path.resolve(__dirname, './src/styles'),
        utils: path.resolve(__dirname, './src/utils'),
        hooks: path.resolve(__dirname, './src/hooks'),
        constants: path.resolve(__dirname, './src/constants'),
        api: path.resolve(__dirname, './src/api'),
        i18n: path.resolve(__dirname, './src/i18n'),
      },
    },
    server: {
      open: true,
    },
    plugins: [
      react(),
      svgr(),
      istanbul({
        cypress: true,
        requireEnv: false,
      }),
    ],
    define: {
      'import.meta.env': JSON.stringify(envFiles[mode].parsed),
    },
  };
});
