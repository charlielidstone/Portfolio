const gsapEffects = {
  setup: function() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "header",
        start: "center bottom",
        end: "center top",
        scrub: 0.5,
        pin: true,
        toggleActions: "restart pause resume pause",
        markers: true,
      }
    });

    // Border radius animates first, quickly
    tl.to("#img-window", {
      borderRadius: 0,
      duration: 2, // short and finishes early
      ease: "power2.out"
    });

    // Width and height animate over a longer time
    tl.to("#img-window", {
      width: "100vw",
      height: "100vh",
      duration: 2,
      ease: "power2.inOut"
    }, "<"); // "<" means start at the same time as previous, but longer duration
    
    
    // gsap.to("#main__title", {
    //   scale: 2.8,
    //   color: 'black',
    //   top: "-200px",
    //   scrollTrigger: {
    //     trigger: "header",
    //     start: "center center",
    //     end: "bottom top",
    //     scrub: 1,
    //     pin: true,
    //     toggleActions: "restart pause resume pause"
    //   },
    // });
    
    // const sectionH1s = document.querySelectorAll('section h1');
    // const sections = document.querySelectorAll('section');
    // sectionH1s.forEach((sectionH1, index) => {
    //   const timeline = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: sections[index],
    //       start: "center center",
    //       end: "bottom top",
    //       scrub: true,
    //       pin: true,
    //     },
    //   });

    //   timeline
    //     .to(sectionH1, { x: 0, duration: 1 })
    //     .to(sectionH1, { x: 0, duration: 1, delay: 2 });
    // });

    // const signaturePath = document.getElementById('signature-path');
    // const signatureLength = Math.ceil(signaturePath.getTotalLength());
    // signaturePath.style.strokeDasharray = signatureLength;
    // const signatureContainer = document.getElementById('signature-container');
    // const timeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: signatureContainer,
    //     start: "center center",
    //     end: "bottom -200%",
    //     scrub: 3,
    //     pin: true,
    //     pinSpacing: true,
    //   },
    // });

    // timeline
    //   .from(signaturePath, { strokeDashoffset: signatureLength, duration: 2 })
    //   .to(signatureContainer, { opacity: 0, filter: "blur(7px)", translateY: "-100px", duration: 1})

    // const helloWorld = document.getElementById('hello-world');
    // const worksSection = document.getElementById('works__section');

    // gsap.to(helloWorld, {
    //   scale: 0.8,
    //   scrollTrigger: {
    //     trigger: worksSection,
    //     start: "top bottom",
    //     end: "bottom top",
    //     pin: helloWorld,
    //     scrub: true,
    //     toggleActions: "restart none none reverse",
    //   },
    // });


    // gsap.to(worksSection, {
    //   scale: 0.65,
    //   borderRadius: "100px",
    //   y: "10px",

    //   scrollTrigger: {
    //     trigger: worksSection,
    //     start: "top top",
    //     end: "bottom top",
    //     scrub: true,
    //     pin: true,
    //     toggleActions: "restart none none reverse",
    //   },
    // });

    // const projectCovers = document.querySelectorAll('.project__cover');
    // projectCovers.forEach((projectCover, index) => {
    //   gsap.to(projectCover, {
    //     scale: 0.7,
    //     y: index * -20,
    //     scrollTrigger: {
    //       trigger: projectCover,
    //       start: `center ${50 + index*10}%`,
    //       end: "bottom top",
    //       scrub: true,
    //       pin: true,
    //       toggleActions: "restart none none reverse",
    //     },
    //   });
    // });

  },
};

export default gsapEffects;