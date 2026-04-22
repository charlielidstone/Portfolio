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
    const maxScaleIncrease = 5;
    let currentProgress = 0;

    const getViewportScale = () => {
      const widthScale = window.innerWidth / 1440;
      const heightScale = window.innerHeight / 900;
      return Math.max(0.75, Math.min(widthScale, heightScale));
    };

    const buildClipPath = (progress = 0) => { // TODO: go through this
      const viewportScale = getViewportScale();
      const verticalPhase = Math.min(progress * 2, 1);
      const horizontalPhase = Math.max((progress - 0.5) * 2, 0);
      const xScale = viewportScale * (1 + horizontalPhase * maxScaleIncrease);
      const yScale = viewportScale * (1 + verticalPhase * maxScaleIncrease);
      const centerX = window.innerWidth / 2 + baseHoleOffsetX;
      const centerY = window.innerHeight / 2 + baseHoleOffsetY;

      const startX = centerX - 122 * xScale;
      const startY = centerY - 70 * yScale;
      const topRightX = centerX + 72 * xScale;
      const bottomRightX = centerX + 122 * xScale;
      const bottomY = centerY + 100 * yScale;
      const bottomLeftX = centerX - 72 * xScale;

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
    window.addEventListener("resize", () => applyClipPath(currentProgress));

    gsap.to("#fhole-path", {
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: ".about-section",
        onUpdate: (self) => {
          currentProgress = self.progress;
          applyClipPath(currentProgress);
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