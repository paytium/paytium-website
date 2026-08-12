import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: "github-pages/prerender.tsx",
    outDir: "dist-pages-ssr",
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "prerender.js" } },
  },
});
