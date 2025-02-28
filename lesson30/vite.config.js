import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "src");

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
        "@": rootDir,
        "@hooks": resolve(rootDir, "hooks"),
        "@components": resolve(rootDir, "components"),
        "@ui": resolve(rootDir, "components/UI"),
        "@assets": resolve(rootDir, "assets"),
        "@context": resolve(rootDir, "context"),
        "@pages": resolve(rootDir, "pages"),
        "@services": resolve(rootDir, "services"),
        "@ducks": resolve(rootDir, "ducks"),
        "@store": resolve(rootDir, "store"),
        "@api": resolve(rootDir, "api"),
      },
    },
  };
});

