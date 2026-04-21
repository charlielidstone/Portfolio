// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

const heroSectionScroll = {
  setup: function() {
    gsap.to("#fhole-path", {
      transform: "translate(calc(50vw - 72px), calc(50vh - 102px)) scale(2) rotate(45deg)",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: ".about-section",
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + progress; // Scale from 1 to 2
          const rotation = 45 * progress; // Rotate from 0 to 45 degrees
          gsap.set("#fhole-path", {
            transform: `translate(calc(50vw - 72px), calc(50vh - 102px)) scale(${scale}) rotate(${rotation}deg)`,
          });
      },
    });
  },
};

export default heroSectionScroll;