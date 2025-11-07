/// <reference types="vitest/config" />
import { glob } from "glob";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
      input: Object.fromEntries(
        glob
          .sync("src/**/*.ts")
          .filter((path) => !path.endsWith(".spec.ts"))
          .map((path) => [
            path
              .replace(/^src\//, "")
              .replace(/\.ts$/, "")
              .replace(/\/index$/, ""),
            resolve(__dirname, path),
          ])
      ),
      output: [
        {
          format: "esm",
          entryFileNames: "[name].mjs",
          chunkFileNames: "chunks/[name]-[hash].mjs",
          sourcemap: true,
          hoistTransitiveImports: false,
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          chunkFileNames: "chunks/[name]-[hash].cjs",
          sourcemap: true,
          hoistTransitiveImports: false,
        },
      ],
    },
  },
  plugins: [
    dts({
      entryRoot: "src",
      rollupTypes: true,
    }),
  ],
  test: {
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts"],
      exclude: ["src/**/index.ts", "src/**/*.spec.ts"],
    },
  },
});
