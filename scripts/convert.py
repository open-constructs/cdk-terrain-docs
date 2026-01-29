#!/usr/bin/env python3
"""Convert CDKTF docs from HashiCorp format to Mintlify format.

Transformations:
1. Frontmatter: page_title → title
1b. Add sidebarTitle from nav data (short sidebar labels)
2. Remove duplicate H1 after frontmatter
3. Remove <!-- #NEXT_CODE_BLOCK_SOURCE:... --> comments
4. Flag <!-- This file is generated... --> comments
5. CodeTabs → CodeGroup (rename tag)
5b. Add titles to code fences inside CodeGroup
5c. Tab heading="..." group="..." → Tab title="..."
6. Arrow callout markers → Mintlify components
7. Blockquote callouts → Mintlify components
8. Image paths: /img/ → /images/
"""

import json
import re
import sys
import os

# Language identifier → display title for code fence tabs
LANG_TITLES = {
    "ts": "TypeScript",
    "typescript": "TypeScript",
    "python": "Python",
    "java": "Java",
    "csharp": "C#",
    "go": "Go",
    "shell-session": "Shell",
    "shell": "Shell",
    "bash": "Bash",
    "json": "JSON",
    "hcl": "HCL",
    "terraform": "HCL",
}

# Links to log (not rewrite)
LINK_LOG = []


def build_sidebar_title_map(nav_data_path: str) -> dict:
    """Build a map of file paths to sidebar titles from nav data JSON.

    Returns a dict like {"concepts/constructs": "Constructs", ...}
    """
    with open(nav_data_path, "r") as f:
        nav_data = json.load(f)

    title_map = {}

    def walk(items):
        for item in items:
            if "path" in item and "title" in item:
                title_map[item["path"]] = item["title"]
            if "routes" in item:
                walk(item["routes"])

    walk(nav_data)
    return title_map


# Build the map at module load time
SIDEBAR_TITLE_MAP = build_sidebar_title_map("v0.21.x/data/cdktf-nav-data.json")


def add_sidebar_title(content: str, dst_rel: str) -> str:
    """Add sidebarTitle to frontmatter based on nav data.

    dst_rel is the destination path relative to docs/, e.g. "concepts/constructs.mdx".
    Looks up the short nav title and inserts sidebarTitle after title in frontmatter.
    """
    # Convert file path to nav data key (strip .mdx extension)
    nav_key = dst_rel.replace(".mdx", "")

    sidebar_title = SIDEBAR_TITLE_MAP.get(nav_key)
    if not sidebar_title:
        return content

    # Check if the frontmatter title already matches the sidebar title
    # (no need to add sidebarTitle if they're the same)
    title_match = re.search(r"^title:\s*(.+?)$", content, re.MULTILINE)
    if title_match:
        current_title = title_match.group(1).strip().strip("'\"")
        if current_title == sidebar_title:
            return content

    # Insert sidebarTitle right after the title line in frontmatter
    content = re.sub(
        r"^(title:\s*.+)$",
        rf"\1\nsidebarTitle: {sidebar_title}",
        content,
        count=1,
        flags=re.MULTILINE,
    )
    return content


def transform_frontmatter(content: str) -> str:
    """Rename page_title to title in YAML frontmatter."""
    return re.sub(
        r"^(---\n(?:.*\n)*?)page_title:\s*(.+?)(\n(?:.*\n)*?---)",
        r"\1title: \2\3",
        content,
        count=1,
    )


def remove_duplicate_h1(content: str) -> str:
    """Remove the first H1 heading that appears right after frontmatter.

    The frontmatter title replaces it in Mintlify.
    """
    # Match end of frontmatter then optional blank lines then # Heading then blank line
    return re.sub(
        r"(---\n)\n*# .+\n\n?",
        r"\1\n",
        content,
        count=1,
    )


def remove_source_comments(content: str) -> str:
    """Remove <!-- #NEXT_CODE_BLOCK_SOURCE:... --> metadata comments."""
    return re.sub(r"<!-- #NEXT_CODE_BLOCK_SOURCE:[^\n]* -->\n?", "", content)


def flag_generated_comments(content: str, filepath: str) -> str:
    """Warn about generated file comments but leave them."""
    if "<!-- This file is generated" in content:
        print(f"  WARNING: {filepath} contains generated file comment")
    return content


def convert_codetabs(content: str) -> str:
    """Replace <CodeTabs> with <CodeGroup> and add titles to code fences."""
    # Step 1: Rename tags
    content = content.replace("<CodeTabs>", "<CodeGroup>")
    content = content.replace("</CodeTabs>", "</CodeGroup>")

    # Step 2: Add titles to code fences inside CodeGroup blocks
    # We need to process code fences that are inside CodeGroup blocks
    result = []
    in_codegroup = False
    in_code_block = False

    for line in content.split("\n"):
        if "<CodeGroup>" in line:
            in_codegroup = True
            result.append(line)
            continue
        if "</CodeGroup>" in line:
            in_codegroup = False
            result.append(line)
            continue

        if in_codegroup and not in_code_block:
            # Check for opening code fence
            m = re.match(r"^(```)([\w-]+)\s*$", line)
            if m:
                lang = m.group(2)
                title = LANG_TITLES.get(lang, "")
                if title:
                    line = f"```{lang} {title}"
                in_code_block = True
                result.append(line)
                continue

        if in_code_block and line.startswith("```") and line.strip() == "```":
            in_code_block = False

        result.append(line)

    return "\n".join(result)


def convert_tab_attrs(content: str) -> str:
    """Convert <Tab heading="..." group="..."> to <Tab title="...">."""
    return re.sub(
        r'<Tab\s+heading="([^"]+)"(?:\s+group="[^"]*")?\s*>',
        r'<Tab title="\1">',
        content,
    )


def convert_arrow_callouts(content: str) -> str:
    """Convert arrow-prefix callout lines to Mintlify components.

    Patterns:
    - ~> **Note:** text  → <Note>text</Note>
    - ~> **Warning:** text → <Warning>text</Warning>
    - ~> **Important**: text → <Warning>text</Warning>
    - -> **Note:** text → <Note>text</Note>
    - ->**Note**: text → <Note>text</Note>  (no space after arrow)
    - +-> **Note:** text → <Tip>text</Tip>
    - +-> text (without label) → <Tip>text</Tip>
    """
    lines = content.split("\n")
    result = []
    i = 0
    while i < len(lines):
        line = lines[i]

        # Match arrow callout patterns
        # ~> **Warning:** text
        m = re.match(r"^~>\s*\*\*Warning:?\*\*:?\s*(.+)$", line)
        if m:
            result.append(f"<Warning>{m.group(1)}</Warning>")
            i += 1
            continue

        # ~> **Important**: text (treat as warning)
        m = re.match(r"^~>\s*\*\*Important:?\*\*:?\s*(.+)$", line)
        if m:
            result.append(f"<Warning>{m.group(1)}</Warning>")
            i += 1
            continue

        # ~> **Note:** text
        m = re.match(r"^~>\s*\*\*Note:?\*\*:?\s*(.+)$", line)
        if m:
            result.append(f"<Note>{m.group(1)}</Note>")
            i += 1
            continue

        # -> **Note:** text (with or without space after ->)
        m = re.match(r"^->\s*\*\*Note:?\*\*:?\s*(.+)$", line)
        if m:
            result.append(f"<Note>{m.group(1)}</Note>")
            i += 1
            continue

        # +-> **Note:** text
        m = re.match(r"^\+->\s*\*\*Note:?\*\*:?\s*(.+)$", line)
        if m:
            result.append(f"<Tip>{m.group(1)}</Tip>")
            i += 1
            continue

        # +-> text (without label)
        m = re.match(r"^\+->\s*(.+)$", line)
        if m:
            result.append(f"<Tip>{m.group(1)}</Tip>")
            i += 1
            continue

        result.append(line)
        i += 1

    return "\n".join(result)


def convert_blockquote_callouts(content: str) -> str:
    """Convert blockquote callouts to Mintlify components.

    Patterns:
    - > **Note:** text → <Note>text</Note>
    - > **Note**: text → <Note>text</Note>
    - > **Hands-on:** text → <Tip>text</Tip>
    - > **Hands On:** text → <Tip>text</Tip>
    """
    lines = content.split("\n")
    result = []

    for line in lines:
        # > **Note:** text or > **Note**: text
        m = re.match(r"^>\s*\*\*Note:?\*\*:?\s*(.+)$", line)
        if m:
            result.append(f"<Note>{m.group(1)}</Note>")
            continue

        # > **Hands-on:** or > **Hands On:** text (hyphenated or space variant)
        m = re.match(r"^>\s*\*\*Hands[\s-][Oo]n:?\*\*:?\s*(.+)$", line)
        if m:
            result.append(f"<Tip>{m.group(1)}</Tip>")
            continue

        result.append(line)

    return "\n".join(result)


def fix_image_paths(content: str) -> str:
    """Rewrite image paths from /img/ to /images/."""
    return content.replace("(/img/", "(/images/")


def log_internal_links(content: str, filepath: str) -> None:
    """Log internal links for review (don't rewrite)."""
    for m in re.finditer(r"\]\(/terraform/[^\)]+\)", content):
        LINK_LOG.append(f"  {filepath}: {m.group()}")


def convert_file(src_path: str, dst_path: str, dst_rel: str) -> None:
    """Apply all transformations to a single file."""
    with open(src_path, "r") as f:
        content = f.read()

    rel = os.path.relpath(src_path)
    print(f"Converting: {rel}")

    # Apply transforms in order
    content = transform_frontmatter(content)
    content = add_sidebar_title(content, dst_rel)
    content = remove_duplicate_h1(content)
    content = remove_source_comments(content)
    flag_generated_comments(content, rel)
    content = convert_codetabs(content)
    content = convert_tab_attrs(content)
    content = convert_arrow_callouts(content)
    content = convert_blockquote_callouts(content)
    content = fix_image_paths(content)
    log_internal_links(content, rel)

    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    with open(dst_path, "w") as f:
        f.write(content)


def main():
    src_base = "v0.21.x/docs/cdktf"
    dst_base = "docs"

    # Map of source files → destination files
    # Top-level files
    files = {
        "index.mdx": "index.mdx",
        "community.mdx": "community.mdx",
        "telemetry.mdx": "telemetry.mdx",
    }

    # Subdirectories to convert (excluding api-reference)
    subdirs = [
        "concepts",
        "create-and-deploy",
        "develop-custom-constructs",
        "examples-and-guides",
        "test",
        "cli-reference",
        "release",
    ]

    for subdir in subdirs:
        src_dir = os.path.join(src_base, subdir)
        if os.path.isdir(src_dir):
            for fname in sorted(os.listdir(src_dir)):
                if fname.endswith(".mdx"):
                    files[os.path.join(subdir, fname)] = os.path.join(subdir, fname)

    # Process all files
    converted = 0
    for src_rel, dst_rel in sorted(files.items()):
        src_path = os.path.join(src_base, src_rel)
        dst_path = os.path.join(dst_base, dst_rel)
        if os.path.exists(src_path):
            convert_file(src_path, dst_path, dst_rel)
            converted += 1
        else:
            print(f"  MISSING: {src_path}")

    print(f"\nConverted {converted} files.")

    if LINK_LOG:
        print(f"\nInternal links found ({len(LINK_LOG)} total):")
        for entry in LINK_LOG:
            print(entry)


if __name__ == "__main__":
    main()
