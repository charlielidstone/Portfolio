const mainTitleAnimation = {
  run: function() {
    const mainTitle = document.getElementById("main__title");

    if (mainTitle !== null) {
      const fonts = [
        'VT323',
        'Lisu Bosa', 
        'Lugrasimo',
        'Rowdies',
        'Kablammo',
        'Rye',
        'Grenze Gotisch',
        'UnifrakturCook',
        'Old London',
      ];
      const mainTitleAnimationDuration = 4500;

      mainTitle.style.display = "flex"

      gsap.from("#main__title", {
        opacity: 0,
        duration: mainTitleAnimationDuration / 2000,
        ease: "linear",
        delay: 0.5,
      });

      gsap.from("#main__title", {
        scale: 0.9,
        duration: mainTitleAnimationDuration / 1000 + 0.5,
        ease: "linear",
      });

      applyFontSwapAnim(mainTitle, fonts, "Lisu Bosa", mainTitleAnimationDuration, 300);
    } else {
      console.error("#main__title not found");
    }
  }
};

function applyFontSwapAnim(element, fonts, defaultFont, duration = 2000, interval = 200) {
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
  });

  const toClear = setInterval(() => {
    if (totalTime >= duration) {
      clearInterval(toClear);

      element.innerHTML = "";
      charElements.forEach((charElement, index) => {
        // charElement.style.fontFamily = defaultFont;
        if (index > 0) charElement.style.textTransform = "lowercase";
        element.appendChild(charElement);
        element.style.transition = "all 1.2s ease";
        element.style.opacity = "0";
        element.style.scale = "1.1";
        
        var singleCharToClear;
        var previousRandomFontIndex;
        charElement.addEventListener("mouseover", () => {
          var randomFontIndex = Math.floor(Math.random() * fonts.length);
          previousRandomFontIndex = randomFontIndex;
          const randomFont = fonts[randomFontIndex];
          charElement.style.fontFamily = randomFont;
          singleCharToClear = setInterval(() => {
            do {
              var randomFontIndex = Math.floor(Math.random() * fonts.length);
            } while (randomFontIndex === previousRandomFontIndex);
            previousRandomFontIndex = randomFontIndex;
            var randomFont = fonts[randomFontIndex];
            charElement.style.fontFamily = randomFont;
          }, interval / 1.5);
        });
  
        charElement.addEventListener("mouseout", () => {
          charElement.style.fontFamily = defaultFont;
          clearInterval(singleCharToClear);
        });
      });

      return;
    }

    element.innerHTML = "";

    charElements.forEach((charElement) => {
      const randomFontIndex = Math.floor(Math.random() * fonts.length);
      charElement.style.fontFamily = fonts[randomFontIndex];
      element.appendChild(charElement); 
    });

    totalTime += interval;
  }, interval);
}

export default mainTitleAnimation;