# Contributing

Thanks for helping make AI-made design less generic.

## What makes a good change

- **Reasons over theory.** Each reference entry says *when* a principle applies and *what decision it drives*. Don't add a law without a "because → decision" example.
- **Persona first.** New guidance must depend on who the user is. Advice that is right for everyone usually belongs in a linter, not here.
- **Small and testable.** One idea per pull request. Show a prompt where Claude got it wrong before your change and right after it.
- **Plain English.** Short sentences, everyday words, no jargon without a one-line explanation.

## Layout

- `skills/ui-ux-ultra-max-skill/SKILL.md` holds the process, run sizes, output contract and rules. Keep it short; detail goes in `references/`.
- `references/*.md` are read on demand at a named step. If you add one, add it to the reference map in `SKILL.md` and to "What's inside" in the README.
- If you change the process in `SKILL.md`, update "How it works" in the README in the same pull request.

## Versions

Bump the version in `skill.json`, `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` together, and add a `CHANGELOG.md` entry. CI checks that they match: run `python3 scripts/check.py` locally before you push.

## Testing a change

1. Install your branch as a project skill: copy `skills/ui-ux-ultra-max-skill` into `.claude/skills/` of a scratch project.
2. Run one prompt from [examples/prompts.md](examples/prompts.md) for each run size you touched.
3. Paste the before and after (or a short summary of them) in the pull request.

By contributing you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md), and that your work is licensed under the [MIT License](LICENSE).
