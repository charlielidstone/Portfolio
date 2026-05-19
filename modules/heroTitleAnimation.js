import { gsap } from "gsap";

const heroTitleAnimation = {
  setup() {
    const h1 = document.querySelector(".hero-section-content h1");
    if (!h1) return;

    // Group chars by word so the browser only breaks between words, not letters
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

    const fadeUp = { y: 16, opacity: 0, duration: 0.6, ease: "power3.out" };

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // "Hi there, I'm"
    tl.from("#hi-there", { ...fadeUp, duration: 0.5 }, 0);

    // Name — letter by letter, left to right
    tl.from(h1.querySelectorAll(".char"), {
      y: "110%",
      duration: 0.7,
      stagger: 0.04,
    }, 0.1);

    // Subtitle
    tl.from(".hero-section-content h2:not(#hi-there)", fadeUp, 0.45);

    // Links row
    tl.from(".hero-links", fadeUp, 0.6);

    // Location
    tl.from(".hero-location", fadeUp, 0.75);
  },
};

export default heroTitleAnimation;
