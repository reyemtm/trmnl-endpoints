# @endpoints/five-oclock

## Build distributable output

From this package directory:

```bash
pnpm install
pnpm run build
```

This creates a standalone `dist` folder containing:

- `dist/index.js` (bundled package entry)
- `dist/package.json` (installable package manifest)

## Install directly from dist

From another project:

```bash
pnpm add /absolute/path/to/trmnl-endpoints/packages/five-oclock/dist
```

Then import:

```js
import generateFiveOClock from "@endpoints/five-oclock";
```

## Install from GitHub monorepo path (pnpm)

From another project, install this package directly from your repo subdirectory:

```bash
pnpm add "github:reyemtm/trmnl-endpoints#main&path:/packages/five-oclock"
```

Then import:

```js
import generateFiveOClock from "@endpoints/five-oclock";
```

Because this install comes from Git and not npm publish, commit `packages/five-oclock/dist/**` to the repository so consumers get prebuilt output.

## Notes

- Most JavaScript dependencies are bundled into `dist/index.js`.
- `canvas` remains an external dependency because it includes native bindings.
- If `canvas` fails to load after install with pnpm, run `pnpm approve-builds` in the consuming project and allow `canvas`.
