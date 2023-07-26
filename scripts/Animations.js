export function applyFontSwapAnim(element, fonts, defaultFont, duration = 2000, interval = 200) {
  const text = element.innerText;
  const chars = text.split("");
  let totalTime = 0;
  const charElements = [];

  chars.forEach((char, index) => {
    const charElement = document.createElement("span");
    charElement.classList.add("main__title-char");
    charElement.style.display = "inline-block";
    charElement.style.width = "0.8em";
    charElement.innerText = char;
    charElements.push(charElement);

    charElement.addEventListener("mouseover", () => {
      const randomFontIndex = Math.floor(Math.random() * fonts.length);
      charElement.style.fontFamily = fonts[randomFontIndex];
    });

    charElement.addEventListener("mouseout", () => {
      charElement.style.fontFamily = defaultFont; // Set the font family back to defaultFont
    });

    charElement.addEventListener("click", () => {
        const randomFontIndex = Math.floor(Math.random() * fonts.length);
        charElement.style.fontFamily = fonts[randomFontIndex];
    });
  });

  const toClear = setInterval(() => {
    if (totalTime >= duration) {
      clearInterval(toClear);

      element.innerHTML = "";
      charElements.forEach((charElement) => {
        charElement.style.fontFamily = defaultFont;
        element.appendChild(charElement); // Use appendChild to add elements to the container
        element.style.transition = "scale 1.2s ease";
        element.style.scale = "1.1";
      });

      return;
    }

    element.innerHTML = "";

    charElements.forEach((charElement) => {
      const randomFontIndex = Math.floor(Math.random() * fonts.length);
      charElement.style.fontFamily = fonts[randomFontIndex];
      element.appendChild(charElement); // Use appendChild to add elements to the container
    });

    totalTime += interval;
  }, interval);
}