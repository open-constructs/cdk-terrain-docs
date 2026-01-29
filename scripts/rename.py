#!/usr/bin/env python3
"""Rename CDKTF → CDKTN references across converted documentation.

Separate from convert.py (format conversion). This script handles:
- Branding: "CDK for Terraform" → "CDK Terrain", "CDKTF" → "CDKTN"
- Package names: cdktf → cdktn, @cdktf/* → @cdktn/*, etc.
- CLI commands: cdktf synth → cdktn synth, etc.
- Links: /terraform/cdktf/* → /docs/*, hashicorp/terraform-cdk → open-constructs/cdk-terrain

Protected (unchanged): cdktf.json, cdktf.out/, CDKTF_* env vars, ~/.cdktf, __cdktf_*
Release files (docs/release/): only link rewrites, no content renaming.

Usage:
    python scripts/rename.py                    # Run on all docs
    python scripts/rename.py --dry-run          # Show changes without writing
    python scripts/rename.py docs/concepts/resources.mdx  # Run on specific file(s)
"""

import os
import re
import sys
import glob

# ── Constants ──

DOCS_DIR = "docs"
RELEASE_DIR = os.path.join(DOCS_DIR, "release")

# ── Protected Patterns ──
# Order matters: more specific patterns first to avoid partial matches.
# Each tuple is (regex_pattern, description).

PROTECTED_PATTERNS = [
    # File name patterns (most specific first)
    (r"cdktf\.tf\.json", "synth output file"),
    (r"cdktf\.json", "config file"),
    (r"cdktf\.out", "output directory"),
    (r"cdktf\.log", "log file"),

    # Environment variables: CDKTF_ followed by uppercase letter
    (r"CDKTF_[A-Z]\w*", "env var"),
    (r"GITHUB_API_TOKEN_CDKTF", "env var"),

    # Paths and internals
    (r"~/\.cdktf", "home directory"),
    (r"__cdktf_\w*", "internal symbol"),

    # CLI flag
    (r"--cdktf-version", "CLI flag"),

    # Template variables in remote-templates.mdx scaffolding
    (r"npm_cdktf_cli", "template var"),
    (r"npm_cdktf(?!_)", "template var"),
    (r"pypi_cdktf", "template var"),
    (r"mvn_cdktf", "template var"),
    (r"nuget_cdktf", "template var"),
    (r"cdktf_version", "template var"),

    # Shell completion internal function names (word boundary regex
    # naturally preserves these, but protect to be safe)
    (r"_cdktf_yargs_completions", "shell completion function"),

    # GitHub org "cdktf" (separate from hashicorp/terraform-cdk)
    (r"github\.com/cdktf/", "cdktf GitHub org"),

    # Third-party package names we don't control
    (r"cdktf-tf-module-stack", "third-party package"),
    (r"projen-cdktf-hybrid-construct", "third-party package"),
]

# ── Logging ──

MANUAL_REVIEW = []


def log_review(filepath: str, line_num: int, line: str, reason: str) -> None:
    """Log items that need manual review."""
    MANUAL_REVIEW.append((filepath, line_num, line.strip(), reason))


# ── Protection Layer ──


def protect(content: str) -> tuple[str, list[tuple[str, str]]]:
    """Replace protected patterns with numbered sentinels.

    Returns (modified content, list of (sentinel, original) pairs for restoration).
    """
    restorations: list[tuple[str, str]] = []
    counter = [0]

    for pattern, _desc in PROTECTED_PATTERNS:

        def make_replacer():
            def replacer(match: re.Match) -> str:
                sentinel = f"<<PROT_{counter[0]:04d}>>"
                restorations.append((sentinel, match.group(0)))
                counter[0] += 1
                return sentinel

            return replacer

        content = re.sub(pattern, make_replacer(), content)

    return content, restorations


def restore(content: str, restorations: list[tuple[str, str]]) -> str:
    """Restore sentinels back to original protected values."""
    for sentinel, original in reversed(restorations):
        content = content.replace(sentinel, original)
    return content


# ── Link Rewrites (Tier 1 — ALL files) ──


def rename_links(content: str, filepath: str) -> str:
    """Rewrite links. Applied to all files including release."""

    # Internal links: /terraform/cdktf/X → /docs/X
    content = re.sub(
        r"\]\(/terraform/cdktf/",
        "](/docs/",
        content,
    )

    # GitHub repo links (URL)
    content = content.replace(
        "github.com/hashicorp/terraform-cdk",
        "github.com/open-constructs/cdk-terrain",
    )

    # GitHub repo references in link text (e.g. [hashicorp/terraform-cdk])
    content = content.replace(
        "hashicorp/terraform-cdk",
        "open-constructs/cdk-terrain",
    )

    # Log items needing manual review
    for i, line in enumerate(content.split("\n"), 1):
        if "discuss.hashicorp.com" in line:
            log_review(filepath, i, line, "discuss.hashicorp.com link")
        if "cdk.tf/" in line:
            log_review(filepath, i, line, "cdk.tf shortlink")

    return content


# ── Content Rewrites (Tier 2 — non-release files only) ──


def rename_content(content: str) -> str:
    """Rename CDKTF → CDKTN in content. Applied to non-release files only."""

    # ── Language-specific imports/packages (most specific first) ──

    # Go module path
    content = content.replace(
        "hashicorp/terraform-cdk-go/cdktf",
        "open-constructs/cdk-terrain-go/cdktn",
    )

    # Java package namespace
    content = content.replace("com.hashicorp.cdktf", "io.cdktn.cdktn")

    # Java Maven coordinate
    content = content.replace("com.hashicorp:cdktf", "io.cdktn:cdktn")

    # C# namespace
    content = content.replace("HashiCorp.Cdktf", "Io.Cdktn")

    # Python provider imports (must come before generic cdktf import)
    content = content.replace("from cdktf_cdktf_provider_", "from cdktn_provider_")
    content = content.replace("cdktf_cdktf_provider_", "cdktn_provider_")
    content = content.replace("cdktf-cdktf-provider-", "cdktn-provider-")

    # Python core import
    content = content.replace("from cdktf import", "from cdktn import")

    # TypeScript/JavaScript imports
    content = content.replace('from "cdktf"', 'from "cdktn"')
    content = content.replace("from 'cdktf'", "from 'cdktn'")
    content = content.replace('require("cdktf")', 'require("cdktn")')
    content = content.replace("require('cdktf')", "require('cdktn')")

    # Scoped npm packages
    content = content.replace("@cdktf/provider-", "@cdktn/provider-")
    content = content.replace("@cdktf/aws-cdk", "@cdktn/aws-cdk")
    content = content.replace("@cdktf/", "@cdktn/")

    # ── CLI and package names ──

    content = content.replace("cdktf-cli", "cdktn-cli")
    content = content.replace("cdktf-construct", "cdktn-construct")

    # Projen class and config
    content = content.replace("ConstructLibraryCdktf", "ConstructLibraryCdktn")
    content = content.replace("cdktfVersion", "cdktnVersion")

    # ── Project name (narrative text) ──

    # Full name with acronym introduction (do before standalone)
    content = content.replace("CDK for Terraform (CDKTF)", "CDK Terrain (CDKTN)")
    content = content.replace("CDK for Terraform", "CDK Terrain")

    # Acronym — word-boundary match to avoid hitting protected sentinels
    # At this point, CDKTF_* env vars are already sentinelized
    content = re.sub(r"\bCDKTF\b", "CDKTN", content)

    # ── Go package qualifiers (cdktf.NewApp → cdktn.NewApp) ──
    # Safe because cdktf.json/cdktf.out/cdktf.log are already sentinelized
    content = re.sub(r"\bcdktf\.", "cdktn.", content)

    # ── Remaining bare cdktf references ──

    # Quoted package name
    content = content.replace('"cdktf"', '"cdktn"')
    content = content.replace("'cdktf'", "'cdktn'")

    # Backtick-wrapped standalone
    content = content.replace("`cdktf`", "`cdktn`")

    # Projen destructuring: const { cdktf } = require("projen")
    content = content.replace("{ cdktf }", "{ cdktn }")

    # CLI command at start of inline code or shell prompt
    content = re.sub(r"`cdktf ", "`cdktn ", content)
    content = re.sub(r"\$ cdktf ", "$ cdktn ", content)

    # CLI command in code blocks (line starts with cdktf)
    content = re.sub(r"^cdktf ", "cdktn ", content, flags=re.MULTILINE)

    # Narrative references like "the cdktf package", "use cdktf to"
    content = re.sub(r"\bcdktf\b", "cdktn", content)

    return content


# ── File Processing ──


def is_release_file(filepath: str) -> bool:
    """Check if a file is in the release directory."""
    return RELEASE_DIR in filepath


def process_file(filepath: str, dry_run: bool = False) -> dict:
    """Process a single file through the protect-rename-restore pipeline.

    Returns stats dict with counts.
    """
    with open(filepath, "r") as f:
        original = f.read()

    release = is_release_file(filepath)

    # Step 1: Protect
    content, restorations = protect(original)

    # Step 2: Rename
    content = rename_links(content, filepath)
    if not release:
        content = rename_content(content)

    # Step 3: Restore
    content = restore(content, restorations)

    # Check for leftover sentinels (should never happen)
    sentinel_check = re.findall(r"<<PROT_\d{4}>>", content)
    if sentinel_check:
        print(f"  ERROR: Leftover sentinels in {filepath}: {sentinel_check}")

    # Stats
    changed = content != original
    stats = {
        "filepath": filepath,
        "release": release,
        "changed": changed,
        "protections": len(restorations),
    }

    if changed and not dry_run:
        with open(filepath, "w") as f:
            f.write(content)

    if changed and dry_run:
        # Show a summary of what changed
        orig_lines = original.split("\n")
        new_lines = content.split("\n")
        diffs = 0
        for i, (o, n) in enumerate(zip(orig_lines, new_lines), 1):
            if o != n:
                diffs += 1
                if diffs <= 10:
                    print(f"  L{i}: {o[:100]}")
                    print(f"    → {n[:100]}")
        if diffs > 10:
            print(f"  ... and {diffs - 10} more changed lines")
        stats["diff_lines"] = diffs

    return stats


def main():
    dry_run = "--dry-run" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("--")]

    if args:
        # Process specific files
        files = args
    else:
        # Process all .mdx files in docs/
        files = sorted(glob.glob(os.path.join(DOCS_DIR, "**", "*.mdx"), recursive=True))

    if not files:
        print("No files found.")
        return

    mode = "DRY RUN" if dry_run else "RENAMING"
    print(f"=== {mode}: {len(files)} files ===\n")

    changed_count = 0
    release_count = 0
    total_protections = 0

    for filepath in files:
        if not os.path.exists(filepath):
            print(f"  MISSING: {filepath}")
            continue

        rel = os.path.relpath(filepath)
        release = is_release_file(filepath)
        tag = " [release: links only]" if release else ""
        print(f"Processing: {rel}{tag}")

        stats = process_file(filepath, dry_run=dry_run)

        if stats["changed"]:
            changed_count += 1
        if stats["release"]:
            release_count += 1
        total_protections += stats["protections"]

    # Summary
    print(f"\n=== Summary ===")
    print(f"Files processed: {len(files)}")
    print(f"Files changed: {changed_count}")
    print(f"Release files (links only): {release_count}")
    print(f"Total protections applied: {total_protections}")

    if MANUAL_REVIEW:
        print(f"\n=== Manual Review Required ({len(MANUAL_REVIEW)} items) ===")
        for filepath, line_num, line, reason in MANUAL_REVIEW:
            print(f"  {os.path.relpath(filepath)}:{line_num} [{reason}]")
            print(f"    {line[:120]}")

    # Rename image files and mdx files with cdktf in the name
    file_renames = {
        "images/cdktf-app-architecture.png": "images/cdktn-app-architecture.png",
        "images/cdktf-terraform-workflow.png": "images/cdktn-terraform-workflow.png",
        "images/cdktf-terraform.png": "images/cdktn-terraform.png",
        "docs/concepts/cdktf-architecture.mdx": "docs/concepts/cdktn-architecture.mdx",
    }

    print(f"\n=== File Renames ===")
    for old_path, new_path in file_renames.items():
        if os.path.exists(old_path):
            if dry_run:
                print(f"  Would rename: {old_path} → {new_path}")
            else:
                os.rename(old_path, new_path)
                print(f"  Renamed: {old_path} → {new_path}")
        else:
            # Already renamed or missing
            if os.path.exists(new_path):
                print(f"  Already renamed: {new_path}")
            else:
                print(f"  MISSING: {old_path}")

    # Update docs.json to reflect the cdktf-architecture → cdktn-architecture rename
    docs_json_path = "docs.json"
    if os.path.exists(docs_json_path):
        with open(docs_json_path, "r") as f:
            docs_json_content = f.read()
        new_docs_json = docs_json_content.replace(
            "docs/concepts/cdktf-architecture",
            "docs/concepts/cdktn-architecture",
        )
        if new_docs_json != docs_json_content:
            if dry_run:
                print(f"  Would update docs.json: cdktf-architecture → cdktn-architecture")
            else:
                with open(docs_json_path, "w") as f:
                    f.write(new_docs_json)
                print(f"  Updated docs.json: cdktf-architecture → cdktn-architecture")

    if dry_run:
        print(f"\nDry run complete. No files were modified.")


if __name__ == "__main__":
    main()
