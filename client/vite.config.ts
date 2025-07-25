// vite.config.ts

import path from "path"; // <-- Add this import
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- Add this alias configuration
    },
  },
});
