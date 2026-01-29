# Plan: Replace PNG diagrams with React SVG components

## Summary

Replace 5 static PNG diagrams (with old HashiCorp/Terraform branding) with maintainable React SVG components in `/snippets/`. OpenTofu-primary branding with Terraform as secondary. Green theme matching `docs.json` primary color (`#16A34A`).

## Files to create

### Logo assets
- `images/logos/opentofu.svg` — OpenTofu logo (from official brand-artifacts repo)
- `images/logos/terraform.svg` — Terraform logo (simplified)

### React SVG components (in `/snippets/`)

1. **`snippets/PlatformDiagram.tsx`** — replaces `terraform-platform.png`
   - Languages row: TypeScript, Python, Java, C#, Go
   - CDK Terrain highlighted box (green)
   - OpenTofu engine (primary, with "/ Terraform" secondary)
   - Cloud providers row: AWS, Azure, GCP, etc.

2. **`snippets/WorkflowDiagram.tsx`** — replaces `cdktn-terraform-workflow.png`
   - 3-phase vertical flow:
     - `cdktn init` → CDKTN App
     - `cdktn synth` → Output (JSON Config + Artifacts)
     - `cdktn deploy` → OpenTofu / Terraform → Providers

3. **`snippets/AppArchitectureDiagram.tsx`** — replaces `cdktn-app-architecture.png`
   - App → Stacks (Development, Test) → Resources
   - Output → JSON Config + Artifacts → OpenTofu / Terraform

4. **`snippets/ProviderModulesDiagram.tsx`** — replaces `provider-modules.png`
   - Provider + Module → JSON Schema → Code Generator → Language bindings (TS, Python, Java, C#, Go)

5. **`snippets/PluginOverviewDiagram.tsx`** — replaces `terraform-plugin-overview.png`
   - OpenTofu/Terraform Core ↔ RPC ↔ Provider (Go) ↔ Client Library ↔ HTTP(S) ↔ Target API

## Files to modify

1. **`docs/index.mdx`** (line 12)
   - Replace `![terraform platform](/images/terraform-platform.png)` with:
     ```mdx
     import PlatformDiagram from '/snippets/PlatformDiagram';
     <PlatformDiagram />
     ```

2. **`docs/concepts/cdktn-architecture.mdx`** (lines 27, 31, 45)
   - Replace 3 image references with imports of `WorkflowDiagram`, `ProviderModulesDiagram`, `AppArchitectureDiagram`

3. **`docs/concepts/providers.mdx`** (line 17)
   - Replace image reference with import of `PluginOverviewDiagram`

## Component design principles

- **Self-contained**: Each component renders a complete `<svg>` element with `viewBox` and `width="100%"` for responsiveness
- **Theme-aware**: Use CSS variables or explicit light/dark colors where possible
- **Green branding**: Use `#16A34A` (primary) and `#15803D` (dark) from `docs.json`
- **OpenTofu primary**: OpenTofu logo prominent, Terraform mentioned as "/ Terraform" in smaller text
- **Accessible**: Include `<title>` and `aria-label` on SVG elements
- **No external dependencies**: Logos rendered as inline SVG `<path>` elements, no runtime fetches

## Step-by-step execution

1. Fetch official OpenTofu SVG logo (from GitHub brand-artifacts) and Terraform SVG logo
2. Create `snippets/` directory
3. Create `PlatformDiagram.tsx` — the hero diagram on the index page
4. Create `WorkflowDiagram.tsx` — the 3-phase workflow
5. Create `AppArchitectureDiagram.tsx` — the app/stack/resource hierarchy
6. Create `ProviderModulesDiagram.tsx` — the code generation pipeline
7. Create `PluginOverviewDiagram.tsx` — the plugin communication flow
8. Update `docs/index.mdx` to import and use `PlatformDiagram`
9. Update `docs/concepts/cdktn-architecture.mdx` to import and use 3 diagram components
10. Update `docs/concepts/providers.mdx` to import and use `PluginOverviewDiagram`
11. Run `mintlify dev` to verify all diagrams render correctly

## Verification

- Run `mintlify dev` and navigate to each page:
  - `/docs` — verify PlatformDiagram renders
  - `/docs/concepts/cdktn-architecture` — verify WorkflowDiagram, ProviderModulesDiagram, AppArchitectureDiagram render
  - `/docs/concepts/providers` — verify PluginOverviewDiagram renders
- Check responsiveness (resize browser)
- Verify SVGs scale properly and text is readable at different sizes
- Confirm OpenTofu branding is prominent, Terraform is secondary

## Out of scope (for now)

- Unused diagrams (`cdktn-terraform.png`, `constructs-level.png`) — kept as-is per user preference
- Deleting old PNG files (can be done after verification)
- Dark mode theming (can be added later as an enhancement)
