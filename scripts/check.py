# Checks the release metadata is consistent. Run: python3 scripts/check.py
import json, pathlib, re, sys

root = pathlib.Path(__file__).resolve().parent.parent
skill = json.loads((root / "skill.json").read_text())
plugin = json.loads((root / ".claude-plugin/plugin.json").read_text())
market = json.loads((root / ".claude-plugin/marketplace.json").read_text())
md = (root / skill["entry"]).read_text()
front = re.match(r"---\n(.*?)\n---\n", md, re.S)
errors = []

versions = {skill["version"], plugin["version"], market["metadata"]["version"], market["plugins"][0]["version"]}
if len(versions) != 1:
    errors.append(f"versions differ: {sorted(versions)}")
if f"## {skill['version']} " not in (root / "CHANGELOG.md").read_text():
    errors.append(f"CHANGELOG.md has no entry for {skill['version']}")
if not front:
    errors.append("SKILL.md has no frontmatter")
else:
    if not re.search(rf"^name: {re.escape(skill['name'])}$", front.group(1), re.M):
        errors.append("SKILL.md name does not match skill.json")
    if len(front.group(1)) > 1024:
        errors.append(f"SKILL.md frontmatter is {len(front.group(1))} chars (max 1024)")
for ref in re.findall(r"`references/([\w-]+\.md)`", md):
    if not (root / pathlib.Path(skill["entry"]).parent / "references" / ref).exists():
        errors.append(f"SKILL.md links missing references/{ref}")

print("\n".join(errors) or "ok")
sys.exit(1 if errors else 0)
