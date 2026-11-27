#!/bin/sh
# Runs audit.js on an HTML mockup in headless Chrome and prints the JSON result.
# Usage: sh audit.sh <mockup.html>    (set CHROME to the browser binary if it is not found)
set -e
[ -f "$1" ] || { echo "usage: sh audit.sh <mockup.html>" >&2; exit 2; }
here=$(cd "$(dirname "$0")" && pwd)
file=$(cd "$(dirname "$1")" && pwd)/$(basename "$1")
copy="${file%.html}.audit-tmp.html"   # next to the original so relative assets still load
trap 'rm -f "$copy"' EXIT
sed "s#</body>#<script src=\"file://$here/audit.js\"></script></body>#" "$file" > "$copy"
chrome=${CHROME:-}
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" google-chrome chromium chromium-browser; do
  [ -n "$chrome" ] && break
  { [ -x "$c" ] || command -v "$c" >/dev/null 2>&1; } && chrome=$c
done
[ -n "$chrome" ] || { echo "no Chrome found; set CHROME=/path/to/chrome" >&2; exit 2; }
"$chrome" --headless --disable-gpu --dump-dom "file://$copy" 2>/dev/null | sed -n 's/.*<pre id="ux-audit">\(.*\)<\/pre>.*/\1/p'
