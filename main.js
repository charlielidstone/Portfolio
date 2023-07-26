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

const mainTitle = document.getElementById("main__title");
const fonts = [
  'VT323',
  'Lisu Bosa', 
  'Caveat', 
  'Chokokutai', 
  'Handjet',
  'Lugrasimo',
  'Lumanosimo',
  'Permanent Marker',
  'Rowdies',
  'Zeyada',
  'Big Shoulders Inline Text',
  'Press Start 2P',
  'Kablammo',
  'Moirai One',
  'Monoton',
  'Courier Prime',
  'Rye',
  'Grenze Gotisch',
  'UnifrakturCook',
];

applyFontSwapAnim(mainTitle, fonts, "Handjet, monospace", 4500, 300);

gsap.from("section h1", {
  opacity: 0,
  x: -100,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "section",
    start: "bottom bottom",
    end: "bottom center",
    scrub: 1,
    pin: true,
    toggleActions: "restart pause resume pause"
  }
})