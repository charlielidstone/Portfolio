import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const SVG_BASE = '/charlielidstone-vectors/';

// Ordered mapping for each character in "Charlie Lidstone" (space excluded —
// it lives as a text node between the two .hero-h1-word spans, not a char span).
// serifOffset (optional) nudges the morphed glyph in screen pixels without
// affecting the default Anton position. Both x and y default to 0.
const CHAR_MAP = [
  // ── Charlie ───────────────────────────────────────────
  { anton: 'C.svg',   serif: 'C-1.svg',  serifOffset: { x: -15, y: 11 } },  // C
  { anton: 'H.svg',   serif: 'H-1.svg',  serifOffset: { x: -25, y: 12 } },  // h → H
  { anton: 'A.svg',   serif: 'A-1.svg',  serifOffset: { x: -14, y: 11 } },  // a → A
  { anton: 'R.svg',   serif: 'R-1.svg',  serifOffset: { x: -15, y: 12 } },  // r → R
  { anton: 'L.svg',   serif: 'L-2.svg',  serifOffset: { x: -15, y: 12 } },  // l → L
  { anton: 'I.svg',   serif: 'i-1.svg',  serifOffset: { x: -14, y: 12 } },  // i → I
  { anton: 'E.svg',   serif: 'E-2.svg',  serifOffset: { x: -14, y: 12 } },  // e → E
  // ── Lidstone ──────────────────────────────────────────
  { anton: 'L-1.svg', serif: 'L-3.svg',  serifOffset: { x: -13, y: 12 } },  // L
  { anton: 'I.svg',   serif: 'i-1.svg',  serifOffset: { x: -12, y: 12 } },  // i → I
  { anton: 'd.svg',   serif: 'd-1.svg',  serifOffset: { x: -18, y: 12 } },  // d → D
  { anton: 's.svg',   serif: 's-1.svg',  serifOffset: { x:  -6, y: 11 } },  // s → S
  { anton: 't.svg',   serif: 't-1.svg',  serifOffset: { x: -15, y: 12 } },  // t → T
  { anton: 'o.svg',   serif: 'o-1.svg',  serifOffset: { x: -18, y: 11 } },  // o → O
  { anton: 'n.svg',   serif: 'n-1.svg',  serifOffset: { x: -21, y: 11 } },  // n → N
  { anton: 'E-1.svg', serif: 'E-3.svg',  serifOffset: { x: -13, y: 12 } },  // e → E
];

async function fetchSVGData(filename) {
  const url = `${SVG_BASE}${filename}`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  const text = await res.text();
  const doc  = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svg  = doc.querySelector('svg');
  const path = doc.querySelector('path');
  if (!svg || !path) throw new Error(`No <svg> or <path> found in ${url}`);
  return {
    viewBox: svg.getAttribute('viewBox'),
    d: path.getAttribute('d'),   // includes all sub-paths (compound letters like D, O, A, R)
  };
}

const heroH1Morph = {
  setup: async function () {
    try {
    const heroH1 = document.querySelector('.hero-section-content h1');
    if (!heroH1) return;

    // Hide during setup to prevent a text→SVG flash
    heroH1.style.opacity = '0';
    heroH1.style.filter = 'blur(2px)';
    heroH1.style.transform = 'translateY(10px)';

    // ── 1. Build word / char span structure (text content for measurement) ──
    const words = heroH1.textContent.trim().split(' ');
    heroH1.innerHTML = words
      .map(word =>
        `<span class="hero-h1-word">${
          word.split('').map(char => `<span class="hero-h1-char">${char}</span>`).join('')
        }</span>`
      )
      .join(' ');

    // ── 2. Wait for Anton to fully render, snapshot each glyph's size in em ──
    // Storing in em (not px) means spans scale correctly when the viewport
    // changes the h1's font-size, keeping every glyph in proportion.
    await document.fonts.ready;
    await new Promise(resolve => requestAnimationFrame(resolve));

    const baseFontSize = parseFloat(getComputedStyle(heroH1).fontSize);
    const charSpans = [...heroH1.querySelectorAll('.hero-h1-char')];
    const sizes = charSpans.map(span => {
      const { width, height } = span.getBoundingClientRect();
      return { widthEm: width / baseFontSize, heightEm: height / baseFontSize };
    });

    // ── 3. Fetch all SVG files (deduplicated) ──
    const uniqueFiles = [...new Set(CHAR_MAP.flatMap(e => [e.anton, e.serif]))];
    const svgCache = Object.fromEntries(
      await Promise.all(uniqueFiles.map(async name => [name, await fetchSVGData(name)]))
    );

    // ── 4. Replace each text span with an inline SVG ──
    // The Anton path is the visible one; the hidden Serif path is the morph target.
    // viewBox is locked to Anton's coordinate space; overflow="visible" lets the
    // (potentially wider/shorter) Serif glyph render outside without layout shift.
    charSpans.forEach((span, i) => {
      const { widthEm, heightEm } = sizes[i];
      span.style.width  = `${widthEm}em`;
      span.style.height = `${heightEm}em`;

      const { anton: antonFile, serif: serifFile } = CHAR_MAP[i];
      const { viewBox, d: antonD } = svgCache[antonFile];
      const { d: serifD }          = svgCache[serifFile];

      span.innerHTML = `
        <svg viewBox="${viewBox}" overflow="visible"
             style="width:100%;height:97%;display:block;">
          <path d="${antonD}" fill="currentColor"/>
          <path d="${serifD}" fill="currentColor" style="display:none;"/>
        </svg>`;
    });

    // Fade in once SVGs are in place
    gsap.to(heroH1, { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0) scale(1)', duration: 0.4, ease: 'power1.out' });

    // ── 5. Set up per-letter hover animations + priority logic ──
    // Two separate gsap.to() calls per letter so forward and reverse can have
    // independent easing. overwrite:'auto' handles mid-animation interruptions.
    let currentHovered = null;
    const actions = new Map();

    charSpans.forEach((span, i) => {
      const [antonPath, serifPath] = span.querySelectorAll('path');
      if (!antonPath || !serifPath) return;

      // Snapshot the Anton d string now so the reverse always has a fixed target.
      const antonD = antonPath.getAttribute('d');
      // Convert serifOffset from px (measured at baseFontSize) to em fractions so
      // the nudge scales correctly when the viewport changes the h1's font-size.
      const { x: ox_px = 0, y: oy_px = 0 } = CHAR_MAP[i].serifOffset ?? {};
      const ox_em = ox_px / baseFontSize;
      const oy_em = oy_px / baseFontSize;

      const playForward = () => {
        const fs = parseFloat(getComputedStyle(heroH1).fontSize);
        return gsap.to(antonPath, {
          morphSVG: serifPath,
          x: ox_em * fs,
          y: oy_em * fs,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto',
        });
      };

      const playReverse = () => gsap.to(antonPath, {
        morphSVG: antonD,
        x: 0,
        y: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });

      actions.set(span, { playForward, playReverse });

      span.addEventListener('mouseenter', e => {
        // Inactive (Anton) span beats the currently morphed (Serif) span when
        // both appear under the cursor — preserves the priority we set up before.
        const stack = document.elementsFromPoint(e.clientX, e.clientY)
          .filter(el => el.classList.contains('hero-h1-char'));
        const winner = stack.find(el => el !== currentHovered) ?? span;
        if (winner === currentHovered) return;

        if (currentHovered) {
          actions.get(currentHovered)?.playReverse();
          currentHovered.classList.remove('hovered');
        }
        actions.get(winner)?.playForward();
        winner.classList.add('hovered');
        currentHovered = winner;
      });
    });

    heroH1.addEventListener('mouseleave', () => {
      if (currentHovered) {
        actions.get(currentHovered)?.playReverse();
        currentHovered.classList.remove('hovered');
        currentHovered = null;
      }
    });
    } catch (err) {
      console.error('[heroH1Morph] setup failed:', err);
    }
  },
};

export default heroH1Morph;
