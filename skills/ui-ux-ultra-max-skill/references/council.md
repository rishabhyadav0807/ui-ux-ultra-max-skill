# The review council

A design is done only when every council member passes it. The builder never grades its own work: each reviewer is a separate agent with fixed lenses, a fixed checklist, and no access to the builder's reasoning, so it judges what is on the screen, not what was intended.

The council is the most expensive part of a run, because every reviewer reads images. It is sized so each reviewer sees only what its checklist needs, and anything a script can measure is measured, not looked at.

## When it runs

| Run size | Council |
|---|---|
| Full run, redesign | Mechanical checks, then all three members, after step 9's self-critique |
| Light run (one screen, one fix) | Mechanical checks, then one reviewer holding the User and Craft checklists together |
| Critique only | No council; the critique is the output |

## Mechanical checks (a script, not an agent)

Contrast, tap-target size, overflow at 360px and buttons touching a container edge are computed by `scripts/audit.js`. Run it before the members, and again after every fix round. It costs no reviewer tokens.

- **HTML mockup:** mark each screen's root element with `data-screen="<screen / state>"`, then run `sh <skill folder>/scripts/audit.sh <mockup.html>`. Each screen is measured at 360px wide, so the headless window size does not matter.
- **Running app (web):** paste the contents of `scripts/audit.js` into the page (Claude in Chrome's JavaScript tool, or Playwright's `page.evaluate`) at 360px wide. It returns the same JSON.
- **Native app, Penpot or Figma:** the script cannot run. Compute contrast from the token hex values instead, and leave targets and overflow to the Craft and layout member.

The result lists `contrast`, `targets`, `overflow` and `edges` failures, each with the screen and element, plus `pass`. Fix every item before starting the members. `unknownBg` counts text on images or gradients, which the script cannot measure; the Craft and layout member checks those by eye. Put the final JSON summary in the packet so members do not re-check those items.

## Members

Each member gets the packet (below) with only its own screens and checklist. Each item is answered PASS or FAIL. A FAIL names the screen, the element, and a concrete fix. "Consider…" is not a finding.

1. **User and brief.** It reads the main flow as the persona would, in the persona's language and literacy, and checks the brief was delivered. Screens: the main flow's screens only (no state variants), plus the text inventory and structure.
   - Can the persona finish the main job on the first try? Write the taps.
   - Is every word one the persona uses? List each jargon word.
   - Is the answer to the persona's real question visible without scrolling or opening anything?
   - Is anything frightening, shaming or confusing to this persona?
   - Was everything the person asked for delivered, at the scope they asked for?
   - Is every shipped feature in the inventory kept, moved or dropped with a reason?
   - Are peers equal, with an order rule? Has each new or renamed destination passed its name check?
   - Is every assumption written down, and does no decision contradict something the person said?
2. **Craft and layout.** It judges the rendered screenshots. Screens: every main-flow screen, plus any screen the audit flagged with `unknownBg`.
   - Is there one focal point per screen, and does the screen read correctly in black and white?
   - Is there at most 2 short lines of text per block, with reasons shown as chips, meters, dots, charts or icons?
   - Do the type scale, spacing scale and radii follow the tokens, with no arbitrary values?
   - Is the design free of the generic tells in `taste-signature.md` (category-cliché colour, cards around everything, stock imagery)?
   - Is the signature moment visibly crafted, and everything else quiet?
   - Is colour never the only signal, does reduced motion work, and does dark mode work if it is in scope?
   - Text on images or gradients (`unknownBg`): is it clearly readable? If the audit could not run, also check targets, wrapping at 360px and buttons touching edges by eye.
3. **States and ethics.** Screens: the state variants (loading, empty, error, offline, progress, paid), plus every screen with a price, consent, data request or promise.
   - Does every key screen have loading, empty, error and offline states, plus any state a persona trait makes likely?
   - Are empty, offline and error states useful (saved content, an illustration, something to do, what is safe), never a lone line?
   - Do destinations that show progress have first visit, in progress, just finished, done for today and return visit?
   - Does every paid or limited feature have free, premium, quota used, buy more, payment failed and bought?
   - Is every pushed flow of each destination present, with its states?
   - Does each feature stay independent, with no invented coupling?
   - Are there no dark patterns: confirm-shaming, fake urgency, hidden costs, pre-ticked upsells or roach motels?
   - Are prices and limits stated before commitment, with "later" given equal weight?
   - Is there no fear framing (bad, danger, doom) where a calm word would do?
   - Is user data, privacy and consent handled visibly at the moment it matters?
   - Does every promise on screen (refunds, "always free", delivery times, cancel terms) come from the brief? An invented promise is a FAIL; mark it as an assumption for the person to confirm.

## The packet each member gets

- The brief, in the person's words.
- The persona card, feel statement and principles (steps 2–4).
- The audit summary (pass, or the items it could not measure).
- Paths to **only the screenshots its member section lists**, at 360px wide. The member opens them. Keep screenshots to the screen's own size (one screen per image, not a whole board), and use JPEG or a 2× scale at most. Also the HTML path, or the text spec if nothing can be rendered.
- For User and brief: the inventory and structure text from the output contract.
- Its own checklist from above.

Leave out the builder's rationale and its self-critique. A member handed the builder's conclusion tends to agree with it.

**Model.** Where the agent tool lets you pick a model, run Craft and layout and States and ethics on a faster, cheaper one (in Claude Code, `model: "sonnet"`); their checklists are concrete. Keep User and brief on the builder's model, because judging as the persona takes the most reasoning.

## The loop

1. Run the mechanical checks and fix what they find.
2. Start all members at once. Each returns `PASS` or `FAIL` plus a list of findings: `screen · element · problem · fix`.
3. If every member passes, go to step 5.
4. Otherwise the builder fixes every finding, re-renders only the changed screens, re-runs the audit, and sends **only the changed screens** to the members that failed. Stop after 2 fix rounds.
5. **Final check.** Re-run the audit on the final version. Then send every screen that changed after a member passed it to that member, if any; a member whose screens did not change keeps its PASS.
6. If anything still fails, hand over with an **Unresolved** list (member, finding, why it is not fixed). Never call the design passed when it is not.

**Conflicts between members** are settled by the order in SKILL.md: accessibility, then ethics, then persona, then convention, then taste. Record each ruling in the hand-over.

**If you cannot start agents** (you are already a subagent, or there is no agent tool), run the members yourself one after another. Use a fresh pass for each, with only its checklist and its screenshots, and write each verdict down before starting the next. Label it in the hand-over as `Council (self-run, sequential)`, so the caller knows it is weaker than separate agents and can re-run it with real ones.

## Prompt template for one member

```
You are the <member> on a design review council. Judge only what you see in the files; you have not seen the designer's reasoning.
Brief: <the person's words>
Persona, feel and principles: <steps 2–4>
Audit: <summary>; do not re-check contrast, targets or overflow it passed.
Screens: <paths to this member's screenshots>; HTML: <path>
Checklist: <this member's items>
Open every screenshot listed. For each checklist item answer PASS or FAIL. For each FAIL give: screen · element · problem · concrete fix.
Reply with findings only, no summary of what passed. End with one line: VERDICT: PASS or VERDICT: FAIL.
```

## Hand-over line

Add this to the output contract: `Council: audit <pass/fail>; <member → PASS/FAIL per round>; rounds: N; unresolved: <none, or the list>`.
