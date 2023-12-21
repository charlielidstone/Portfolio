let mainTitle = () => {
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

let signature = () => {
  const signaturePath = document.getElementById('signature-path');
  const signatureLength = Math.ceil(signaturePath.getTotalLength());
  signaturePath.style.strokeDasharray = signatureLength;
  const signatureContainer = document.getElementById('signature-container');
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: signatureContainer,
      start: "center center",
      end: "bottom -100%",
      scrub: 0.5,
      pin: true,
      pinSpacing: true,
    },
  });

  timeline
    .from(signaturePath, { strokeDashoffset: signatureLength, duration: 2 })
    .to(signatureContainer, { opacity: 0, filter: "blur(7px)", translateY: "-100px", duration: 1})

}

let helloWorld = () => {
  const helloWorld = document.getElementById('hello-world');
    
  gsap.to(helloWorld, {
    scale: 0.9,
    opacity: 0,

    scrollTrigger: {
      trigger: helloWorld,
      start: "center center",
      end: "bottom top",
      pin: true,
      scrub: true,
      toggleActions: "restart none none reverse",
    },
  });
}

let worksSection = () => {
  const worksSection = document.getElementById('works__section');

  gsap.to(worksSection, {
    scale: 0.8,
    borderRadius: "50px",
    y: "30px",

    scrollTrigger: {
      trigger: worksSection,
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      toggleActions: "restart none none reverse",
      markers: true,
    },
  });
}


const gsapEffects = {
  setup: function() {

    mainTitle();
    signature();
    helloWorld();
    worksSection();

  }
};

export default gsapEffects;