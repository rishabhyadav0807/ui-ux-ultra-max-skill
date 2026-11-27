# Changelog

All notable changes to this skill are listed here. Versions follow [Semantic Versioning](https://semver.org/).

## 1.1.0 (2026-11-27)

Uses far fewer tokens per run, mostly in the review council.

- Review council cut from six members to three: User and brief, Craft and layout, States and ethics. Every checklist item is kept.
- Each member gets only the screenshots its checklist needs, instead of every screen.
- New `scripts/audit.js` and `scripts/audit.sh` measure contrast, tap-target size, overflow at 360px and buttons touching container edges in headless Chrome, so no reviewer reads images for these.
- Fix rounds cut from 3 to 2. Re-checks send only changed screens to the members that failed. The final full round becomes a re-audit plus a re-check of screens changed after a member passed them.
- Optional cheaper model for the Craft and States members.
- `SKILL.md` cut by about 30%: the non-designer mode moved to `references/plain-language.md`, and redesign and navigation rules moved to `references/structure.md`. Both load only when needed.
- Steps 4 and 8 now say to search the large references and skip `ui-craft.md` sections that don't apply.
- ui-ux-pro-max is optional again: `SKILL.md` and `heuristics-frameworks.md` restore the fallback to the built-in WCAG checks.
- HTML mockups mark each screen with `data-screen`, so the audit and per-screen screenshots work.

## 1.0.1 (2026-10-28)

- Renamed to `ui-ux-ultra-max-skill` everywhere (repo, plugin, marketplace, skill folder).
- Skill description rewritten as trigger conditions only, so Claude loads it at the right moments; the "what it does" summary moved to the plugin and README.
- README: before-and-after example, comparison with ui-ux-pro-max, install notes for other agents, prerequisites.
- Added CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, issue and pull request templates, and a CI check for version and frontmatter consistency.

## 1.0.0 (2026-10-28)

First public release.

- Persona-first process in 10 steps: input, persona, feel, principles, flow, signature moment, tokens and medium, screens, self-critique and council, hand-over.
- Three run sizes: full run (with a checkpoint after the flow), critique, and light run for small fixes.
- A plain-language mode for people with no design background.
- 12 references: persona, taste and signature, principle selector, UX laws, Gestalt and perception, psychology and persuasion (with a dark-pattern list), heuristics and frameworks, flows and patterns, mediums, UI craft, critique, and the review council.
- Independent six-member review council (persona stand-in, craft, layout and accessibility, states, ethics, brief keeper) that must pass a design before hand-over.
- Optional use of ui-ux-pro-max for correctness checks; built-in WCAG checks otherwise.
