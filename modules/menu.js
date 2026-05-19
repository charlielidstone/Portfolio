const menuModule = {
  setup() {
    const overlay  = document.getElementById("menu-overlay");
    const openBtn  = document.querySelector(".menu-button");
    const closeBtn = document.querySelector(".menu-close");
    const navLinks = document.querySelectorAll(".menu-nav-link");

    const open = () => {
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);

    navLinks.forEach((link) => {
      link.addEventListener("click", close);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  },
};

export default menuModule;
