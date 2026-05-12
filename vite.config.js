const { defineConfig } = require("vite");

module.exports = defineConfig({
  plugins: [],
  server: {
    host: "127.0.0.1",
    port: 5187,
    strictPort: true
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
