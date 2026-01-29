# Plan: Add OpenTofu Mentions to Documentation

## Summary

Strategically add OpenTofu alongside Terraform in the docs. CDKTN already supports OpenTofu via the `TERRAFORM_BINARY_NAME` env var but has zero OpenTofu mentions anywhere. This plan adds mentions on ~14 files without disrupting reading flow or duplicating CLI examples.

**Approach:** Substantive updates on 4 core pages + "(or OpenTofu)" first-mention on ~10 concept/guide pages.

**What NOT to change:**
- Ecosystem terms ("Terraform providers", "Terraform modules") — shared between both tools
- Product names ("HCP Terraform", "Terraform Enterprise") — HashiCorp-specific products
- Release/upgrade guides — historical content
- CLI command examples — don't duplicate `terraform` → `tofu`, just note once
- Individual `registry.terraform.io` URLs in code/config examples — keep functional links

## Research

Perfect! I now have comprehensive information. Let me compile the findings.

Summary of Research Findings

I've completed a comprehensive search on CDKTF/CDKTN and OpenTofu compatibility. Here are my findings:

1. CDKTF/CDKTN Compatibility with OpenTofu

Key Finding: Full compatibility is documented. According to the web search rejection messages provided:
- CDKTF is pinned to Terraform version 1.6
- OpenTofu forked from Terraform 1.5.6 (some sources say 1.5.7)
- This means with the current release of CDKTF, there is 100% compatibility with OpenTofu
- CDKTF has full dual support for both Terraform and OpenTofu

2. How to Use OpenTofu with CDKTF/CDKTN

The CDKTN documentation already includes support for this via the TERRAFORM_BINARY_NAME environment variable (documented in /Users/vincentdesmet/cdktn/docs/docs/create-and-deploy/environment-variables.mdx):
┌───────────────────────┬─────────────────────────────────────────────┬──────────────────────────────┐
│     Variable Name     │                 Description                 │           Default            │
├───────────────────────┼─────────────────────────────────────────────┼──────────────────────────────┤
│ TERRAFORM_BINARY_NAME │ The Terraform binary that CDKTN should use. │ The Terraform binary in path │
└───────────────────────┴─────────────────────────────────────────────┴──────────────────────────────┘
Users can set this to tofu to use OpenTofu instead: TERRAFORM_BINARY_NAME=tofu

3. OpenTofu Project Details

- Fork Source: OpenTofu was forked from Terraform 1.5.6 (with some sources citing 1.5.7)
- Creators: Initiative of Gruntwork, Spacelift, Harness, Env0, Scalr, and others, in response to HashiCorp's license change
- Compatibility: OpenTofu is designed as a drop-in replacement for Terraform
- Recommendation: Gruntwork advises all customers to adopt OpenTofu as a drop-in replacement for HashiCorp Terraform

4. How Other Projects Document Dual Support

Based on search results, best practices include:
- Clear documentation that both are supported
- Version compatibility matrices (reference to https://cani.tf/ - a compatibility matrix tool)
- Version-specific migration paths for different Terraform versions (https://opentofu.org/docs/intro/migration/)
- Gruntwork maintains detailed compatibility documentation (https://docs.gruntwork.io/2.0/docs/library/architecture/opentofu-terraform-compatibility/)

5. Current CDKTN Documentation Status

Existing references checked:
- /Users/vincentdesmet/cdktn/docs/fork-overview.md - This is a migration guide from CDKTF to CDKTN, doesn't mention OpenTofu
- /Users/vincentdesmet/cdktn/docs/docs/index.mdx - Main index page describing CDKTN (no OpenTofu mention)
- /Users/vincentdesmet/cdktn/docs/docs/concepts/cdktn-architecture.mdx - Architecture documentation (references only Terraform, not OpenTofu)

Grep search result: No existing OpenTofu references found in the CDKTN docs

6. Important Context

The fork-overview.md file mentions that:
- CDKTN is a community-maintained fork of CDKTF from the Open Constructs organization
- Version numbering: CDKTN Release 1 version should be the next logical version CDKTF would have
- This is relevant because the original CDKTF is now in maintenance mode (HashiCorp deprecated it in December 2025)

Recommended Resources for Documentation

Based on my research, here are the most useful reference links:

- https://cani.tf/ - Compatibility matrix for Terraform and OpenTofu
- https://opentofu.org/docs/intro/migration/
- https://opentofu.org/faq/
- https://docs.gruntwork.io/2.0/docs/library/architecture/opentofu-terraform-compatibility/
- https://spacelift.io/blog/what-is-opentofu

---
Sources:
- https://cani.tf/
- https://opentofu.org/docs/intro/migration/
- https://opentofu.org/faq/
- https://docs.gruntwork.io/2.0/docs/library/architecture/opentofu-terraform-compatibility/
- https://spacelift.io/blog/what-is-opentofu
- https://terragrunt.gruntwork.io/docs/reference/supported-versions/
⎿  Done (21 tool uses · 38.8k tokens · 9m 14s)

⏺ Good findings. The docs already have a TERRAFORM_BINARY_NAME env var for OpenTofu support but zero OpenTofu mentions anywhere. Let me read the key pages to understand where mentions would fit naturally.

⏺ User answered Claude's questions:
  ⎿  · What level of OpenTofu integration do you want in the docs? The docs have ~1,141 Terraform references across 4 categories. → Strategic mentions
     · How should Terraform CLI commands be handled? The docs reference `terraform apply`, `terraform plan`, etc. in ~95 places. → Add a note that `tofu` can replace `terraform`, don't duplicate command examples -
     callout the use of the environment variable for binary name in cdktf cli examples

---

## Tier 1: Core Pages (substantive updates)

### 1. `docs/index.mdx`

**Line 8 (intro paragraph):** Add OpenTofu to the description.
```
CDK Terrain (CDKTN) allows you to use familiar programming languages to define
and provision infrastructure. This gives you access to the entire Terraform
ecosystem without learning HashiCorp Configuration Language (HCL)...
```
→ Add after first sentence: mention that CDKTN works with both Terraform and OpenTofu.

**Line 22 (Deploy step):** "provision infrastructure with Terraform" → "provision infrastructure with Terraform or OpenTofu"

**Line 24 (ecosystem paragraph):** Add OpenTofu Registry alongside Terraform Registry. Currently:
> "You can use every Terraform provider and module available on the [Terraform Registry](...)"

→ Add: "or the [OpenTofu Registry](https://search.opentofu.org/)"

### 2. `docs/concepts/cdktn-architecture.mdx`

**Line 21 (### Terraform section header):** → "### Terraform / OpenTofu"

**Line 23:** "JSON configuration files that Terraform can use" → "that Terraform or OpenTofu can use"

**Line 25:** "All CDKTN CLI operations ... communicate with Terraform for execution" → "communicate with Terraform (or OpenTofu) for execution"

**Line 39:** After mentioning `terraform apply` and `terraform destroy` directly, add a note: "If you use OpenTofu, set `TERRAFORM_BINARY_NAME=tofu` — refer to [Environment Variables](/docs/create-and-deploy/environment-variables)."

### 3. `docs/create-and-deploy/environment-variables.mdx`

**Line 22 (TERRAFORM_BINARY_NAME row):** Expand description from:
> "The Terraform binary that CDKTN should use."

To something like:
> "The name of the Terraform-compatible binary that CDKTN should use. Set to `tofu` to use [OpenTofu](https://opentofu.org/) instead of Terraform."

Update default column from "The Terraform binary in path" to "`terraform`"

### 4. `docs/cli-reference/cli-configuration.mdx`

**After line 7 (intro paragraph):** Add a `<Tip>` callout:
> CDKTN works with both Terraform and OpenTofu. To use OpenTofu, set the `TERRAFORM_BINARY_NAME=tofu` environment variable. Refer to [Environment Variables](/docs/create-and-deploy/environment-variables) for details.

### 5. `docs/cli-reference/commands.mdx`

**After line 7 (before command list):** Add a `<Tip>` callout similar to cli-configuration, noting TERRAFORM_BINARY_NAME for OpenTofu users.

---

## Tier 2: First-Mention on Concept/Guide Pages

On each page, add "(or OpenTofu)" on the FIRST relevant "Terraform applies/provisions/manages" occurrence. Only one change per file — establishing context without cluttering.

| # | File | Line | Current | Change |
|---|------|------|---------|--------|
| 6 | `docs/concepts/remote-backends.mdx` | 9 | "Terraform stores [state]..." | "Terraform (or OpenTofu) stores [state]..." |
| 7 | `docs/concepts/resources.mdx` | 832 | "data that is only known after Terraform provisions the infrastructure" | "after Terraform (or OpenTofu) provisions the infrastructure" |
| 8 | `docs/concepts/tokens.mdx` | 9 | "values that are unknown until Terraform applies your configuration" | "until Terraform (or OpenTofu) applies your configuration" |
| 9 | `docs/concepts/functions.mdx` | 13 | "values based on runtime values that are unknown before Terraform applies" | "before Terraform (or OpenTofu) applies" |
| 10 | `docs/concepts/data-sources.mdx` | 13 | "data that is not known until after Terraform applies" | "until after Terraform (or OpenTofu) applies" |
| 11 | `docs/concepts/iterators.mdx` | 12 | "data that is not known until after Terraform applies" | "until after Terraform (or OpenTofu) applies" |
| 12 | `docs/concepts/variables-and-outputs.mdx` | 173 | "only available when Terraform applies a configuration" | "when Terraform (or OpenTofu) applies a configuration" |
| 13 | `docs/concepts/modules.mdx` | 232 | "only available after Terraform applies the configuration" | "after Terraform (or OpenTofu) applies the configuration" |
| 14 | `docs/examples-and-guides/refactoring.mdx` | 56 | "Terraform plans to destroy" | "Terraform (or OpenTofu) plans to destroy" |

---

## Tier 3: OpenTofu Registry Mentions

On pages that prominently reference the Terraform Registry as the source for providers/modules, add a mention of the OpenTofu Registry. The OpenTofu Registry shows the same providers with CDK language bindings (user is coordinating with OpenTofu maintainers on this).

| # | File | Line | Current | Change |
|---|------|------|---------|--------|
| 15 | `docs/concepts/providers.mdx` | 11 | "import them from the Terraform Registry" | "from the Terraform Registry or the [OpenTofu Registry](https://search.opentofu.org/)" |
| 16 | `docs/concepts/providers.mdx` | 19 | "Each provider on the [Terraform Registry](...)" | "Each provider on the [Terraform Registry](...) (also available on the [OpenTofu Registry](https://search.opentofu.org/))" |
| 17 | `docs/concepts/modules.mdx` | 17 | "modules from the [Terraform Registry](...)" | "modules from the [Terraform Registry](...) (or [OpenTofu Registry](https://search.opentofu.org/))" |
| 18 | `docs/examples-and-guides/examples.mdx` | 24 | "The [Terraform Registry](...) has more information" | "The [Terraform Registry](...) and [OpenTofu Registry](https://search.opentofu.org/) have more information" |

Note: `docs/create-and-deploy/configuration-file.mdx` has many `registry.terraform.io` links in config examples — leave those as functional URLs (they work for both Terraform and OpenTofu).

---

## Files Modified

| File | Change Type |
|------|-------------|
| `docs/index.mdx` | Intro + deploy step + ecosystem note |
| `docs/concepts/cdktn-architecture.mdx` | Section header + 3 text updates |
| `docs/create-and-deploy/environment-variables.mdx` | TERRAFORM_BINARY_NAME description |
| `docs/cli-reference/cli-configuration.mdx` | Add Tip callout |
| `docs/cli-reference/commands.mdx` | Add Tip callout |
| `docs/concepts/remote-backends.mdx` | First-mention |
| `docs/concepts/resources.mdx` | First-mention |
| `docs/concepts/tokens.mdx` | First-mention |
| `docs/concepts/functions.mdx` | First-mention |
| `docs/concepts/data-sources.mdx` | First-mention |
| `docs/concepts/iterators.mdx` | First-mention |
| `docs/concepts/variables-and-outputs.mdx` | First-mention |
| `docs/concepts/modules.mdx` | First-mention |
| `docs/examples-and-guides/refactoring.mdx` | First-mention |
| `docs/concepts/providers.mdx` | OpenTofu Registry mention (2 spots) |
| `docs/concepts/modules.mdx` | OpenTofu Registry mention |
| `docs/examples-and-guides/examples.mdx` | OpenTofu Registry mention |

**Total: 16 files, ~25 edits**

## Verification

- Search for "OpenTofu" in docs — should appear in exactly 16 files
- Search for "opentofu.org" — should appear in key pages (index, providers, modules, examples, env vars)
- Verify no OpenTofu mention on HCP Terraform or product-specific pages
- Verify `TERRAFORM_BINARY_NAME` description is enhanced
- `mint dev` — pages render without errors

All changes are complete and verified. Here's a summary:

16 files modified with ~25 edits total:

Tier 1 — Core pages (5 files):
- `docs/index.mdx` — Added OpenTofu to intro, deploy step, and ecosystem paragraph (with OpenTofu Registry link)
- `docs/concepts/cdktn-architecture.mdx` — Updated section header to "Terraform / OpenTofu", updated 2 text mentions, added TERRAFORM_BINARY_NAME=tofu note
- `docs/create-and-deploy/environment-variables.mdx` — Enhanced TERRAFORM_BINARY_NAME description with OpenTofu link, fixed default to terraform
- `docs/cli-reference/cli-configuration.mdx` — Added <Tip> callout about OpenTofu support
- `docs/cli-reference/commands.mdx` — Added <Tip> callout about OpenTofu support
Tier 2 — First-mention "(or OpenTofu)" (9 files):
- `docs/concepts/remote-backends.mdx`, `resources.mdx`, `tokens.mdx`, `functions.mdx`, `data-sources.mdx`, `iterators.mdx`, `variables-and-outputs.mdx`, `modules.mdx`
- `docs/examples-and-guides/refactoring.mdx`

Tier 3 — OpenTofu Registry links (3 files, 4 edits):
- `docs/concepts/providers.mdx` — 2 spots
- `docs/concepts/modules.mdx` — 1 spot
- `docs/examples-and-guides/examples.mdx` — 1 spot

Verification:
- "OpenTofu" appears in exactly 16 files
- "opentofu.org" links appear in 5 key pages (index, providers, modules, examples, env vars)
- No OpenTofu mentions on HCP Terraform or release/upgrade pages
- No changes to `registry.terraform.io` URLs in config examples
