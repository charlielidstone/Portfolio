import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectsSectionScroll = {
  setup: function() {
    const tl = gsap.timeline();

    tl.from("#p1", { rotate: "3deg" }).to("#p1", { translate: "800px 200px", rotate: "10deg" })
    .from("#p2", { rotate: "-4deg" }).to("#p2", { translateX: "-800px 200px", rotate: "-7deg" })
    .from("#p3", { rotate: "2deg" }).to("#p3", { translateX: "1000px", rotate: "-2deg" })

    ScrollTrigger.create({
        animation: tl,
        trigger: ".projects-container",
        start: "top 30%",
        end: "+=2000",
        scrub: true,
        pin: ".projects-section",
    })
    
  },
};

export default projectsSectionScroll;