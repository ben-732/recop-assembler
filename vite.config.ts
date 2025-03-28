import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@codemirror/state": path.resolve(
        __dirname,
        "node_modules/@codemirror/state/dist/index.cjs"
      ),
      "@codemirror/language": path.resolve(
        __dirname,
        "node_modules/@codemirror/language/dist/index.cjs"
      ),
      "@codemirror/next": path.resolve(
        __dirname,
        "node_modules/@codemirror/next/dist/index.cjs"
      ),
      "@lezer/highlight": path.resolve(
        __dirname,
        "node_modules/@lezer/highlight/dist/index.cjs"
      ),
      "@lezer/lr": path.resolve(
        __dirname,
        "node_modules/@lezer/lr/dist/index.cjs"
      ),
    },
  },
});
