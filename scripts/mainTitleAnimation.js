/**
 * this script is for the Loki effect
 */


const oldLondonFont = new FontFace('Old London', 'url(public/fonts/old_london/OldLondon.ttf)');
const usAngelFont = new FontFace('US Angel', 'url(public/fonts/usangel/usangel.ttf)');
const arb85Font = new FontFace('ARB85', 'url(public/fonts/arb85-2/arb85.ttf)');
const cloisterBlackFont = new FontFace('Cloister Black', 'url(public/fonts/cloister-black/CloisterBlack.ttf)');

Promise.all([
  oldLondonFont.load(),
  usAngelFont.load(),
  arb85Font.load(),
  cloisterBlackFont.load()
]).then((loadedFonts) => {
  loadedFonts.forEach((font) => {
    document.fonts.add(font);
  });
});

const MainLogo = {
  c: {
    defaultFont: "Old London",
    defaultFontSize: "1em",
    defaultPositionTop: "0em",
    defaultPositionLeft: "0.2em",
  },
  h: {
    defaultFont: "Nova Flat",
    defaultFontSize: "0.9em",
    defaultPositionTop: "0em",
    defaultPositionLeft: "0em",
  },
  a: {
    defaultFont: "UnifrakturCook",
    defaultFontSize: "1em",
    defaultPositionTop: "0em",
    defaultPositionLeft: "-0.1em",
  },
  r: {
    defaultFont: '"ARB85"',
    defaultFontSize: "0.9em",
    defaultPositionTop: "0em",
    defaultPositionLeft: "-0.2em",
    margin: "0.1em",
  },
  l: {
    defaultFont: "US Angel",
    defaultFontSize: "1em",
    defaultPositionTop: "0em",
    defaultPositionLeft: "0.2em",
  },
  i: {
    defaultFont: "Grenze Gotisch",
    defaultFontSize: "1.1em",
    defaultPositionTop: "-0.06em",
    defaultPositionLeft: "0.1em",
    margin: "0.1em",
  },
  e: {
    defaultFont: "Patua One",
    defaultFontSize: "1em",
    defaultPositionTop: "0em",
    defaultPositionLeft: "-0.2em",
  },
};

const mainTitleAnimation = {
  run: function() {
    const mainTitle = document.getElementById("main__title");

    if (mainTitle !== null) {
      const fonts = [
        // 'VT323',
        'Lisu Bosa', 
        // 'Lugrasimo',
        'Rowdies',
        // 'Rye',
        'Grenze Gotisch',
        '"UnifrakturCook"',
        'Old London',
        // 'Cutive Mono',
        // '"ARB85"',
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

      applyFontSwapAnimation(mainTitle, fonts, "Lisu Bosa", mainTitleAnimationDuration, 351);
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
    var charElementContainer = document.createElement("div")
    charElementContainer.classList.add("main__title-char-container")

    var charElement = document.createElement("span");
    charElement.classList.add("main__title-char");
    charElement.style.display = "inline-block";
    charElement.style.width = "0.8em";
    charElement.innerText = char;

    charElementContainer.appendChild(charElement)
    charElements.push(charElementContainer);
  });

  const toClear = setInterval(() => {
    if (totalTime >= duration && duration !== 0) {
      clearInterval(toClear);

      element.innerHTML = "";
      charElements.forEach((charElement, index) => {
        charElement.style.fontFamily = defaultFont;        
             if (index === 0) { charElement.style.fontFamily = MainLogo.c.defaultFont; charElement.style.left = MainLogo.c.defaultPositionLeft; charElement.style.fontSize = MainLogo.c.defaultFontSize; charElement.style.top = MainLogo.c.defaultPositionTop; }
        else if (index === 1) { charElement.style.fontFamily = MainLogo.h.defaultFont; charElement.style.left = MainLogo.h.defaultPositionLeft; charElement.style.fontSize = MainLogo.h.defaultFontSize; charElement.style.top = MainLogo.h.defaultPositionTop; }
        else if (index === 2) { charElement.style.fontFamily = MainLogo.a.defaultFont; charElement.style.left = MainLogo.a.defaultPositionLeft; charElement.style.fontSize = MainLogo.a.defaultFontSize; charElement.style.top = MainLogo.a.defaultPositionTop; }
        else if (index === 3) { charElement.style.fontFamily = MainLogo.r.defaultFont; charElement.style.left = MainLogo.r.defaultPositionLeft; charElement.style.fontSize = MainLogo.r.defaultFontSize; charElement.style.top = MainLogo.r.defaultPositionTop; charElement.style.marginLeft = MainLogo.r.margin; charElement.style.marginRight = MainLogo.r.margin;}
        else if (index === 4) { charElement.style.fontFamily = MainLogo.l.defaultFont; charElement.style.left = MainLogo.l.defaultPositionLeft; charElement.style.fontSize = MainLogo.l.defaultFontSize; charElement.style.top = MainLogo.l.defaultPositionTop; }
        else if (index === 5) { charElement.style.fontFamily = MainLogo.i.defaultFont; charElement.style.left = MainLogo.i.defaultPositionLeft; charElement.style.fontSize = MainLogo.i.defaultFontSize; charElement.style.top = MainLogo.i.defaultPositionTop; charElement.style.marginLeft = MainLogo.i.margin; charElement.style.marginRight = MainLogo.i.margin;}
        else if (index === 6) { charElement.style.fontFamily = MainLogo.e.defaultFont; charElement.style.left = MainLogo.e.defaultPositionLeft; charElement.style.fontSize = MainLogo.e.defaultFontSize; charElement.style.top = MainLogo.e.defaultPositionTop; }
        else charElement.style.fontFamily = defaultFont;

        // charElement.style.textTransform = "lowercase";
        element.appendChild(charElement);
        // element.style.transition = "all 1.2s ease";
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
          if (charElement.innerHTML == "C") charElement.style.fontFamily = MainLogo.c.defaultFont;
          else if (charElement.innerHTML == "H") charElement.style.fontFamily = MainLogo.h.defaultFont;
          else if (charElement.innerHTML == "A") charElement.style.fontFamily = MainLogo.a.defaultFont;
          else if (charElement.innerHTML == "R") charElement.style.fontFamily = MainLogo.r.defaultFont;
          else if (charElement.innerHTML == "L") charElement.style.fontFamily = MainLogo.l.defaultFont;
          else if (charElement.innerHTML == "I") charElement.style.fontFamily = MainLogo.i.defaultFont;
          else if (charElement.innerHTML == "E") charElement.style.fontFamily = MainLogo.e.defaultFont;
          else charElement.style.fontFamily = defaultFont;
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