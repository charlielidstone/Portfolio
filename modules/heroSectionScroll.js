// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

const heroSectionScroll = {
  setup: function() {
    const holeCenterX = 72;
    const holeCenterY = 0;

    const placeHoleInViewportCenter = () => {
      gsap.set("#fhole-path", {
        x: window.innerWidth / 2 - holeCenterX,
        y: window.innerHeight / 2 - 102,
        svgOrigin: `${holeCenterX} ${holeCenterY}`,
      });
    };

    placeHoleInViewportCenter();
    window.addEventListener("resize", placeHoleInViewportCenter);

    gsap.to("#fhole-path", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: ".about-section",
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 + progress*9;
          const rotation = 45 * progress;
          gsap.set("#fhole-path", {
            scale,
            rotation,
          });
        }
      }
    });
    
    gsap.to(".hero-section-foreground-image", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // pin: true,
      }
    });
  },
};

export default heroSectionScroll;