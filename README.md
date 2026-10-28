# UI/UX Ultra Max

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Claude Code skill](https://img.shields.io/badge/Claude%20Code-skill-orange)](https://docs.claude.com/en/docs/claude-code/skills)
![References](https://img.shields.io/badge/references-12-purple)
![Review council](https://img.shields.io/badge/review%20council-6%20members-red)

A Claude Code skill that makes Claude design like a senior product designer at Apple, Google, Wise or Airbnb.

Most AI-made design looks the same because defaults decide it: the kit's components, the category's colours, the template's layout. This skill replaces defaults with reasons. **The persona decides which principles matter, and every visible decision traces back to the persona or a named principle.**

## What it does

- **Starts from a person, not a template.** Every run builds a persona that changes decisions: stakes, fears, context, mental model, and the 2–3 traits that drive the design.
- **Picks 5–8 principles, not 50.** UX laws, Gestalt, cognitive psychology and persuasion, each written as `Principle: because <persona trait> → <decision>`.
- **Designs the flow before the screens.** Unhappy paths, trust moments, effort spikes, the peak and the end.
- **Builds real screens.** It works in your repo's code, an HTML mockup, Penpot or Figma, with every key state: empty, loading, error, offline and long text.
- **Has taste on purpose.** A feel statement, one signature moment per flow, and a list of generic-design tells to remove.
- **Never grades its own work.** An independent six-member review council must pass the design: persona stand-in, craft critic, layout and accessibility auditor, states auditor, ethics reviewer and brief keeper.
- **Teaches as it works.** The hand-over names the principle behind each decision, so you learn the laws.
- **Works for non-designers too.** It uses plain words, asks at most three questions about your customers, shows phone-sized screens and gives a plain hand-over.

## Install

### Claude Code plugin marketplace (recommended)

```text
/plugin marketplace add rishabhyadav0807/ui-ux-ultra-max-skill
/plugin install ui-ux-ultra-max-skill@ui-ux-ultra-max-skill
```

### Manual (global skill)

```bash
git clone https://github.com/rishabhyadav0807/ui-ux-ultra-max-skill.git
mkdir -p ~/.claude/skills
cp -R ui-ux-ultra-max-skill/skills/ui-ux-ultra-max-skill ~/.claude/skills/
```

### Manual (one project)

```bash
mkdir -p .claude/skills
cp -R ui-ux-ultra-max-skill/skills/ui-ux-ultra-max-skill .claude/skills/
```

Restart Claude Code after installing. The skill loads by itself when you ask for design work. You can also call it with `/ui-ux-ultra-max-skill`.

### Optional companion

If [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) is installed, this skill uses it for **correctness only**: contrast, target sizes and per-stack rules. Taste always comes from the persona and the feel statement, never from a preset palette. Without it, the skill falls back to built-in WCAG 2.2 checks.

## Usage

Ask for design work in your own words:

```text
Design the onboarding for a savings app for first-time investors in India.
Redesign the checkout in this repo. People drop off at payment.
Critique this screenshot of our pricing page.
Fix this empty state.
Which UX laws apply to a plan-picker for small businesses?
```

More in [examples/prompts.md](examples/prompts.md).

## How it works

The skill sizes each run first:

| Request | Run |
|---|---|
| New product, feature, flow or redesign | **Full run**: all 10 steps, with a checkpoint after step 6 |
| Critique of an existing design | Persona, feel and principles, then a ranked critique; it offers a redesign |
| Small, scoped fix | **Light run**: short persona, 1–3 principles, the fix, a one-line reason |
| "Which law applies to X?" | An answer for that persona, with no screens |

A full run goes through these steps:

1. **Read the input**, whether an idea, brief, flow, screenshot or code. For a redesign it looks at the UI as it ships today.
2. **Persona**: one specific person, labelled as a hypothesis.
3. **Feel**: 2–3 words it must feel like, and 1 it must not.
4. **Principles**: 5–8, each tied to a persona trait or moment.
5. **Flow**: steps, decision points, trust moments, unhappy paths and returning use.
6. **Signature moment**: the one place where the craft concentrates. *Checkpoint: you confirm the persona and flow before any screens are built.*
7. **Tokens and medium**: derived from the feel; your repo's design system comes first.
8. **Screens**: hierarchy, type, space, colour, depth, components, states, microcopy, motion, data and polish, in that order.
9. **Self-critique and council**: the result is rendered and looked at, contrast is computed, and the council runs until every member passes (at most 3 fix rounds).
10. **Hand-over**: a rationale that links persona, principle and decision, plus a "Not checked" list.

Fixed priority rules: persona beats the average law, accessibility beats aesthetics, ethics beats conversion, convention beats novelty (except at the signature moment), and clarity beats delight in high-stakes moments.

## What's inside

```text
skills/ui-ux-ultra-max-skill/
├── SKILL.md                      # the process, run sizes, output contract, rules
└── references/
    ├── persona.md                # persona card, inferring from thin input, trait → decision map
    ├── taste-signature.md        # feel statement, signature moment, generic-design tells
    ├── principle-selector.md     # which principles for which persona trait and screen moment
    ├── ux-laws.md                # Hick, Fitts, Jakob, Miller, Tesler, Doherty, peak-end, …
    ├── gestalt-perception.md     # proximity, similarity, focal point, reading patterns
    ├── psychology-persuasion.md  # biases used honestly, Cialdini, Fogg, dark patterns to refuse
    ├── heuristics-frameworks.md  # Nielsen, Norman, Shneiderman, Rams, JTBD, Kano, WCAG 2.2
    ├── flows-patterns.md         # flows, IA, onboarding, forms, checkout, search, trust patterns
    ├── mediums.md                # repo code, HTML mockups, Penpot, Figma; tokens first
    ├── ui-craft.md               # hierarchy → type → space → colour → … → polish
    ├── critique.md               # review order, critique format, self-critique gate
    └── council.md                # the six reviewers, their checklists and the loop
```

## Versioning

This repo uses [Semantic Versioning](https://semver.org/). The version is kept in sync across `skill.json`, `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`. See [CHANGELOG.md](CHANGELOG.md).

## Contributing

Issues and pull requests are welcome. Keep each reference focused on *when* a principle applies and *what decision it drives*, not on reciting theory. If you change the process in `SKILL.md`, update the README's "How it works" section in the same pull request.

## License

[MIT](LICENSE) © 2026 Rishabh Yadav
