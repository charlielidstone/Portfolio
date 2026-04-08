import particles from "./modules/particles.js";
import initVariableWidthText from "./modules/variableWidthText.js";
import mainTitleAnimation from "./modules/mainTitleAnimation.js";
import heroSectionScroll from "./modules/heroSectionScroll.js";
import projectsSectionScroll from "./modules/projectsSectionScroll.js";
import { applyDragability } from "./scripts/draggable.js";
// import threeEffects from "./scripts/threeEffects.js";
import SmoothScrolling from "./modules/smoothScrolling.js";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// const box = document.getElementById('box');
// applyDragability(box);

// particles.render();
// threeEffects.animate();

// initVariableWidthText();

mainTitleAnimation.run();

heroSectionScroll.setup();
projectsSectionScroll.setup();

SmoothScrolling.setup();