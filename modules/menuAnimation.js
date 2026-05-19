import { gsap } from "gsap";

const menuAnimation = {
  setup() {
    const menu     = document.getElementById("menu");
    const openBtn  = document.getElementById("menu-open");
    const closeBtn = document.getElementById("menu-close");
    if (!menu || !openBtn || !closeBtn) return;

    const logo        = menu.querySelector(".menu-logo");
    const closeEl     = closeBtn;
    const mainLinks   = [...menu.querySelectorAll(".main-link")];
    const bottomMatter = menu.querySelector(".menu-bottom-matter");

    // Wrap each nav link in an overflow-hidden clip so it can slide up from below
    mainLinks.forEach((link) => {
      const clip = document.createElement("div");
      clip.className = "main-link-clip";
      link.parentNode.insertBefore(clip, link);
      clip.appendChild(link);
    });

    // Set initial hidden state for all animated content
    gsap.set([logo, closeEl, bottomMatter], { opacity: 0, y: 8 });
    gsap.set(mainLinks, { y: "110%" });

    const animateIn = () => {
      const tl = gsap.timeline();
      // top bar items
      tl.to([logo, closeEl], {
        opacity: 1, y: 0,
        duration: 0.4, stagger: 0.06,
        ease: "power2.out",
      }, 0.1);
      // nav links — slide up through the clip
      tl.to(mainLinks, {
        y: "0%",
        duration: 0.65, stagger: 0.09,
        ease: "power3.out",
      }, 0.1);
      // bottom bar
      tl.to(bottomMatter, {
        opacity: 1, y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 0.45);
    };

    const animateOut = () => {
      gsap.to([logo, closeEl, bottomMatter], {
        opacity: 0, y: 8,
        duration: 0.2, ease: "power2.in",
      });
      gsap.to(mainLinks, {
        y: "110%",
        duration: 0.3, stagger: { each: 0.05, from: "end" },
        ease: "power2.in",
      });
    };

    openBtn.addEventListener("click", animateIn);
    closeBtn.addEventListener("click", animateOut);
    mainLinks.forEach((link) => link.addEventListener("click", animateOut));
  },
};

export default menuAnimation;
