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

let rollingText = () => {
  const rollingText = document.getElementById('rolling-text');
  const rollingTextCharacters = rollingText.innerText.split('');
  rollingText.innerHTML = '';
  rollingTextCharacters.forEach((character, index) => {
    if (character === ' ') character = '&nbsp;';
    const characterElement = document.createElement('span');
    characterElement.classList.add('rolling-text-char');
    characterElement.innerHTML = character;
    rollingText.appendChild(characterElement);

    gsap.from(characterElement, {
      opacity: 0,
      transform: "translate3d(0px, 0px, -200px) rotateX(90deg)",
      duration: 5,
      ease: "power2.inOut",
      delay: index * 0.02,
      scrollTrigger: {
        trigger: rollingText,
        start: "center 90%",
        end: "center center",
        scrub: 1,
        toggleActions: "restart none none reverse"
      },
    });
  });

}


const gsapEffects = {
  setup: function() {

    mainTitle();
    signature();
    rollingText();

  }
};

export default gsapEffects;