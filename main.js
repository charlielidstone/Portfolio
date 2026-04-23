import particles from "./modules/particles.js";
import initVariableWidthText from "./modules/variableWidthText.js";
import mainTitleAnimation from "./modules/mainTitleAnimation.js";
import heroSectionScroll from "./modules/heroSectionScroll.js";
import projectsSectionScroll from "./modules/projectsSectionScroll.js";
import { applyDragability } from "./scripts/draggable.js";
// import threeEffects from "./scripts/threeEffects.js";
import smoothScrolling from "./modules/smoothScrolling.js";

import { gsap } from "gsap";

import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";


// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollSmoother);

// const box = document.getElementById('box');
// applyDragability(box);

// particles.render();
// threeEffects.animate();

// initVariableWidthText();

mainTitleAnimation.run();

smoothScrolling.setup();
heroSectionScroll.setup();
projectsSectionScroll.setup();

window.addEventListener("load", () => ScrollTrigger.refresh());