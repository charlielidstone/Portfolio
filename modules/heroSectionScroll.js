import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const heroSectionScroll = {
  setup: function() {
    const initialHoleDim = {
      centreX: 0,
      centreY: 150,
      width: 500,
      height: 250,
      skewX: 50,
      skewY: 0,
    }

    const maxScaleIncrease = 5;
    let currentProgress = 0;

    const buildClipPath = (progress = 0) => {

      const topLeftXInitial      = (window.innerWidth   / 2) + initialHoleDim.centreX - (initialHoleDim.width   / 2) + (initialHoleDim.skewX / 2);
      const topLeftYInitial      = (window.innerHeight  / 2) + initialHoleDim.centreY - (initialHoleDim.height  / 2) + (initialHoleDim.skewY / 2);
      const topRightXInitial     = (window.innerWidth   / 2) + initialHoleDim.centreX + (initialHoleDim.width   / 2) + (initialHoleDim.skewX / 2);
      const topRightYInitial     = (window.innerHeight  / 2) + initialHoleDim.centreY - (initialHoleDim.height  / 2) + (initialHoleDim.skewY / 2);
      const bottomLeftXInitial   = (window.innerWidth   / 2) + initialHoleDim.centreX - (initialHoleDim.width   / 2) - (initialHoleDim.skewX / 2);
      const bottomLeftYInitial   = (window.innerHeight  / 2) + initialHoleDim.centreY + (initialHoleDim.height  / 2) - (initialHoleDim.skewY / 2);
      const bottomRightXInitial  = (window.innerWidth   / 2) + initialHoleDim.centreX + (initialHoleDim.width   / 2) - (initialHoleDim.skewX / 2);
      const bottomRightYInitial  = (window.innerHeight  / 2) + initialHoleDim.centreY + (initialHoleDim.height  / 2) - (initialHoleDim.skewY / 2);

      const topLeftXFinal     = 0;
      const topLeftYFinal     = 0;
      const topRightXFinal    = window.innerWidth;
      const topRightYFinal    = 0;
      const bottomLeftXFinal  = 0;
      const bottomLeftYFinal  = window.innerHeight;
      const bottomRightXFinal = window.innerWidth;
      const bottomRightYFinal = window.innerHeight;

      const topLeftX      = progress*(topLeftXFinal - topLeftXInitial) + topLeftXInitial;    
      const topLeftY      = progress*(topLeftYFinal - topLeftYInitial) + topLeftYInitial;    
      const topRightX     = progress*(topRightXFinal - topRightXInitial) + topRightXInitial;   
      const topRightY     = progress*(topRightYFinal - topRightYInitial) + topRightYInitial;   
      const bottomLeftX   = progress*(bottomLeftXFinal - bottomLeftXInitial) + bottomLeftXInitial; 
      const bottomLeftY   = progress*(bottomLeftYFinal - bottomLeftYInitial) + bottomLeftYInitial; 
      const bottomRightX  = progress*(bottomRightXFinal - bottomRightXInitial) + bottomRightXInitial;
      const bottomRightY  = progress*(bottomRightYFinal - bottomRightYInitial) + bottomRightYInitial;

      return `M -9999,-9999 H 9999 V 9999 H -9999 Z M ${topLeftX} ${topLeftY} 
                                                    L ${topRightX} ${topRightY} 
                                                    L ${bottomRightX} ${bottomRightY} 
                                                    L ${bottomLeftX} ${bottomLeftY} Z`;
    }
    
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
      display: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  },
};

export default heroSectionScroll;