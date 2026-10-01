import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        evento: path.resolve(__dirname, "evento.html"),
        dashboardGutembergSetembro2026: path.resolve(
          __dirname,
          "dashboard_gutemberg_setembro_2026_v2.html",
        ),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
