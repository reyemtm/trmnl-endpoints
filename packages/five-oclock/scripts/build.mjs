import { dirname, resolve } from "node:path";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

import { build } from "esbuild";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = resolve(__dirname, "..");
const distDir = resolve(packageRoot, "dist");

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

await build({
  entryPoints: [resolve(packageRoot, "index.js")],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  outfile: resolve(distDir, "index.js"),
  loader: { ".geojson": "json" },
  external: ["canvas"]
});

const rootPkg = JSON.parse(readFileSync(resolve(packageRoot, "package.json"), "utf8"));

const distPkg = {
  name: rootPkg.name,
  version: rootPkg.version,
  type: "module",
  main: "./index.js",
  exports: {
    ".": "./index.js"
  },
  dependencies: {
    canvas: rootPkg.dependencies?.canvas ?? "^3.1.2"
  }
};

writeFileSync(resolve(distDir, "package.json"), `${JSON.stringify(distPkg, null, 2)}\n`);
