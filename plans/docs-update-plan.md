# CDK Terrain Docs → Mintlify Conversion Plan

## Project Context

We are converting documentation from Terraform CDK (CDKTF) to a new docs site format.

PRIORITY: ONLY CONVERT FORMATTING/NAVIGATION. ADOPT MINTLIFY COMPNONENTS, BUT DO NOT CHANGE TECHNICAL CONTENT.

EXCEPTION: CDKTF navigation structure may already refer to CDK Terrain (CDKTN) — this is acceptable.

Background information (for reference only):

**Fork**: Terraform CDK (CDKTF) → **CDK Terrain (CDKTN)**
- GitHub: `https://github.com/open-constructs/cdk-terrain`
- CLI: `cdktn-cli` / `cdktn`
- Packages: `cdktn`, `@cdktn/provider-*`
- Backward-compatible config: `cdktf.json`, `cdktf.out/`, `CDKTF_*` env vars, `~/.cdktf`
- full context and migration details in `fork-overview.md`

## Scope
Convert 48 narrative docs from `v0.21.x/docs/cdktf/` to mintlify format. **API reference docs (31 files, 194K lines) excluded** — handled separately via automated generators.

- keep deprecation notice
- do not change project name in content (still "CDKTF" in narrative)

---

## Component Mapping: HashiCorp → Mintlify

### Custom JSX Components Found

| HashiCorp Component | Count | Files | Mintlify Equivalent | Conversion |
|---------------------|-------|-------|---------------------|------------|
| `<CodeTabs>` | 47 | 15 | **`<CodeGroup>`** | Rename tag. Add title after language in each code fence (e.g. `` ```ts `` → `` ```ts TypeScript ``). No `<Tab>` wrappers needed. |
| `<Tabs>` | 1 | 1 | `<Tabs>` | Same name, no change needed. |
| `<Tab heading="x" group="y">` | 2 | 1 | `<Tab title="x">` | Rename `heading` → `title`. Drop `group` (Mintlify syncs tabs by matching `title` automatically). |

**`<CodeGroup>` is the correct match for `<CodeTabs>`** — both wrap bare fenced code blocks directly. Mintlify's `<CodeGroup>` uses the text after the language identifier as the tab label.

Source → Target example:
```
BEFORE:                              AFTER:
<CodeTabs>                           <CodeGroup>

```ts                                ```ts TypeScript
// code                              // code
```                                  ```

```python                            ```python Python
# code                               # code
```                                  ```

</CodeTabs>                          </CodeGroup>
```

Bonus: `<CodeGroup>` auto-syncs language selection across all code groups on the same page.

### Callout Syntax (HashiCorp Markdown Extensions → Mintlify Components)

Mintlify provides 7 callout types: `<Note>`, `<Warning>`, `<Info>`, `<Tip>`, `<Check>`, `<Danger>`, plus a generic `<Callout icon="" color="">`.

| HashiCorp Syntax | Count | Files | Mintlify Component | Notes |
|------------------|-------|-------|--------------------|-------|
| `~> **Note:** text` | 5 | 5 | `<Note>text</Note>` | Tilde-arrow info callout |
| `~> **Warning:** text` | 3 | 2 | `<Warning>text</Warning>` | Tilde-arrow warning |
| `~> **Important:** text` | 1 | 1 | `<Warning>text</Warning>` | Treat as warning-level |
| `-> **Note:** text` | 5 | 5 | `<Note>text</Note>` | Arrow info callout |
| `+-> **Note:** text` | 1 | 1 | `<Tip>text</Tip>` | Plus-arrow positive callout |
| `> **Note:** text` | ~5 | 4 | `<Note>text</Note>` | Blockquote note |
| `> **Hands-on:** text` | ~5 | 4 | `<Tip>text</Tip>` | Blockquote tutorial link |

### Metadata (Remove Only)

| Pattern | Count | Action |
|---------|-------|--------|
| `<!-- #NEXT_CODE_BLOCK_SOURCE:... -->` | 222 | Delete (source-tracking metadata) |
| `<!-- This file is generated... -->` | 0 in narrative | Prompt user if found |

### What's Missing (No Mintlify Equivalent)

| HashiCorp Feature | Impact | Workaround |
|-------------------|--------|------------|
| `<Tab group="...">` (explicit sync groups) | None | Mintlify syncs by matching `title` strings — same result, no attribute needed. |
| Arrow callout prefix syntax (`->`, `~>`, `+->`) | None | Converted to JSX components — full feature parity. |

### Mintlify Components Available but Not in Source

These could enhance the docs but are **not required** for conversion:

| Mintlify Component | Potential Use |
|--------------------|---------------|
| `<Steps>` / `<Step>` | Could wrap numbered procedures (e.g., project setup) |
| `<Card>` / `<CardGroup>` | Could replace plain link lists on landing page |
| `<Accordion>` / `<AccordionGroup>` | Could wrap long reference tables |
| `<Frame>` | Could wrap images with captions |
| `<Info>` / `<Check>` / `<Danger>` | Additional callout variants if needed |
| `<Callout icon="" color="">` | Generic callout with custom icon/color |

---

## Phase 0: Template Cleanup & Skeleton

**Goal**: Remove all mintlify starter kit content, create CDKTF directory structure.

### 0a. Delete template content files
```
index.mdx, quickstart.mdx, development.mdx
essentials/ (entire directory)
ai-tools/ (entire directory)
api-reference/endpoint/ (entire directory)
api-reference/introduction.mdx
snippets/snippet-intro.mdx
```

### 0b. Delete template images
```
images/checks-passed.png, images/hero-dark.png, images/hero-light.png
```

### 0c. Create target directory structure
```
docs/
  concepts/
  create-and-deploy/
  develop-custom-constructs/
  examples-and-guides/
  test/
  cli-reference/
  release/
  images/
```

### 0d. Copy images from source
Copy 7 PNGs from `v0.21.x/img/` → `images/`:
- cdktf-app-architecture.png, cdktf-terraform-workflow.png, cdktf-terraform.png
- constructs-level.png, provider-modules.png, terraform-platform.png, terraform-plugin-overview.png

**Verify**: `mint dev` loads (pages missing is expected).

---

## Phase 1: Rewrite `docs.json`

**Goal**: Replace template config with CDKTF navigation structure.

**File**: `docs.json`

Key changes:
- **name**: `"CDK Terrain (CDKTN)"`
- **colors**: Update branding (current green is fine as placeholder)
- **navigation**: Single "Documentation" tab with groups mapped from `v0.21.x/data/cdktf-nav-data.json`:
  - Getting Started → `index`
  - Concepts → 15 pages under `concepts/`
  - Examples and Guides → 2 pages under `examples-and-guides/`
  - Create and Deploy → 9 pages under `create-and-deploy/`
  - Custom Constructs → 2 pages under `develop-custom-constructs/`
  - Test and Debug → 2 pages under `test/`
  - CLI Reference → 2 pages under `cli-reference/`
  - Release → overview + 11 upgrade guides under `release/`
  - Community & Telemetry → 2 standalone pages
- **navbar/footer/global anchors**: Update to CDK Terrain links:
  - GitHub: `https://github.com/open-constructs/cdk-terrain`
  - Remove Mintlify-specific support email, dashboard link
- Remove template-specific contextual options

**Verify**: Navigation sidebar renders with correct groups/tabs (404s on pages expected).

---

## Phase 2: Build Conversion Script

**Goal**: Automate the repetitive transformations across all 48 files.

**File**: `scripts/convert.py`

The script processes each source `.mdx` file with these transformations in order:

| # | Transform | Pattern | Replacement |
|---|-----------|---------|-------------|
| 1 | Frontmatter | `page_title:` → `title:` | Rename field |
| 2 | Remove duplicate H1 | First `# Heading` after `---` | Delete line |
| 3 | Remove source comments | `<!-- #NEXT_CODE_BLOCK_SOURCE:... -->` | Delete line |
| 4 | Flag generated comments | `<!-- This file is generated... -->` | Notify user, option to skip file |
| 5 | CodeTabs → CodeGroup | `<CodeTabs>` / `</CodeTabs>` | `<CodeGroup>` / `</CodeGroup>` (rename tag) |
| 5b | Code fence titles | `` ```ts `` (bare language) | `` ```ts TypeScript `` (add title for tab label) |
| 5c | Tab attr rename | `<Tab heading="..." group="...">` | `<Tab title="...">` (drop `group`) |
| 6 | Callout markers | `->`, `~>`, `+->` prefix lines | `<Note>`, `<Warning>`, `<Tip>` components |
| 7 | Blockquote callouts | `> **Note:**`, `> **Hands-on:**` etc. | `<Note>`, `<Tip>` components |
| 8 | Image paths | `(/img/` | `(/images/` |
| 9 | Internal CDKTF links | `](/terraform/cdktf/` | Keep as is (print to logfile) |
| 10 | External Terraform links | `](/terraform/` (remaining) | Keep as is (print to logfile) |

### CodeTabs → CodeGroup conversion detail

`<CodeGroup>` has the same structure as `<CodeTabs>` (bare code blocks, no `<Tab>` wrappers). Just rename the tag and add titles to code fences.

**Source**:
```mdx
<CodeTabs>

```ts
// TypeScript code
```

```python
# Python code
```

</CodeTabs>
```

**Target**:
```mdx
<CodeGroup>

```ts TypeScript
// TypeScript code
```

```python Python
# Python code
```

</CodeGroup>
```

**Steps**: 1) Replace `<CodeTabs>` → `<CodeGroup>`, 2) Append title after language identifier on each code fence.

Language → title map: `ts` → `TypeScript`, `typescript` → `TypeScript`, `python` → `Python`, `java` → `Java`, `csharp` → `C#`, `go` → `Go`, `shell-session` → `Shell`, `json` → `JSON`

### Callout conversion detail

| Source | Target |
|--------|--------|
| `-> **Note:** text` | `<Note>text</Note>` |
| `~> **Note:** text` | `<Note>text</Note>` |
| `~> **Warning:** text` | `<Warning>text</Warning>` |
| `~> **Important:** text` | `<Warning>text</Warning>` |
| `+-> text` | `<Tip>text</Tip>` |
| `> **Hands-on:** text` | `<Tip>text</Tip>` |

**Verify**: Run script on `concepts/resources.mdx` (12 CodeTabs, most complex narrative file) and manually inspect output.

---

## Phase 3: Convert Landing Page & Simple Pages (5 files)

**Goal**: Establish the pattern with the simplest files first.

**Files**:
- `index.mdx` (overview/landing page)
- `community.mdx`
- `telemetry.mdx`
- `release/index.mdx`  (aliased as `release` in nav)
- One concept file with no CodeTabs: `concepts/cdktf-architecture.mdx`

Run conversion script, then manually review/enhance the landing page with `<CardGroup>` navigation cards.

**Verify**: `mint dev` — pages render, links work, images display.

---

## Phase 4: Convert Concept Documents (15 files)

**Goal**: Convert the core technical content with 47 `<CodeTabs>` → `<CodeGroup>` conversions.

**Files** (in `v0.21.x/docs/cdktf/concepts/`):
- cdktf-architecture.mdx (done in Phase 3)
- hcl-interoperability.mdx, constructs.mdx, providers.mdx, resources.mdx
- modules.mdx, data-sources.mdx, variables-and-outputs.mdx, functions.mdx
- iterators.mdx, remote-backends.mdx, aspects.mdx, assets.mdx, tokens.mdx, stacks.mdx

Run conversion script on all files, then review each for:
- `<CodeGroup>` language tabs render (all 5 languages appear, auto-sync works)
- Callout components render as styled boxes
- No raw `->` / `~>` markers visible
- Internal links resolve

**Verify**: `mint dev` — navigate every concept page, click through language tabs.

---

## Phase 5: Convert Practical Guides (18 files)

**Goal**: Convert all remaining non-release narrative docs.

**Files by section**:

**Create and Deploy** (9 files):
project-setup, configuration-file, best-practices, environment-variables,
hcp-terraform, deployment-patterns, performance, remote-templates, aws-adapter

**Custom Constructs** (2 files):
construct-design, publishing-and-distribution

**Test and Debug** (2 files):
unit-tests, debugging

**CLI Reference** (2 files):
cli-configuration, commands (902 lines, 6 callout markers — most callouts in one file)

**Examples and Guides** (2 files):
examples, refactoring

Run conversion script, then review. `commands.mdx` needs extra attention for its many callout variants and markdown tables.

**Verify**: `mint dev` — all Documentation tab pages render correctly.

---

## Phase 6: Convert Release/Upgrade Guides (12 files)

**Goal**: Convert release overview + 11 upgrade guides.

**Files** (in `v0.21.x/docs/cdktf/release/`):
- index.mdx (release overview)
- upgrade-guide-v0-19.mdx through upgrade-guide-v0-6.mdx

These are mostly plain markdown — script handles frontmatter + links, minimal manual review needed.

**Verify**: `mint dev` — Releases section navigates correctly.

---

## Phase 7: Polish & QA

**Goal**: Final cross-cutting cleanup and verification.

- [ ] Run `mint broken-links` to audit all internal/external links
- [ ] Verify all 7 images render in their respective pages
- [ ] Confirm no orphaned `.mdx` files missing from `docs.json` navigation
- [ ] Spot-check mobile rendering of tables and code tabs
- [ ] Update logo/favicon if project branding assets are available
- [ ] Remove `v0.21.x/` source directory (or `.gitignore` it) once conversion is confirmed
- [ ] Remove `api-reference/` directory (leftover from template, now empty)

---

## Critical Files

| File | Role |
|------|------|
| `docs.json` | Navigation, branding, site config |
| `v0.21.x/data/cdktf-nav-data.json` | Source of truth for nav structure (390 lines) |
| `v0.21.x/docs/cdktf/concepts/resources.mdx` | Best test case: 12 CodeTabs, 1178 lines |
| `v0.21.x/docs/cdktf/cli-reference/commands.mdx` | Most callout variants: 6 instances of `~>` markers |
| `scripts/convert.sh` (to create) | Conversion automation script |

## Conversion Stats

- **Total files to convert**: 48 (79 source minus 31 API reference)
- **Total lines**: ~13,600 (of 208K original, excluding API reference)
- **CodeTabs instances**: 94 (across 15 concept files)
- **Callout markers**: ~21 instances across ~12 files
- **Internal links to rewrite**: ~222 occurrences across 46 files
- **Images to relocate**: 7 PNGs
