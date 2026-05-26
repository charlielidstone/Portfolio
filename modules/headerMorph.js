import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const headerMorph = {
  setup: function () {
    const fromPath = document.querySelector("#header-morph-from");
    const toPath = document.querySelector("#header-morph-to");

    if (!fromPath || !toPath) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(fromPath, {
      morphSVG: toPath,
      duration: 0.2,
      ease: "bounce.out",
    });

    // Swap in your own trigger here — hover, click, ScrollTrigger, etc.
    const svg = fromPath.closest("svg");
    svg.addEventListener("mouseenter", () => tl.play());
    svg.addEventListener("mouseleave", () => tl.reverse());
  },
};

export default headerMorph;
