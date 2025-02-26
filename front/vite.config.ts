import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@validations": path.resolve(__dirname, "./src/validations"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@customTypes":path.resolve(__dirname, "./src/customTypes")
    },
  },
  plugins: [react()],
});
