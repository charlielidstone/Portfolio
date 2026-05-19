import { gsap } from "gsap";

const h1Selector    = ".hero-section-content h1";
const fadeUpInitial = { y: 16, opacity: 0 };

const heroTitleAnimation = {
  // Call immediately on page load — splits the DOM and pins everything to its
  // hidden starting position so nothing is visible under the loader.
  prepare() {
    const h1 = document.querySelector(h1Selector);
    if (!h1) return;

    h1.innerHTML = h1.textContent
      .split(" ")
      .map((word) => {
        const chars = word
          .split("")
          .map((char) => `<span class="char-wrap"><span class="char">${char}</span></span>`)
          .join("");
        return `<span class="word">${chars}</span>`;
      })
      .join(" ");

    // Set every animated element to its start state immediately.
    gsap.set(h1.querySelectorAll(".char"), { y: "110%" });
    gsap.set(["#hi-there", ".hero-section-content h2:not(#hi-there)", ".hero-links", ".hero-location"], fadeUpInitial);
  },

  // Call after the loader exits — runs the actual animation from the already-hidden state.
  animate() {
    const h1 = document.querySelector(h1Selector);
    if (!h1) return;

    const fadeUp = { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" };
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".hero-section-background-image", { scale: 1, duration: 1.5 }, 0);
    tl.to("#hi-there", { ...fadeUp, duration: 0.5 }, 0);
    tl.to(h1.querySelectorAll(".char"), { y: "0%", duration: 0.7, stagger: 0.04 }, 0.1);
    tl.to(".hero-section-content h2:not(#hi-there)", fadeUp, 0.45);
    tl.to(".hero-links",   fadeUp, 0.6);
    tl.to(".hero-location", fadeUp, 0.75);
  },
};

export default heroTitleAnimation;
