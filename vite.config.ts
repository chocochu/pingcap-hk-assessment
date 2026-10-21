import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const publicDir = fileURLToPath(new URL("./public", import.meta.url));

// Every page is the same app; in development, serve any .html page request from index.html.
function pagesInDev(): Plugin {
  return {
    name: "pages-in-dev",
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const path = (request.url ?? "").split("?")[0];
        const isPage = path === "/" || path.endsWith("/") || path.endsWith(".html");
        if (isPage && path !== "/index.html" && !existsSync(publicDir + path)) {
          request.url = "/index.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), pagesInDev()],
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
