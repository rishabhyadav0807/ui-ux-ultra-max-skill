<div align="center">

# UI/UX Ultra Max: an AI product design skill for Claude Code

**Make Claude design like a senior product designer, not a template.**

Persona-driven UX and UI design, grounded in named UX laws, rendered as real screens with every state, checked by a contrast and layout audit script, and approved by an independent three-member review council before you see it.

<a href="https://github.com/rishabhyadav0807/ui-ux-ultra-max-skill/releases"><img src="https://img.shields.io/github/v/release/rishabhyadav0807/ui-ux-ultra-max-skill?style=for-the-badge&color=blue" alt="Release"></a>
<img src="https://img.shields.io/badge/references-14-purple?style=for-the-badge" alt="14 references">
<img src="https://img.shields.io/badge/review_council-3_members-red?style=for-the-badge" alt="3-member review council">
<a href="LICENSE"><img src="https://img.shields.io/github/license/rishabhyadav0807/ui-ux-ultra-max-skill?style=for-the-badge&color=green" alt="MIT license"></a>
<br>
<a href="https://docs.claude.com/en/docs/claude-code/skills"><img src="https://img.shields.io/badge/Claude_Code-skill_%2B_plugin-orange?style=flat-square" alt="Claude Code skill and plugin"></a>
<a href="https://github.com/rishabhyadav0807/ui-ux-ultra-max-skill/stargazers"><img src="https://img.shields.io/github/stars/rishabhyadav0807/ui-ux-ultra-max-skill?style=flat-square&logo=github" alt="GitHub stars"></a>

[What you get](#what-you-get) · [Install](#install) · [How it decides](#how-it-works-and-makes-decisions) · [Example](#before-and-after) · [FAQ](#faq) · [Contributing](CONTRIBUTING.md)

</div>

## What is UI/UX Ultra Max?

**UI/UX Ultra Max is an open-source Claude Code skill that turns Claude into a senior product designer.** It designs apps, websites, features and flows by starting from a specific user persona, choosing the 5–8 UX laws and psychology principles that fit that person, building rendered screens with every state, and passing an independent design review before hand-over.

Most AI-generated interfaces look alike because defaults decide them: the component kit, the category's usual colours, the template's layout. UI/UX Ultra Max replaces defaults with reasons. **The persona decides which principles matter, and every visible decision traces back to the persona or to a named principle.**

## What you get

Every full design run hands you:

| Deliverable | What it contains |
|---|---|
| **User persona** | One specific person: job to be done, stakes, fears, context of use, language, mental model, and the 2–3 traits that drive the design. Labelled as a hypothesis for you to confirm. |
| **Design principles** | 5–8 UX laws, Gestalt, cognitive-psychology and persuasion principles, each written as *principle → because of this user → this design decision*. |
| **User flow** | Every step with its goal, main action and failure points, including unhappy paths, trust moments and returning visits. |
| **Design tokens** | Colour, typography, spacing, radius and motion, derived from a written "feel" statement, or reused from your existing design system. |
| **Rendered screens** | Real screens in your codebase, HTML, Penpot or Figma, with loading, empty, error and offline states, tested at 360px wide. |
| **Accessibility check** | A script measures WCAG 2.2 contrast from the rendered colours, touch targets of at least 44px, overflow at 360px and buttons touching container edges. Reviewers check that colour never carries meaning alone. |
| **Independent design review** | Three reviewers (user and brief, craft and layout, states and ethics) who must all pass the design. Their verdicts are included. |
| **Design rationale** | A short explanation linking each decision to the persona and the principle behind it, plus a list of what could not be verified. |

It also handles **design critiques** (a ranked fix list with the principle behind each fix), **small fixes** (one screen or component), and **UX questions** ("which law applies here?", "is this a dark pattern?").

### Who it is for

- **Product designers** who want a fast, principled first draft and a second pair of eyes.
- **Developers and founders** who need a good-looking, usable interface without a designer.
- **Non-designers**: the skill switches to plain language, asks at most three questions about your customers, and shows screens instead of specifications.
- **Teams** who want design decisions documented and reviewable, not just pixels.

## Before and after

Same prompt: *"I run a bakery and want an app for orders. It should look good."*

| Without the skill | With UI/UX Ultra Max |
|---|---|
| A generic food-delivery layout: hero banner, card grid, a purple-to-pink gradient | Starts from one person: a regular who orders the same thing every Friday and hates re-typing it |
| "Clean, modern, intuitive" with no reason behind any choice | Five named principles, e.g. *Hick's law: because Fridays are a repeat order → one "Order my usual" button above the menu* |
| Happy path only | Empty, loading, error, sold-out and "shop closed" states built |
| Unchecked contrast and tap sizes | Contrast computed from hex values, 44px targets, and a council pass before hand-over |
| A screen | A screen plus a short rationale that teaches you why it works |

*Illustrative and abridged. Real runs show the persona and flow for you to confirm before any screens are built.*

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

### Other agents

The skill is a standard `SKILL.md` folder. Agents that read that format (for example Codex CLI, through `~/.agents/skills/`) can load it from a copy of `skills/ui-ux-ultra-max-skill`. It is built and tested in Claude Code; on other agents, steps that render screens or start reviewer agents may need adapting.

### Prerequisites

None. Chrome or Chromium lets the skill look at its rendered screens and run its audit script (set `CHROME` if the browser is not in a standard place). Without one, it lists those checks under "Not checked".

### Optional companion

If [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) is installed, this skill uses it for **correctness only**: per-stack rules and its pre-delivery checklist. Taste always comes from the persona and the feel statement, never from a preset palette. Without it, the skill falls back to built-in WCAG 2.2 checks and its own audit script.

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

## How it works and makes decisions

Every decision follows one chain:

```text
Persona trait  →  Design principle  →  Visible design decision  →  Independent review
```

A choice that cannot be traced through this chain is treated as a default, and removed.

### 1. Sizing the request

| Request | Run |
|---|---|
| New product, feature, flow or redesign | **Full run**: all 10 steps, with a checkpoint after step 6 |
| Critique of an existing design | Persona, feel and principles, then a ranked critique, then an offer to redesign |
| Small, scoped fix | **Light run**: short persona, 1–3 principles, the fix and a one-line reason |
| "Which UX law applies to X?" | An answer for that user and moment, with no screens |

If the request has no design vocabulary (for example "I run a bakery and need an app that looks good"), the skill switches to **plain-language mode**: no jargon, at most three questions about your customers, rendered screens instead of specs, and a mandatory review council.

### 2. The ten-step design process

1. **Understand the input.** An idea, brief, flow, screenshot or codebase. For a redesign it reviews the product as it ships today and inventories every existing feature, so nothing disappears unannounced.
2. **Define the persona.** One specific person, with their goal, stakes, fears, device and context, language and reading level, and mental model. It names the **2–3 traits that will drive decisions** (for example *anxious, one-handed, wants their own doctor*) and who the design is *not* for.
3. **Write the feel statement.** Two or three words the product must feel like and one it must not. Colour, type and motion are derived from these words.
4. **Select principles.** From UX laws, Gestalt, cognitive psychology, persuasion and heuristics, it picks only the 5–8 that fit this persona and these screen moments, each written as *Fitts's law: because she books one-handed at night → the primary button sits at the bottom, full width.*
5. **Design the flow.** Each step's goal, primary action, principle and failure points; trust moments, effort spikes, the peak and the end; unhappy paths and return visits. Navigation changes get a structure map and a naming check.
6. **Choose the signature moment.** One moment, tied to the persona's strongest emotion or biggest fear, where the craft concentrates. Everything else stays familiar.
   > **Checkpoint:** you confirm the persona and flow before any screen is built. A wrong persona makes every screen wrong.
7. **Set tokens and medium.** Tokens come from the feel statement, or from your existing design system first. The medium is your codebase, HTML, Penpot or Figma.
8. **Build the screens** in a fixed order: hierarchy, type, space, colour, depth, icons, components, states, microcopy, motion, data, polish. Loading, empty, error and offline states are always built, plus any state the persona makes likely.
9. **Review.** The skill renders and inspects its own output, then runs an audit script for contrast, target size and 360px layout. Then the **review council** runs.
10. **Hand over** the screens with a rationale and a list of what could not be verified.

### 3. The independent review council

The builder never approves its own work. First, `scripts/audit.sh` measures contrast (4.5:1, or 3:1 for large text), 44px targets, overflow at 360px and buttons touching container edges, so no reviewer spends tokens on what a script can measure. Then three reviewers receive the brief, the persona and only the screenshots their checklist needs, not the builder's reasoning, so they judge the result rather than agree with it.

| Reviewer | Checks |
|---|---|
| **User and brief** | Can this user finish the main task on the first try, in their own words? Is everything requested delivered, every existing feature accounted for, every assumption written down? |
| **Craft and layout** | One focal point per screen, a consistent type and spacing scale, no generic-design tells, colour never the only signal |
| **States and ethics** | Loading, empty, error, offline, progress and payment states present and useful; no dark patterns, fake urgency, hidden costs or invented promises |

Each reviewer returns PASS or FAIL with a concrete fix. The design is revised for up to two rounds; each re-check sends only the changed screens to the reviewers that failed. A final audit and a re-check of anything changed after it passed come before hand-over. Anything unresolved is reported openly, never hidden.

### Token use

The council is the most expensive part of a run because reviewers read images. To keep it lean, each reviewer sees only its own screens, measurable checks run as a script, re-checks send only what changed, and the two checklist-style reviewers can run on a cheaper model. References load only at the step that needs them.

### 4. How conflicts are resolved

When principles or reviewers disagree, a fixed order decides:

1. **Accessibility** over aesthetics
2. **Ethics** over conversion
3. **The persona** over the average law (laws describe averages; the persona is the specific case)
4. **Convention** over novelty, except at the signature moment
5. **Taste** last

In addition, clarity beats delight in high-stakes moments, and delight beats efficiency at the peak and the end of a flow.

## Compared with ui-ux-pro-max

They do different jobs and work well together.

| | UI/UX Ultra Max | [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
|---|---|---|
| Starts from | A persona and their stakes | Product type and stack |
| Gives you | A designed flow and screens, with the reason for each decision | Searchable styles, palettes, font pairings and stack rules |
| Taste comes from | The feel statement and signature moment | Curated presets |
| Checks | Independent 3-member review council, audit script for contrast and layout | Rule lists and checklists |
| Best for | Deciding *what* to build and *why*, then building it | Looking up *how* to style and implement it correctly |

## What's inside

```text
skills/ui-ux-ultra-max-skill/
├── SKILL.md                      # the process, run sizes, output contract, rules
├── scripts/
│   ├── audit.js                  # in-page contrast, target, overflow and edge checks at 360px
│   └── audit.sh                  # runs audit.js on an HTML mockup in headless Chrome
└── references/
    ├── plain-language.md         # how to work with someone who is not a designer
    ├── structure.md              # redesign inventory, navigation, peers, names, progress states
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
    └── council.md                # audit script, the three reviewers, their checklists and the loop
```

## FAQ

### What does a Claude Code design skill do?

A Claude Code skill is a set of instructions and references that Claude loads when a task matches. UI/UX Ultra Max loads whenever you ask Claude to design, redesign, critique or polish an interface, and replaces Claude's default design habits with a persona-first process and an independent review.

### Do I need to be a designer to use it?

No. Describe what you want in your own words. The skill detects non-design requests, avoids jargon, asks at most three questions about your customers, and shows you rendered screens to react to.

### Which UX laws and principles does it use?

It draws on Hick's, Fitts's, Jakob's, Miller's and Tesler's laws, the Doherty threshold, the peak-end rule, Gestalt principles, Nielsen's heuristics, Norman's principles, Cialdini and Fogg (used ethically), Jobs to Be Done, Kano and WCAG 2.2. It applies only the 5–8 that fit your user, and names each one in the rationale.

### Does it produce code or just mockups?

Both. In a repository it builds screens in your existing stack and design system. Without one, it produces HTML mockups, or works in Penpot or Figma when they are connected.

### How is it different from ui-ux-pro-max?

ui-ux-pro-max is a searchable library of styles, palettes and stack rules. UI/UX Ultra Max is a design process that decides what to build and why, then builds and reviews it. They work well together; see the [comparison](#compared-with-ui-ux-pro-max).

### Will it use dark patterns if I ask for higher conversion?

No. Ethics outranks conversion. If a brief asks for a dark pattern, the skill flags it and proposes an honest alternative.

### Which AI coding agents does it support?

It is built and tested for Claude Code. Agents that read the standard `SKILL.md` format, such as Codex CLI, can load it, but the rendering and multi-agent review steps may need adapting.

## Versioning

This repo uses [Semantic Versioning](https://semver.org/). The version is kept in sync across `skill.json`, `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`. See [CHANGELOG.md](CHANGELOG.md).

## Contributing

Issues and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first. Please report security problems as described in [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © 2026 [Rishabh Yadav](https://github.com/rishabhyadav0807)

*Last updated: 27 November 2026*
