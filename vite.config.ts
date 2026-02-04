import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [".", "./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  appType: "spa",
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();

      return () => {
        // Add Express middleware first to handle API routes
        server.middlewares.use((req, res, next) => {
          if (req.url.startsWith("/api/")) {
            app(req as any, res as any, next);
          } else {
            next();
          }
        });

        // Add SPA fallback middleware last (after Vite's default handlers)
        server.middlewares.use((req, res, next) => {
          // If we get here, it's a non-API request that Vite couldn't handle
          // For SPA, transform the request to /index.html so React Router can handle it
          if (req.url !== "/index.html" && !req.url.match(/\.[\w\d]+$/)) {
            // Rewrite to index.html for SPA routing
            req.url = "/index.html";
          }
          next();
        });
      };
    },
  };
}
