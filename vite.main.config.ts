import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        "puppeteer",
        "puppeteer-core",
        "ws",
        "bufferutil",
        "utf-8-validate",
      ],
    },
  },
});
