import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
    fs: { strict: true, allow: [fileURLToPath(new URL(".", import.meta.url))] },
  },
  preview: { host: "localhost", port: 4173, strictPort: true },
});
