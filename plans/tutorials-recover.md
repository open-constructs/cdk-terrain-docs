# Plan: Scrape CDKTF Tutorials from Wayback Machine

## Source
- Index: `https://web.archive.org/web/20251112223320/https://developer.hashicorp.com/terraform/tutorials/cdktf`
- 4 tutorials to scrape:
  1. `cdktf-install` — Install CDK for Terraform and run a quick start demo
  2. `cdktf-build` — Build AWS infrastructure with CDK for Terraform
  3. `cdktf-assets-stacks-lambda` — Deploy Lambda functions with TypeScript and CDK for Terraform
  4. `cdktf-applications` — Deploy an application with CDK for Terraform

## Output Structure

```
scraped/
├── index.json                    # metadata: tutorial list, URLs, scrape timestamps
├── images.json                   # image index: { id, src_url, alt_text, tutorial, section }
├── cdktf-install/
│   ├── snapshot-default.txt      # full page snapshot (default tab state)
│   ├── tabs/
│   │   ├── lang-typescript.txt   # snapshot diff after clicking TypeScript tab
│   │   ├── lang-python.txt       # snapshot diff after clicking Python tab
│   │   ├── lang-go.txt
│   │   ├── lang-csharp.txt
│   │   ├── lang-java.txt
│   │   ├── install-npm-stable.txt
│   │   ├── install-npm-dev.txt
│   │   └── install-homebrew.txt
│   └── metadata.json             # page title, URL, sections, tab IDs, image refs
├── cdktf-build/
│   ├── snapshot-default.txt
│   ├── tabs/
│   │   └── ...
│   └── metadata.json
├── cdktf-assets-stacks-lambda/
│   └── ...
└── cdktf-applications/
    └── ...
```

## Strategy: What Chrome DevTools Must Do vs. What We Can Script

### Chrome DevTools (interactive, one-at-a-time via sub-agent)
These require browser interaction and cannot be scripted:
1. **Navigate** to each tutorial URL
2. **Take snapshot** of default page state (captures active tab content)
3. **Identify tabs** — scan snapshot for `tab` elements (e.g., language selector, install method tabs)
4. **Click each tab** — switch to each variant and take a new snapshot
5. **Expand accordions** — find collapsed `button expandable` or `details` elements, click them, re-snapshot
6. **Extract image URLs** — collect `image` element `url` attributes from snapshots

### Scriptable (post-capture processing)
Once snapshots are on disk, a script can:
1. **Parse snapshots** — extract structured content (headings, prose, code blocks) from the a11y tree text format
2. **Extract code blocks** — identify `Copy` button descriptions which contain the full code block text (observed: the `button "Copy"` element has a `description` attribute with the full code content)
3. **Build image index** — grep all `url=` from `image` elements across snapshots
4. **Diff tab snapshots** — compare default snapshot with tab-specific snapshots to isolate only the changed code blocks
5. **Download images** — `curl`/`wget` each image URL from the index

## Key Observation: Copy Buttons Contain Full Code

From the install tutorial snapshot, each code block has a `Copy` button whose `description` attribute contains the **entire code block text**. Example:
```
uid=2_663 button "Copy" description="import { Construct } from "constructs"; import { App, TerraformStack } from "cdktf"; ..."
```
This is the most reliable way to extract code — no need to reassemble tokenized `StaticText` nodes.

## Execution Plan (per tutorial)

### Step 1: Navigate and capture default snapshot
- Navigate to tutorial URL
- `take_snapshot` → save to `scraped/<tutorial>/snapshot-default.txt`

### Step 2: Identify interactive elements
- Parse snapshot for:
  - `tab` elements (selectable) — note which is `selected`
  - `button expandable` elements — potential accordions
  - `image` elements — collect URLs and alt text

### Step 3: Click each tab, capture content
- For each tab group found:
  - Click the tab element by uid
  - `take_snapshot` → save to `scraped/<tutorial>/tabs/<tab-identifier>.txt`
  - Only need to capture the main content area diff (but saving full snapshot is simpler and we can diff later)

### Step 4: Expand accordions, capture content
- For each expandable element in the main content area:
  - Click to expand
  - `take_snapshot` → save to `scraped/<tutorial>/accordions/<accordion-id>.txt`

### Step 5: Build metadata.json
- Save: title, URL, sections (from "On this page" nav), list of tabs found, list of images

### Step 6: Post-processing script
After all 4 tutorials are captured, run a script that:
1. Parses each snapshot file
2. Extracts code blocks from Copy button descriptions
3. Extracts prose from StaticText nodes between headings
4. Builds `images.json` index from all image elements
5. Optionally downloads images via curl

## Decisions
- **Tab capture**: Full page snapshots per tab state (simpler, diff with script later)
- **Script language**: TypeScript (matches project stack)

## Detailed Execution Sequence

### Phase A: Chrome DevTools Scraping (sub-agent, one tutorial at a time)

For each of the 4 tutorials:

1. Create directory `scraped/<tutorial-slug>/` and `scraped/<tutorial-slug>/tabs/`
2. Navigate to the Wayback Machine URL
3. Take default snapshot → write to `scraped/<tutorial-slug>/snapshot-default.txt`
4. Scan snapshot output for:
   - All `tab` elements (note `selected` state and parent grouping)
   - All `button expandable` elements in the main content area
   - All `image` elements (collect url + alt text)
5. For each non-selected tab:
   - Click the tab by uid
   - Wait briefly for content update
   - Take snapshot → write to `scraped/<tutorial-slug>/tabs/<tab-label>.txt`
6. For each expandable accordion in main content:
   - Click to expand
   - Take snapshot → write to `scraped/<tutorial-slug>/accordions/<id>.txt`
7. Write `scraped/<tutorial-slug>/metadata.json` with:
   ```json
   {
     "title": "...",
     "url": "...",
     "waybackUrl": "...",
     "sections": ["Prerequisites", "Install CDKTF", ...],
     "tabs": [
       { "group": "language", "options": ["typescript", "python", ...], "default": "typescript" },
       { "group": "install-method", "options": ["npm-stable", "npm-dev", "homebrew"], "default": "npm-stable" }
     ],
     "images": [
       { "id": "img-1", "alt": "Terraform as Platform", "src": "https://..." }
     ]
   }
   ```

### Phase B: TypeScript Post-Processing Script (`scraped/parse.ts`)

A standalone TypeScript script that:

1. **Reads each tutorial's snapshot files** from `scraped/*/`
2. **Extracts code blocks** by finding `button "Copy" description="..."` patterns — the description contains the full code text
3. **Extracts prose** by walking StaticText nodes between heading boundaries
4. **Diffs tab snapshots** against default to identify which code blocks change per language/variant
5. **Builds `scraped/images.json`** — consolidated image index across all tutorials
6. **Outputs structured content** per tutorial as `scraped/<tutorial>/content.json`:
   ```json
   {
     "title": "...",
     "sections": [
       {
         "heading": "Prerequisites",
         "level": 2,
         "content": [
           { "type": "prose", "text": "In order to use CDKTF, you need:..." },
           { "type": "code", "language": "shell", "code": "npm install --global cdktf-cli@latest", "variants": {
             "typescript": "...", "python": "...", "go": "..."
           }},
           { "type": "image", "ref": "img-1" }
         ]
       }
     ]
   }
   ```

### Phase C: Image Download Script (`scraped/download-images.ts`)

Reads `scraped/images.json` and downloads each image URL to `scraped/images/<tutorial>/<filename>`.

## Tutorial URLs (Wayback Machine)

| Tutorial | URL |
|----------|-----|
| cdktf-install | `https://web.archive.org/web/20251112223320/https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-install` |
| cdktf-build | `https://web.archive.org/web/20251112223320/https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-build` |
| cdktf-assets-stacks-lambda | `https://web.archive.org/web/20251112223320/https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-assets-stacks-lambda` |
| cdktf-applications | `https://web.archive.org/web/20251112223320/https://developer.hashicorp.com/terraform/tutorials/cdktf/cdktf-applications` |

## Verification
- Check each `scraped/<tutorial>/` directory has snapshot + all tab variant files
- Run parse script, verify code blocks extracted match the number of Copy buttons in each snapshot
- Verify image index has entries for all image elements found
- Spot-check one tutorial's content.json against the live Wayback Machine page in Chrome

Pending:

- [~] Finish cdktf-build (just needs the Java language variant and metadata.json).
