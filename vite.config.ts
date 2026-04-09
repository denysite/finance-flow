import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },

  build: {
    modulePreload: false,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. Виносимо React та основні системні речі
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "vendor-core";
          }

          // 2. Виносимо Recharts (найважчий модуль)
          if (id.includes("node_modules/recharts")) {
            return "vendor-charts";
          }

          // 3. Виносимо TanStack Query
          if (id.includes("node_modules/@tanstack")) {
            return "vendor-query";
          }

          // 4. Всі інші бібліотеки (Zustand, Lucide, GSAP тощо)
          if (id.includes("node_modules")) {
            return "vendor-libs";
          }
        },
      },
    },
  },
});
