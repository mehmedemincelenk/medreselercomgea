---
description: Rules for running js-framework-benchmark and generating reports
alwaysApply: true
---

# Benchmark Report Rules

When running `scripts/update-js-framework-benchmark-report.mjs`:

1. **NEVER pass `--framework` when generating the report.** The script reads all frameworks from `benchmark-report.config.json`. Passing `--framework` overrides that list and produces a report with only the specified framework, which is WRONG.

2. To **run + rebuild only gea**, then **generate the full report**:
   ```bash
   # Step 1: run benchmarks for gea only
   node scripts/update-js-framework-benchmark-report.mjs --run --rebuild --framework keyed/gea

   # Step 2: regenerate the full report with ALL frameworks from config
   node scripts/update-js-framework-benchmark-report.mjs
   ```

3. The final report generation (step 2) must ALWAYS be run **without** `--framework` so that all configured frameworks appear in the HTML report.

---
description: Changesets versioning and release workflow for the monorepo
alwaysApply: true
---

# Changesets

This monorepo uses `@changesets/cli` for versioning and publishing.

## Package topology

| Package                    | npm name             | Published to                                |
| -------------------------- | -------------------- | ------------------------------------------- |
| `packages/gea`             | `@geajs/core`        | npm                                         |
| `packages/vite-plugin-gea` | `@geajs/vite-plugin` | npm                                         |
| `packages/gea-ui`          | `@geajs/ui`          | npm                                         |
| `packages/gea-mobile`      | `@geajs/mobile`      | npm                                         |
| `packages/create-gea`      | `create-gea`         | npm                                         |
| `packages/gea-tools`       | `gea-tools`          | VS Code Marketplace (ignored by changesets) |

## Key config (`.changeset/config.json`)

- **`linked: [["@geajs/core", "@geajs/vite-plugin"]]`** — these two always receive the same minor/major bump level.
- **`ignore: ["gea-tools"]`** — the VS Code/Cursor extension has its own release lifecycle.
- **`access: "public"`** — all packages publish as public.
- **`updateInternalDependencies: "patch"`** — when a dependency bumps, dependents get their ranges updated automatically.
- **`changelog: @changesets/changelog-github`** — entries link to PRs and contributors.

## How changesets works

Changesets splits releasing into three phases:

1. **Declare** — you create a small `.md` file that says "package X needs a patch/minor/major bump" with a summary.
2. **Version** — changesets reads all pending `.md` files, deletes them, bumps `package.json` versions, and writes CHANGELOGs.
3. **Publish** — changesets runs `npm publish` for each bumped package and creates git tags.

The `.md` files are **queued release intents**. In a team workflow, multiple developers each add one in their PRs over time, and they all get processed together at release time. For a solo developer, the queue usually has just one item.

## Release workflow (step by step)

### Step 1: Make your code changes

Write code, commit, push — normal development. Nothing special here.

### Step 2: Create a changeset

```bash
npx changeset
```

This creates a `.md` file in `.changeset/` (e.g. `.changeset/shiny-kings-press.md`). It declares which packages changed and by how much (patch/minor/major), with a human-readable summary. Since `"commit": true` is set in config, this file is auto-committed.

You can create multiple changesets across multiple PRs/commits. They accumulate until step 3.

### Step 3: Push to GitHub

```bash
git push
```

**This must happen before step 4** because `@changesets/changelog-github` calls the GitHub API to look up commit info. If the commits aren't on GitHub, it will fail with a `Cannot read properties of null` error.

### Step 4: Bump versions

```bash
GITHUB_TOKEN=$(gh auth token) npx changeset version
```

This does three things:

- Deletes all pending `.changeset/*.md` files
- Bumps version numbers in `package.json`
- Writes CHANGELOG entries (using GitHub API to link PRs/authors)

Since `"commit": true`, the result is auto-committed. **No git tags are created yet.**

### Step 5: Publish to npm + create tags

```bash
npx changeset publish
```

This publishes every bumped package to npm **and** creates git tags (e.g. `create-gea@1.0.1`). **Tags are only created in this step, not in step 4.**

### Step 6: Push the release commit and tags

```bash
git push --follow-tags
```

### Step 7: Create GitHub Releases

`changeset publish` creates git tags but **not** GitHub Releases. Run the release script:

```bash
./scripts/create-github-releases.sh
```

This automatically:

- Finds all tags that `changeset publish` just created on HEAD
- Maps each tag (e.g. `@geajs/core@2.0.0`) back to its package directory by matching the `name` field in `package.json`
- Extracts the latest version's notes from that package's CHANGELOG
- Creates a GitHub Release for each

### Quick copy-paste version

```bash
# After your code is committed:
npx changeset                                        # declare what changed
git push                                             # push so GitHub API works
GITHUB_TOKEN=$(gh auth token) npx changeset version  # bump versions + changelogs
npx changeset publish                                # publish to npm + create tags
git push --follow-tags                               # push release commit + tags

./scripts/create-github-releases.sh                  # create GitHub Releases
```

## Dry run

Verify what would be published without actually uploading:

```bash
npx changeset publish --dry-run
```

## Pre-releases / testing

```bash
npx changeset version --snapshot canary
npx changeset publish --tag canary
```

## Rules

- Never manually edit version numbers in `package.json` — let changesets own them.
- Every PR that changes published package output should include a changeset file.
- Use `npx changeset add --empty` for PRs that intentionally need no release (e.g., docs-only, CI config).
- Always `git push` before running `changeset version` — the GitHub changelog plugin needs commits to exist on GitHub.
- `GITHUB_TOKEN` is required for `changeset version` because of `@changesets/changelog-github`.

# Playground Build Commands

The website playground bundles live in `website/playground/` and are built from `packages/vite-plugin-gea/`.

```bash
# Rebuild the Gea compiler bundle (website/playground/gea-compiler-browser.js)
npm run build:browser -w @geajs/vite-plugin

# Rebuild the CodeMirror editor bundle (website/playground/codemirror-bundle.js)
npm run build:codemirror -w @geajs/vite-plugin
```

Rebuild these after changing compiler transforms or updating CodeMirror dependencies.

---
description: How to run Playwright tests for example apps
globs: examples/**,tests/e2e/**
alwaysApply: true
---

# Running Playwright Tests

**CRITICAL**: This is a monorepo. `npx playwright` resolves from the workspace root (`gea/node_modules/playwright`), NOT from the example directory you `cd` into. Running `cd examples/music-player && npx playwright test` will discover ALL spec files across the entire repo instead of just the example's tests.

**Always use the `--config` flag pointing to the unified e2e config:**

```bash
# Correct - runs all e2e tests
npx playwright test --config=tests/e2e/playwright.config.ts

# Run a single example's tests
npx playwright test --config=tests/e2e/playwright.config.ts --project=music-player

# WRONG - discovers all spec files in the repo
cd examples/music-player && npx playwright test
```

## Dev server ports (dynamic)

All e2e tests use a single config at `tests/e2e/playwright.config.ts`. Ports are **allocated at runtime** (ephemeral TCP ports on `127.0.0.1`), not fixed. The config coordinates the main process and workers via `tests/e2e/.e2e-ports.json` and, when `E2E_PROJECT` is set, `tests/e2e/.e2e-session.json` (both gitignored). Vite is started with `--host 127.0.0.1 --strictPort` so the server stays on the chosen port.

## Running a subset of examples

```bash
# Run a single project
npx playwright test --config=tests/e2e/playwright.config.ts --project=music-player

# Run multiple projects
npx playwright test --config=tests/e2e/playwright.config.ts --project=todo --project=kanban --project=chat
```

## Fast startup locally: `E2E_PROJECT`

`--project` only chooses which **tests** run. It does **not** limit how many dev servers start.

By default (`E2E_PROJECT` unset), the config starts **every** example’s `vite dev` (one process per row in the examples table) so any project can run without extra setup. That makes a single `--project=sheet-editor` run look “stuck” for tens of seconds before the first test—most of that time is booting many Vite servers.

To iterate on **one** example, set `E2E_PROJECT` to its project name so only that app’s `webServer` is registered:

```bash
E2E_PROJECT=sheet-editor npx playwright test --config=tests/e2e/playwright.config.ts --project=sheet-editor
```

CI sets `E2E_PROJECT` per matrix job for the same reason.

## Parallelism (`workers`)

Default is **10 workers** locally and **4** on GitHub Actions (many Chromium processes are heavy). Override anytime:

```bash
E2E_WORKERS=16 npx playwright test --config=tests/e2e/playwright.config.ts
```

With the full suite, `fullyParallel` is off so tests **in the same spec file** still run in order; multiple workers mainly parallelize **across spec files**.

## Do Not Modify Example App Code

The example apps under `examples/` are integration tests for the framework. If tests fail, fix the framework code (compiler, runtime, reactivity system), not the example apps. The example code represents valid user patterns that the framework must support.

---
description: Restore the shared benchmark report after filtered benchmark runs
alwaysApply: true
---

# Restore Shared Benchmark Report

When a benchmark run uses `--framework` to narrow the report, treat that as a temporary filtered view.

After any filtered benchmark/report command, immediately restore the normal shared comparison report with:

```bash
node scripts/update-js-framework-benchmark-report.mjs
```

Do this automatically unless the user explicitly says they want to keep the filtered report.

Examples:

- If running `node scripts/update-js-framework-benchmark-report.mjs --run --rebuild --framework keyed/gea`, rerun `node scripts/update-js-framework-benchmark-report.mjs` afterward.
- Do not ask whether to restore the shared report unless the user gave conflicting instructions.

---
description: How to run unit tests — uses Node built-in test runner, NOT vitest
globs: packages/**/tests/**,packages/**/src/**
alwaysApply: true
---

# Running Unit Tests

**CRITICAL**: This project uses Node's built-in test runner (`node:test`), NOT vitest. NEVER run `npx vitest`.

```bash
# Run ALL unit tests across all packages
npm test

# Run tests for a specific package
npm test -w @geajs/core
npm test -w @geajs/vite-plugin

# WRONG - will report "No test suite found" for every file
npx vitest run
```

## Why not vitest?

Test files import from `node:test`:

```ts
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
```

Vitest does not recognize `node:test` describe/it blocks and reports false "No test suite found" errors for every file.

## Test runner details

Each package defines its own test script in `package.json`:

- `@geajs/core`: `tsx --conditions source --import ./tests/preload.ts --test tests/*.test.ts --test tests/examples/*.test.ts` (POSIX `sh` does not expand `**`; two globs cover root + `tests/examples/`)
- `@geajs/vite-plugin`: `tsx --test 'tests/**/*.test.ts'`

The root `npm test` runs all workspace test scripts via `npm run test --workspaces --if-present`.
