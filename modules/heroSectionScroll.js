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
      skewY: 100,
      skewAngleX() {
        let ratio = (this.height/this.skewX == Infinity) ? 0 : this.height/this.skewX;
        return Math.atan(ratio);
      },
      skewAngleY() {
        let ratio = (this.width/this.skewY == Infinity) ? 0 : this.width/this.skewY;
        return Math.atan(ratio);
      },
      skewRatioX() {
        return this.height/this.skewX
      },
      skewRatioY() {
        return this.width/this.skewY
      }
    }

    console.log("skew angle x: " + initialHoleDim.skewAngleX());

    const maxScaleIncrease = 5;
    let currentProgress = 0;
    
    const buildClipPath = (progress = 0) => {
      
      const topLeftXInitial      = (window.innerWidth   / 2) + initialHoleDim.centreX - (initialHoleDim.width   / 2) + (initialHoleDim.skewX / 2);
      const topLeftYInitial      = (window.innerHeight  / 2) + initialHoleDim.centreY - (initialHoleDim.height  / 2) + (initialHoleDim.skewY / 2);
      const topRightXInitial     = (window.innerWidth   / 2) + initialHoleDim.centreX + (initialHoleDim.width   / 2) + (initialHoleDim.skewX / 2);
      const topRightYInitial     = (window.innerHeight  / 2) + initialHoleDim.centreY - (initialHoleDim.height  / 2) - (initialHoleDim.skewY / 2);
      const bottomLeftXInitial   = (window.innerWidth   / 2) + initialHoleDim.centreX - (initialHoleDim.width   / 2) - (initialHoleDim.skewX / 2);
      const bottomLeftYInitial   = (window.innerHeight  / 2) + initialHoleDim.centreY + (initialHoleDim.height  / 2) + (initialHoleDim.skewY / 2);
      const bottomRightXInitial  = (window.innerWidth   / 2) + initialHoleDim.centreX + (initialHoleDim.width   / 2) - (initialHoleDim.skewX / 2);
      const bottomRightYInitial  = (window.innerHeight  / 2) + initialHoleDim.centreY + (initialHoleDim.height  / 2) - (initialHoleDim.skewY / 2);

      // the formula here is initialPoint + newY/skewRatio
      const topLeftXFinal1     = topLeftXInitial + ((window.innerHeight / 2) + initialHoleDim.centreY - initialHoleDim.height/2) / initialHoleDim.skewRatioX();
      const topLeftYFinal1     = 0;
      const topRightXFinal1    = topRightXInitial + ((window.innerHeight / 2) + initialHoleDim.centreY - initialHoleDim.height/2) / initialHoleDim.skewRatioX();
      const topRightYFinal1    = 0;
      const bottomLeftXFinal1  = bottomLeftXInitial - (window.innerHeight - bottomLeftYInitial) / initialHoleDim.skewRatioX();
      const bottomLeftYFinal1  = window.innerHeight;
      const bottomRightXFinal1 = bottomRightXInitial - (window.innerHeight - bottomLeftYInitial) / initialHoleDim.skewRatioX();
      const bottomRightYFinal1 = window.innerHeight;

      const topLeftXFinal2     = 0;
      const topLeftYFinal2     = 0;
      const topRightXFinal2    = window.innerWidth;
      const topRightYFinal2    = 0;
      const bottomLeftXFinal2  = 0;
      const bottomLeftYFinal2  = window.innerHeight;
      const bottomRightXFinal2 = window.innerWidth;
      const bottomRightYFinal2 = window.innerHeight;

      let topLeftX, topLeftY, topRightX, topRightY, bottomLeftX, bottomLeftY, bottomRightX, bottomRightY;

      if (progress <= 0.5) {
        progress = progress*2;
        topLeftX      = progress*(topLeftXFinal1 - topLeftXInitial) + topLeftXInitial;    
        topLeftY      = progress*(topLeftYFinal1 - topLeftYInitial) + topLeftYInitial;    
        topRightX     = progress*(topRightXFinal1 - topRightXInitial) + topRightXInitial;   
        topRightY     = progress*(topRightYFinal1 - topRightYInitial) + topRightYInitial;   
        bottomLeftX   = progress*(bottomLeftXFinal1 - bottomLeftXInitial) + bottomLeftXInitial; 
        bottomLeftY   = progress*(bottomLeftYFinal1 - bottomLeftYInitial) + bottomLeftYInitial; 
        bottomRightX  = progress*(bottomRightXFinal1 - bottomRightXInitial) + bottomRightXInitial;
        bottomRightY  = progress*(bottomRightYFinal1 - bottomRightYInitial) + bottomRightYInitial;
      } else {
        progress = (progress-0.5)*2
        topLeftX      = progress*(topLeftXFinal2 - topLeftXFinal1) + topLeftXFinal1;    
        topLeftY      = progress*(topLeftYFinal2 - topLeftYFinal1) + topLeftYFinal1;    
        topRightX     = progress*(topRightXFinal2 - topRightXFinal1) + topRightXFinal1;   
        topRightY     = progress*(topRightYFinal2 - topRightYFinal1) + topRightYFinal1;   
        bottomLeftX   = progress*(bottomLeftXFinal2 - bottomLeftXFinal1) + bottomLeftXFinal1; 
        bottomLeftY   = progress*(bottomLeftYFinal2 - bottomLeftYFinal1) + bottomLeftYFinal1; 
        bottomRightX  = progress*(bottomRightXFinal2 - bottomRightXFinal1) + bottomRightXFinal1;
        bottomRightY  = progress*(bottomRightYFinal2 - bottomRightYFinal1) + bottomRightYFinal1;
      }


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