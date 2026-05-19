import { gsap } from "gsap";

const loaderModule = {
  setup(onComplete = () => {}) {
    const loader = document.getElementById("loader");
    if (!loader) { onComplete(); return; }

    const counterEl = loader.querySelector(".loader-counter");
    const bar       = loader.querySelector(".loader-bar");
    const MIN_S     = 1;
    const counter   = { val: 0 };

    // Progress bar + counter both run over exactly MIN_S seconds
    gsap.to(bar, { width: "100%", duration: MIN_S, ease: "none" });
    gsap.to(counter, {
      val: 100,
      duration: MIN_S,
      ease: "none",
      onUpdate() { counterEl.textContent = Math.round(counter.val); },
    });

    const dismiss = () => {
      gsap.to(loader, {
        y: "-100%",
        duration: 0.75,
        ease: "power3.inOut",
        onComplete() {
          loader.remove();
          onComplete();
        },
      });
    };

    const startTime = performance.now();

    const tryDismiss = () => {
      const elapsedMs = performance.now() - startTime;
      const remainingMs = Math.max(0, MIN_S * 1000 - elapsedMs);
      setTimeout(dismiss, remainingMs);
    };

    if (document.readyState === "complete") {
      tryDismiss();
    } else {
      window.addEventListener("load", tryDismiss);
    }
  },
};

export default loaderModule;
