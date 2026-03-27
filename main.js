import particles from "./modules/particles.js";
import initVariableWidthText from "./modules/variableWidthText.js";
import mainTitleAnimation from "./modules/mainTitleAnimation.js";

import { applyDragability } from "./scripts/draggable.js";

const box = document.getElementById('box');
applyDragability(box);

particles.render();
initVariableWidthText();
mainTitleAnimation.run();