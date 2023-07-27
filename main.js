import './style.css';
import { gsap } from "gsap";

import { applyFontSwapAnim } from "./scripts/Animations.js";

gsap.registerPlugin(ScrollTrigger);

gsap.to("#main__title", {
  filter: "blur(7px)",
  scale: 0.9,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "header",
    start: "bottom bottom",
    end: "bottom top",
    scrub: 1,
    toggleActions: "restart pause resume pause"
  }
});

gsap.from("#main__title", {
  scale: 0.9,
  duration: 5,
  ease: "linear",
});

const mainTitle = document.getElementById("main__title");
const fonts = [
  'VT323',
  'Lisu Bosa', 
  'Lugrasimo',
  'Rowdies',
  'Press Start 2P',
  'Kablammo',
  'Rye',
  'Grenze Gotisch',
  'UnifrakturCook',
];

applyFontSwapAnim(mainTitle, fonts, "Handjet, monospace", 4500, 300);

// gsap.from("section h1", {
//   opacity: 0,
//   x: -100,
//   duration: 1,
//   ease: "power2.out",
//   scrollTrigger: {
//     trigger: "section",
//     start: "bottom bottom",
//     end: "bottom center",
//     scrub: 1,
//     pin: true,
//     toggleActions: "restart pause resume pause"
//   }
// })

const fontNames = document.querySelectorAll('.font-name');
fontNames.forEach((fontName) => {
  gsap.from(fontName, {
    opacity: 0,
    filter: "blur(7px)",
    x: -100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: fontName,
      start: "bottom bottom",
      end: "bottom center",
      scrub: 1,
      toggleActions: "restart pause resume pause"
    },
  });
});