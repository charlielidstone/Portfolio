import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const heroSectionScroll = {
  setup: function() {
    gsap.to(".hero-section", {
      scale: 0.95,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom -5%",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });
  },
};

export default heroSectionScroll;