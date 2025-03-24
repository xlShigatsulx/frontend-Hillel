import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, 'src');

dotenv.config();
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  const enableSourceMap =
    isDevelopment && process.env.VITE_ENABLE_SOURCEMAP_IN_DEV === 'true';
  const port = process.env.VITE_APP_PORT || 3333;

  return {
    plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }), tailwindcss()],
    server: {
      port,
      host: true,
      cors: true,
    },
    css: {
      devSourcemap: enableSourceMap,
    },
    build: {
      sourcemap: isDevelopment ? enableSourceMap : false,
    },
    esbuild: {
      sourcemap: enableSourceMap,
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
    },
    resolve: {
      alias: {
        '@': rootDir,
        '@components': resolve(rootDir, 'components'),
        '@ui': resolve(rootDir, 'components/UI'),
        '@context': resolve(rootDir, 'context'),
        '@pages': resolve(rootDir, 'pages'),
        '@services': resolve(rootDir, 'services'),
        '@store': resolve(rootDir, 'store'),
        '@api': resolve(rootDir, 'api'),
      },
    },
  };
});
