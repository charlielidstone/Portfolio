import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

const projectsSectionScroll = {
  setup: function() {
    const tl = gsap.timeline();

    tl.from("#p1", { rotate: "0deg" }).to("#p1", { translate: "40vw 10vw", rotate: "10deg" })
    .from("#p2", { rotate: "-4deg" }).to("#p2", { translate: "-40vw 0", rotate: "-7deg" })
    .from("#p3", { rotate: "2deg" }).to("#p3", { translate: "40vw -5vw", rotate: "-2deg" })
    .to("#p4", { zIndex: 4 }).to("#p4", { scale: 4 })

    ScrollTrigger.create({
        animation: tl,
        trigger: ".projects-container",
        start: "top 30%",
        end: "+=2000",
        scrub: true,
        pin: ".projects-section",
    });
  },
};

export default projectsSectionScroll;