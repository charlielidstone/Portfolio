import particles from "./modules/particles.js";
import initVariableWidthText from "./modules/variableWidthText.js";
import mainTitleAnimation from "./modules/mainTitleAnimation.js";
import heroSectionScroll from "./modules/heroSectionScroll.js";
import { applyDragability } from "./scripts/draggable.js";

// const box = document.getElementById('box');
// applyDragability(box);

// particles.render();

// initVariableWidthText();

mainTitleAnimation.run();

heroSectionScroll.setup();