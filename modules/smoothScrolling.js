import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmoothScrolling = {
    setup: function() {
        if (window.innerWidth > 768) {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1,
                effects: true,  

            });
        }
    }
}

export default SmoothScrolling;