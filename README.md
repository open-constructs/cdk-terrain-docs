# CDK Terrain documentation

This documentation site is built with [Mintlify](https://mintlify.com), a platform for creating beautiful, functional documentation sites from MDX files.

All content lives under the `content/` folder in this repository. You can customize the site by editing the MDX files and the `docs.json` configuration file.

Local preview can be run with the Mintlify CLI:

```bash
pnpm install
pnpm dev
```

## Release notes process

The docs aren't versioned: the site always describes the latest CDK Terrain release. When a new version (vX.Y) ships:

1. **Update the What's New hub** (`content/release/index.mdx`). Replace the "Latest" block with vX.Y: the release date, 3–5 highlights, and links to the release notes and upgrade guide. Shrink the previous latest version to one line under "Earlier releases".
2. **Add a `release/whats-new/vX-Y/` group.** Start with an `index.mdx` overview (`sidebarTitle: Overview`) that lists every user-facing feature, breaking change, and deprecation in 1–3 sentences with a link. Give a feature its own page only when it needs more than a few paragraphs (a migration path, before/after code, or a flag). Add the group to the "What's New" navigation in `docs.json`, newest first. Sources: `CHANGELOG.md` and the PRs in [open-constructs/cdk-terrain](https://github.com/open-constructs/cdk-terrain).
3. **Add a "Pre-built providers" section** to the overview, built from the [cdktn-io/cdktn-repository-manager](https://github.com/cdktn-io/cdktn-repository-manager) PRs merged in the release window: new providers, provider majors, the CDKTN pin bump, and runtime or publishing changes. Leave it out if nothing user-facing changed.
4. **Write an upgrade guide** (`release/upgrade-guide-vX-Y.mdx`) only for minor versions with breaking changes (`⚠ BREAKING CHANGES` in the changelog). Give the exact steps from the previous version, including flags that became the default or were removed.
5. **Add forward notes to older pages.** When the release changes a feature that an older What's New page describes, add a one-line note there (for example, "Became the default in v0.24; the flag was removed.") and rewrite any now-false "how to enable" steps as history.
6. **Keep the feature-flag table current.** The hub lists only the flags in `FUTURE_FLAGS` (`packages/cdktn/src/features.ts`) at the new release.
7. **Update the site banner** in `docs.json` to announce vX.Y with links to the GitHub release and the upgrade guide (or the What's New overview when there is no upgrade guide).
8. **Add redirects only when files move.** Pages stay where they are; if one has to move, add a `redirects` entry in `docs.json` and update every inbound link.
9. **Update concept pages** for anything that changed how you use a feature. What's New pages record what changed and link to the concept pages for how-to.

Run `cd content && pnpm exec mint broken-links` before you open the pull request.
