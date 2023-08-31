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

let section3 = () => {
  const section3 = document.getElementById('section3');
  const section3H2 = document.querySelector('#section3 h2');
  gsap.to(section3H2, {
    scale: 9,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section3,
      start: "center center",
      end: "bottom top",
      scrub: 0.4,
      pin: true,
      pinSpacing: true,
    },
  });

}

let lorem = () => {
  const lorem = document.getElementById('lorem');
  const loremP = document.querySelector('#lorem p');
  const loremWords = loremP.innerText.split(' ');
  loremP.innerHTML = '';
  loremWords.forEach(word => {
    const span = document.createElement('span');
    console.log(word);
    span.innerText = word + ' ';
    loremP.appendChild(span);
  });
  const loremSpans = document.querySelectorAll('#lorem p span');
  loremSpans.forEach((span, index) => {
    const timeline = gsap.timeline({});

    timeline
      .from(span, { color: "transparent", duration: 1, scrollTrigger: { trigger: span, scrub: true, start: "center center", end: "center center", } })

  });

  
}


const gsapEffects = {
  setup: function() {

    mainTitle();
    signature();
    section3();
    lorem();

  }
};

export default gsapEffects;