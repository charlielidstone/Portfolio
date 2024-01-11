const c = {
  defaultFont: "Old London",
  defaultFontSize: "1em",
  defaultPositionTop: "0em",
  defaultPositionLeft: "0.2em",
}

const h = {
  defaultFont: "Nova Flat",
  defaultFontSize: "0.9em",
  defaultPositionTop: "0em",
  defaultPositionLeft: "0em",
}

const a = {
  defaultFont: "UnifrakturCook",
  defaultFontSize: "1em",
  defaultPositionTop: "0em",
  defaultPositionLeft: "-0.1em",
}

const r = {
  defaultFont: '"ARB 85 Poster Script JAN-39"',
  defaultFontSize: "0.9em",
  defaultPositionTop: "0em",
  defaultPositionLeft: "-0.1em",
}

const l = {
  defaultFont: "US Angel",
  defaultFontSize: "1em",
  defaultPositionTop: "0em",
  defaultPositionLeft: "0.2em",
}

const i = {
  defaultFont: "Grenze Gotisch",
  defaultFontSize: "1.1em",
  defaultPositionTop: "-0.06em",
  defaultPositionLeft: "0.1em",
}

const e = {
  defaultFont: "Patua One",
  defaultFontSize: "1em",
  defaultPositionTop: "0em",
  defaultPositionLeft: "-0.2em",
}

const mainTitleAnimation = {
  run: function() {
    const mainTitle = document.getElementById("main__title");

    if (mainTitle !== null) {
      const fonts = [
        'VT323',
        'Lisu Bosa', 
        // 'Lugrasimo',
        'Rowdies',
        // 'Rye',
        'Grenze Gotisch',
        '"UnifrakturCook"',
        'Old London',
        'Cutive Mono',
        '"ARB 85 Poster Script JAN-39"',
      ];
      const mainTitleAnimationDuration = 4300; // 4300ms works well

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

      applyFontSwapAnimation(mainTitle, fonts, "Lisu Bosa", mainTitleAnimationDuration, 300);
    } else {
      console.error("#main__title not found");
    }
  }
};

function applyFontSwapAnimation(element, fonts, defaultFont, duration = 2000, interval = 200) {
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
    if (totalTime >= duration && duration !== 0) {
      clearInterval(toClear);

      element.innerHTML = "";
      charElements.forEach((charElement, index) => {
        charElement.style.fontFamily = defaultFont;
        console.log(index);
        if (index === 0) { charElement.style.fontFamily = 'Old London'; charElement.style.left = '0.2em' }
        else if (index === 1) { charElement.style.fontFamily = 'Nova Flat'; charElement.style.fontSize = '0.9em' }
        else if (index === 2) { charElement.style.fontFamily = 'UnifrakturCook'; charElement.style.left = '-0.1em' }
        else if (index === 3) { charElement.style.fontFamily = '"ARB 85 Poster Script JAN-39"'; charElement.style.fontSize = '0.9em'; charElement.style.left = '-0.1em' }
        else if (index === 4) { charElement.style.fontFamily = 'US Angel'; charElement.style.left = '0.2em' }
        else if (index === 5) { charElement.style.fontFamily = 'Grenze Gotisch'; charElement.style.fontSize = '1.1em'; charElement.style.left = '0.1em'; charElement.style.top = '-0.06em' }
        else if (index === 6) { charElement.style.fontFamily = 'Patua One'; charElement.style.left = '-0.2em' }

        // if (index > 0) charElement.style.textTransform = "lowercase";
        element.appendChild(charElement);
        element.style.transition = "all 1.2s ease";
        // element.style.opacity = "0";
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