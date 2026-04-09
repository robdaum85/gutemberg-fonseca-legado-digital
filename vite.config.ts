import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "lovable-uploads/c003fb8b-1544-42bc-881b-af1b83f1ac15.png",
      ],
      workbox: {
        navigateFallbackDenylist: [
          /^\/robots\.txt$/,
          /^\/sitemap\.xml$/,
          /^\/manifest\.webmanifest$/,
          /^\/sw\.js$/,
          /^\/registerSW\.js$/,
          /^\/workbox-.*\.js$/,
        ],
        cleanupOutdatedCaches: true
      },
      manifest: {
        name: "Gutemberg Fonseca - Legado Digital",
        short_name: "Gutemberg",
        description:
          "18 anos de gestão pública transformadora. Conheça a trajetória e conquistas.",
        theme_color: "#04103f",
        background_color: "#04103f",
        display: "standalone",
        icons: [
          {
            src: "/lovable-uploads/c003fb8b-1544-42bc-881b-af1b83f1ac15.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/lovable-uploads/c003fb8b-1544-42bc-881b-af1b83f1ac15.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});