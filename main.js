import loader from "./modules/loader.js";
import themes from "./modules/themes.js";
import menu from "./modules/menu.js";
import menuAnimation from "./modules/menuAnimation.js";
import heroTitleAnimation from "./modules/heroTitleAnimation.js";
import mainTitleAnimation from "./modules/mainTitleAnimation.js";
import heroSectionScroll from "./modules/heroSectionScroll.js";
import aboutSectionScroll from "./modules/aboutSectionScroll.js";
import projectsSectionScroll from "./modules/projectsSectionScroll.js";
import smoothScrolling from "./modules/smoothScrolling.js";

import particles from "./modules/particles.js";
// import initVariableWidthText from "./modules/variableWidthText.js";
// import { applyDragability } from "./scripts/draggable.js";
// import threeEffects from "./scripts/threeEffects.js";

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

// mainTitleAnimation.run();

// smoothScrolling.setup();

// themes.setup();
// menu.setup();
// menuAnimation.setup();
heroTitleAnimation.prepare();
loader.setup(() => heroTitleAnimation.animate());
heroSectionScroll.setup();
// projectsSectionScroll.setup();
// aboutSectionScroll.setup();
// ScrollTrigger.refresh();
// window.addEventListener("load", () => ScrollTrigger.refresh());