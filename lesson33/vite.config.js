import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  const enableSourceMap =
    isDevelopment && process.env.VITE_ENABLE_SOURCEMAP_IN_DEV === "true";
  const port = process.env.VITE_APP_PORT || 4000;

  return {
    plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
    server: {
      port,
    },
    css: {
      devSourcemap: enableSourceMap,
    },
    build: {
      sourcemap: isDevelopment ? enableSourceMap : false,
    },
    esbuild: {
      sourcemap: enableSourceMap,
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@components": resolve(__dirname, "src/components"),
        "@ui": resolve(__dirname, "src/components/UI"),
        "@context": resolve(__dirname, "src/context"),
        "@pages": resolve(__dirname, "src/pages"),
        "@services": resolve(rootDir, "services"),
      },
    },
  };
});

