import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


const gsapEffects = {
  setup: function() {

    gsap.to("#main__title", {
      filter: "blur(7px)",
      scale: 0.9,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "header",
        start: "bottom bottom",
        end: "bottom top",
        scrub: 1,
        toggleActions: "restart pause resume pause"
      },
    });

    const sectionH1s = document.querySelectorAll('section h1');
    const sections = document.querySelectorAll('section');
    sectionH1s.forEach((sectionH1, index) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sections[index],
          start: "center center",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      timeline
        .to(sectionH1, { x: 0, duration: 1 })
        .to(sectionH1, { x: 0, duration: 1, delay: 2 });

    });


  }
};

export default gsapEffects;