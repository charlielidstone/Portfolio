import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const heroSectionScroll = {
  setup: function() {
    const holeCenterX = 72;
    const holeCenterY = 0;
    const baseHoleOffsetX = 10;
    const baseHoleOffsetY = -50;

    const getViewportScale = () => {
      const widthScale = window.innerWidth / 1440;
      const heightScale = window.innerHeight / 900;
      return Math.max(0.75, Math.min(widthScale, heightScale));
    };

    const buildClipPath = (progress = 0) => {
      const viewportScale = getViewportScale();
      const holeScale = viewportScale * (1 + progress * 5);
      const centerX = window.innerWidth / 2 + baseHoleOffsetX;
      const centerY = window.innerHeight / 2 + baseHoleOffsetY;

      const startX = centerX - 122 * holeScale;
      const startY = centerY - 70 * holeScale;
      const topRightX = centerX + 72 * holeScale;
      const bottomRightX = centerX + 122 * holeScale;
      const bottomY = centerY + 100 * holeScale;
      const bottomLeftX = centerX - 72 * holeScale;

      return `M -9999,-9999 H 9999 V 9999 H -9999 Z M ${startX} ${startY} H ${topRightX} L ${bottomRightX} ${bottomY} H ${bottomLeftX} Z`;
    };

    const applyClipPath = (progress = 0) => {
      gsap.set("#fhole-path", {
        attr: {
          d: buildClipPath(progress),
        },
      });
    };

    applyClipPath();
    window.addEventListener("resize", () => applyClipPath());

    gsap.to("#fhole-path", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: ".about-section",
        onUpdate: (self) => {
          applyClipPath(self.progress);
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
        ease: CustomEase.create("custom", "M0,0 C1,0 1,0 1,1"),
      },
      // onComplete: () => {gsap.set(".hero-section-foreground-image", {display: "none"})},
    });
  },
};

export default heroSectionScroll;