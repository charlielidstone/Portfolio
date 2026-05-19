const themes = [
  // light
  { name: "white",       label: "White",       swatch: "#ffffff", border: "#cccccc" },
  { name: "warm",        label: "Warm",        swatch: "#faf7f2", border: "#1a1512" },
  { name: "slate-mist",  label: "Slate Mist",  swatch: "#f2f4f8", border: "#1c2333" },
  { name: "blush",       label: "Blush",       swatch: "#fdf5f6", border: "#b5596a" },
  { name: "graphite",    label: "Graphite",    swatch: "#f5f5f5", border: "#888888" },
  // dark
  { name: "obsidian",    label: "Obsidian",    swatch: "#0e0e0e", border: "#555555" },
  { name: "parchment",   label: "Parchment",   swatch: "#f2e8d5", border: "#5c3d1e" },
  { name: "navy",        label: "Navy",        swatch: "#0d1520", border: "#4a6a9a" },
  { name: "sage",        label: "Sage",        swatch: "#101a12", border: "#4a7a50" },
  { name: "rosewood",    label: "Rosewood",    swatch: "#1a0a0d", border: "#c4868e" },
];

const STORAGE_KEY = "portfolio-theme";

function applyTheme(name) {
  if (name === "white") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", name);
  }
  localStorage.setItem(STORAGE_KEY, name);

  document.querySelectorAll(".theme-swatch").forEach((el) => {
    el.classList.toggle("active", el.dataset.theme === name);
  });
}

function buildSwitcher() {
  const switcher = document.createElement("div");
  switcher.id = "theme-switcher";

  themes.forEach(({ name, label, swatch, border }) => {
    const btn = document.createElement("button");
    btn.className = "theme-swatch";
    btn.dataset.theme = name;
    btn.title = label;
    btn.style.background = swatch;
    btn.style.borderColor = border;
    btn.addEventListener("click", () => applyTheme(name));
    switcher.appendChild(btn);
  });

  document.body.appendChild(switcher);
}

const themesModule = {
  setup() {
    buildSwitcher();
    const saved = localStorage.getItem(STORAGE_KEY) ?? "white";
    applyTheme(saved);
  },
};

export default themesModule;
