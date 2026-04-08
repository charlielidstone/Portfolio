import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectsSectionScroll = {
  setup: function() {
    const tl = gsap.timeline();

    tl.from("#p1", { rotate: "3deg" }).to("#p1", { translateY: -500, zIndex: 1, rotate: "-1deg" })
    .from("#p2", { rotate: "-4deg" }).to("#p2", { translateY: -500, zIndex: 2, rotate: "1deg" })
    .from("#p3", { rotate: "2deg" }).to("#p3", { translateY: -500, zIndex: 3, rotate: "-2deg" })

    ScrollTrigger.create({
        animation: tl,
        trigger: ".projects-container",
        start: "top 80%",
        end: "+=2000",
        scrub: true,
        pin: true,

    })
    
  },
};

export default projectsSectionScroll;