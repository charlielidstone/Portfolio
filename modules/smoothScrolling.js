import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollSmoother = globalThis.ScrollSmoother;

if (!ScrollSmoother) {
    throw new Error("ScrollSmoother is not loaded. Make sure the GSAP ScrollSmoother script is included before main.js.");
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmoothScrolling = {
    setup: function() {
        if (window.innerWidth > 76800) {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 5,
                effects: true,
            });
        }
    }
}

export default SmoothScrolling;