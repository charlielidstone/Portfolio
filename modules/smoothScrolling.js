import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (!ScrollSmoother) {
    throw new Error("ScrollSmoother is not loaded. Make sure the GSAP ScrollSmoother script is included before main.js.");
}

gsap.registerPlugin(ScrollSmoother);

const SmoothScrolling = {
    setup: function() {
        if (window.innerWidth > 768) {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.3,
                effects: true,
            });
        }
    }
}

export default SmoothScrolling;