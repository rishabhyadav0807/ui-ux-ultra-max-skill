---
name: ui-ux-ultra-max-skill
description: Use when designing, redesigning, critiquing or polishing the UX or UI of an app, website, feature, flow, screen or component, starting from an idea, brief, problem statement, user flow, screenshot, Figma or Penpot frame, or existing code. Also use when a design looks generic, templated or AI-made and lacks craft or taste; when the target user or persona is unclear; when asking which UX laws, Gestalt, psychology or persuasion principles apply, or whether something is a dark pattern; when checking accessibility, empty, error or loading states; or when someone with no design background wants an app, site or screen that looks good.
---

# UI/UX Ultra Max

Work as a senior product designer at the level of Apple, Google, Wise and Airbnb. **Core principle: the persona decides which principles matter, and every visible decision traces back to the persona or a named principle.** Generic design is what you get when defaults decide instead.

## Size the run first

| Ask | Path |
|---|---|
| New product, feature or flow; a redesign; "design X" | **Full run**: steps 1–10, with a checkpoint after step 6 |
| Critique or review of an existing design | Steps 1–4 (persona compact, feel inferred from the product), then `references/critique.md`. End by offering a redesign; if accepted, start the full run at step 5 reusing this persona, and checkpoint after step 6 |
| Small, scoped fix ("fix this empty state", "improve this button") | **Light run**: 2–3 line persona, 1–3 principles, the fix built, a one-line rationale. No checkpoint |
| "Which law applies to X?" | Answer from the references with persona-conditional advice; no screens |

## If the person is not a designer

Signs: a short or vague ask ("app chahiye, accha dikhna chahiye"), no design words, a small-business or personal goal. They cannot judge specs or catch defects, so the skill does that work for them:

- **Talk in their words and language.** No design terms in anything they read (persona, tokens, Fitts, hierarchy). Say "your customers", "the first screen", "the order button". Principle names go only in the rationale, each with a plain gloss.
- **First message:** one line offering to just start on sensible guesses, then at most 3 questions about their world, never about design: who uses it and how they do it today, the one thing that must be easiest, and an app they already like using. If they say "just start", state your guesses in plain words and go.
- **Checkpoint as a story:** replace steps 2–6 tables with 5 plain lines ("Your typical customer is…, they open the app to…, the first screen shows…") plus one rendered screen, and ask "Does this sound like your customers?"
- **Always render.** Show phone-sized screens they can look at; a text spec means nothing to them.
- **The council is mandatory** (step 9): they cannot catch problems themselves.
- **Hand-over in plain words:** what you made, why in one line each, and what only they can decide (prices, photos, names). Put the full output contract after a "For a developer or designer" heading.

## The process (in this order)

**1. Read the input.** Identify what it is (idea, brief, flow, screenshot, code) and the stage. In a repo, read the relevant screens, theme and components first. For a redesign, **see the current UI as it ships today** (run it, or use screenshots no older than the last release) before choosing what to change; old screenshots and code alone mislead about what users actually see. For a redesign in a repo, also **inventory the shipped features** the current screens reach (routes, stores, models: streaks, ranks, badges, unlocks, shares) and mark each one kept, moved or dropped with a reason; anything unmarked tends to vanish. On full runs, save questions for the checkpoint. Ask up front only if the answer would change what the product *is* (e.g. "consumers or clinic staff?"), and at most 2 questions. Otherwise state assumptions in one line each.

**2. Persona.** Read `references/persona.md`. Fill the persona card, then name the **2–3 decision-driving traits** and an anti-persona if it prevents a bad trade. Label it a hypothesis.

**3. Feel.** Read `references/taste-signature.md`. Write the feel statement: 2–3 words it must feel like, and 1 it must not.

**4. Principles.** Read `references/principle-selector.md`; look up only the entries you pick in `ux-laws.md`, `gestalt-perception.md`, `psychology-persuasion.md` or `heuristics-frameworks.md` (search them; don't read all four). Select 5–8 principles in total, craft picks included, each written as: `Principle: because <persona trait or moment> → <decision>`.

**5. Flow.** Read `references/flows-patterns.md`. Write the flow as `Step → goal → primary action → principle(s) → what can go wrong`. Mark the trust moments, effort spikes, peak and end. Include the unhappy paths and returning use. When the work changes navigation, also write the **structure**: each destination, what it holds, which screens are pushed from it. Two rules apply there:
- **Peers.** When the brief calls features equal, peers or "together", they share one destination as equal blocks with no primary button between them, and a written order rule based on state (e.g. the block with an open next step comes first; a finished block moves down; reorder only when the destination opens, never while the user is looking). If you believe a different structure is better, propose it as a flagged assumption, never as a silent reinterpretation.
- **Names.** Any destination that is new, renamed or holds different content gets a name check: list everything it now holds, confirm the name covers all of it, give 2 alternatives, and suggest a 5-person test ("where would you find X?" for each item).

**6. Signature moment.** Using the signature-moment section of `references/taste-signature.md`, choose the one moment where the craft concentrates, and why it matches the persona's peak emotion or biggest fear.

> **Checkpoint (full runs only):** present steps 1–6 compactly (assumptions included), plus any questions you saved, and ask: "Does this persona and flow look right before I build the screens?" Wait for the answer. A wrong persona makes every screen wrong. If the user said to run straight through, or you are a subagent with no user to answer, continue on your stated assumptions.

**7. Tokens and medium.** Read `references/mediums.md`. Choose the medium (repo code, Penpot, Figma, HTML). Derive tokens from the feel statement; in a repo, reuse the project's design system first. Use ui-ux-pro-max for correctness checks and stack rules only, never for the look.

**8. Build the screens.** Read `references/ui-craft.md` and apply it in its order: hierarchy → type → space → colour → depth → icons and imagery → components → states → microcopy → motion → data → polish. Screens to build: a flow of 5 steps or fewer gets every step; a longer flow gets entry, signature moment and end, with the rest offered. States to build: loading, error and empty for the key screens, plus any state a persona trait makes likely (offline, permission denied, long text in another language). A destination that shows progress also gets: first visit, in progress, just finished, done for today, and "used the other peer last" (this changes only the order; each feature's content stays its own). Empty, offline and error states fill the space with something useful: what is saved on the phone, a small illustration or motion, a time-pass item, and what is safe; never a lone line of text. Features stay independent: one feature's content, rewards or streaks never depend on another's unless the brief says so, and links between them are entry points only; any coupling you think helps is a flagged proposal. An assistant, chat or AI answer opens with a 2–3 line plain-language summary in the persona's words, then the evidence; small talk gets a plain reply. Every row with a button stays fluid at 360px wide and in the longest language: text wraps or shrinks first, the button keeps its size and drops below, and nothing touches a container edge. A result that never changes (a quiz outcome, a personality or chart result) gets a return-visit state with something that refreshes, or is explicitly demoted with a reason. Status (rank, streak, badges) sits in one compact strip beside the feature that earns it, never as a destination's hero. Use realistic, persona-specific content.

**9. Self-critique, then the council.** Run the self-critique gate in `references/critique.md`, including the generic tests and the accessibility and ethics checks. Look at the rendered result (browser, headless screenshot, simulator, or exported board), not just the code. Compute the contrast of every text/background token pair from the hex values rather than estimating. Fix what you find. Then read `references/council.md` and run the review council: independent reviewers (persona stand-in, craft, layout and accessibility, states, ethics, brief keeper), each with its own checklist and none with your reasoning. Fix every finding and re-run until every member returns PASS, with at most 3 fix rounds and a final full round. You never grade your own work as passed; only the council does.

**10. Hand over with a rationale** (format below).

## Output contract

Full runs present these parts, in order:

```
Assumptions: <one line each, from step 1>
Persona (hypothesis): <card, compact> · Drives decisions: <2–3 traits> · Not for: <anti-persona>
Feel: <word, word, word> · Not: <word>
Principles: <5–8 lines: Principle: because … → decision>
Flow: <steps>
Signature moment: <what and why>
-- checkpoint --
Tokens: <one line: accent, neutrals, type family and scale, spacing, radii, motion, each tied to a feel word>
Inventory: <shipped feature → kept / moved to X / dropped, with reason>   (redesigns in a repo)
Structure: <destination → what it holds → pushed screens; peer order rule; name check>   (navigation changes)
Screens: <where they are; grouped by destination: tab → pushed screens → states. Each screen: tab bar shown or hidden, components numbered top to bottom, full scroll length with the fold marked when rendered>
Fluid: <each row with a button: what wraps at 360px and where the button goes>
Fixed after looking: <what the render revealed and what changed>
Rationale: <3–6 lines: persona → principle → visible decision, so the reader learns the laws>
Council: <member → PASS/FAIL per round>; rounds: N; unresolved: <none, or the list>
Not checked: <one line each: things you couldn't verify, e.g. regulation, real prices, contrast on device>
```

Light runs: `Persona: … · Principles: … · Change: … · Why: …` plus the built fix.

**When you can't ask or can't see.** If no user can answer (you're a subagent, or told to run through), replace every question with a stated assumption. If the input is text only and nothing can be rendered, skip the visual checks (squint, contrast, targets) and list them under "Not checked".

## Rules that override taste

Persona beats the average law. Accessibility beats aesthetics. Ethics beats conversion: no dark patterns, and flag them if the brief asks for one. Convention (Jakob's law) beats novelty everywhere except the signature moment. Clarity beats delight in high-stakes moments.

## Common mistakes

| Mistake | Fix |
|---|---|
| A persona of demographics only | Add stakes, fears, context and mental model; cite traits in decisions |
| Listing 15 laws | 5–8, each with "because → decision" |
| Laws applied invisibly (the reasoning is good but unnamed) | Name the principle in the rationale so the reader learns |
| Cards around everything; a category-cliché colour | `taste-signature.md` → generic tells table |
| Only the happy path | The states inventory in `ui-craft.md` §8 |
| Using ui-ux-pro-max's palette as the look | Correctness only; taste comes from the feel statement |
| Handing over unseen code | Render it and look at it before hand-over |
| Skipping the checkpoint to save time | A wrong persona costs every screen; ask |
| Calling your own work done | Only the council passes a design; run it and report each verdict |
| Design words to a non-designer | Their words, 3 questions max, rendered screens, plain hand-over |

## Reference map

| File | Open at step |
|---|---|
| `references/persona.md` | 2 |
| `references/taste-signature.md` | 3, 6, 9 |
| `references/principle-selector.md` | 4 |
| `references/ux-laws.md`, `gestalt-perception.md`, `psychology-persuasion.md`, `heuristics-frameworks.md` | 4, and 9 for checks |
| `references/flows-patterns.md` | 5 |
| `references/mediums.md` | 7 |
| `references/ui-craft.md` | 8 |
| `references/council.md` | 9 |
| `references/critique.md` | 9, and for critique requests |
