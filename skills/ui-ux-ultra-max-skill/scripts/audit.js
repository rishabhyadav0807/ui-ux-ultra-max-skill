// Mechanical UI audit: text contrast, tap-target size, and overflow / edge-touching at 360px.
// Runs in the page. Prints JSON into <pre id="ux-audit"> and returns the same object.
// Screens: every element with [data-screen] is audited at 360px wide; without any, the whole body is.
// Usage: see references/council.md ("Mechanical checks").
(() => {
  const MIN_TARGET = 44, WIDTH = 360, MAX_ITEMS = 40;
  const out = { width: WIDTH, contrast: [], targets: [], overflow: [], edges: [], unknownBg: 0, checkedText: 0 };

  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const over = (top, under) => ({ r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1 });
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const visible = el => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0; };
  const name = el => { const t = (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40); return el.tagName.toLowerCase() + (el.id ? '#' + el.id : el.classList[0] ? '.' + el.classList[0] : '') + (t ? ` "${t}"` : ''); };
  const push = (list, item) => { if (list.length < MAX_ITEMS) list.push(item); };

  // Background behind an element, blended up the tree; null if an image or gradient is in the way.
  const bgOf = el => {
    const layers = [];
    for (let n = el; n; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundImage !== 'none') return null;
      const c = parse(s.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    return layers.reduceRight((under, top) => over(top, under), { r: 255, g: 255, b: 255, a: 1 });
  };
  const isContainer = n => { const s = getComputedStyle(n), c = parse(s.backgroundColor); return (c && c.a > 0) || s.backgroundImage !== 'none' || parseFloat(s.borderLeftWidth) > 0 || s.boxShadow !== 'none'; };

  let screens = [...document.querySelectorAll('[data-screen]')];
  if (!screens.length) screens = [document.body];
  screens.forEach(root => { root.style.width = WIDTH + 'px'; root.style.maxWidth = WIDTH + 'px'; root.style.minWidth = '0'; });

  screens.forEach(root => {
    const screen = root.dataset.screen || 'page', box = root.getBoundingClientRect();
    const flagged = new Set();
    root.querySelectorAll('*').forEach(el => {
      if (!visible(el)) return;
      const s = getComputedStyle(el), r = el.getBoundingClientRect();

      // Contrast: elements that hold their own text.
      if ([...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) {
        out.checkedText++;
        const bg = bgOf(el), fg = parse(s.color);
        if (!bg || !fg) out.unknownBg++;
        else {
          const size = parseFloat(s.fontSize), bold = +s.fontWeight >= 700;
          const need = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5, got = ratio(over(fg, bg), bg);
          if (got < need) push(out.contrast, { screen, el: name(el), fg: hex(over(fg, bg)), bg: hex(bg), ratio: +got.toFixed(2), need });
        }
      }

      // Targets: interactive elements, except links inside running text.
      if (el.matches('a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],[role=tab],[role=checkbox],[role=switch],[onclick],[tabindex]:not([tabindex="-1"])')) {
        const inline = s.display === 'inline' && [...el.parentElement.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
        if (!inline && Math.min(r.width, r.height) < MIN_TARGET) push(out.targets, { screen, el: name(el), w: Math.round(r.width), h: Math.round(r.height) });
        // Edge: an interactive element closer than 12px to the side of the container it sits in (ui-craft.md §3).
        for (let c = el.parentElement; c && root.contains(c); c = c.parentElement) {
          if (!isContainer(c)) continue;
          const cr = c.getBoundingClientRect(), gap = Math.min(r.left - cr.left, cr.right - r.right);
          if (gap < 12) push(out.edges, { screen, el: name(el), container: name(c).split(' ')[0], gap: Math.round(gap) });
          break;
        }
      }

      // Overflow: sticks out of the 360px screen. Report only the outermost offender.
      if ((r.right > box.right + 1 || r.left < box.left - 1) && !flagged.has(el.parentElement)) {
        push(out.overflow, { screen, el: name(el), by: Math.round(Math.max(r.right - box.right, box.left - r.left)) });
      }
      if (r.right > box.right + 1 || r.left < box.left - 1) flagged.add(el);
    });
  });

  out.pass = !out.contrast.length && !out.targets.length && !out.overflow.length && !out.edges.length;
  const pre = document.createElement('pre'); pre.id = 'ux-audit'; pre.textContent = JSON.stringify(out); document.body.append(pre);
  return out;
})();
