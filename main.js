import './style.css';
import { gsap } from "gsap";

gsap.to("#main__title", {
  duration: 1,
  scale: 1.5,
  ease: "ease-out",
  scrollTrigger: {
    trigger: "header",
    start: "bottom bottom",
    end: "bottom top",
    scrub: true,
    pin: true,
    markers: true,
    toggleActions: "restart none none none"
  }
  
});

var mainTitle = document.getElementById("main__title");
const fonts = ['VT323', 'Lisu Bosa', 'Caveat', 'Chokokutai', 'Handjet', 'Lugrasimo', 'Lumanosimo', 'Permanent Marker', 'Rowdies', 'Zeyada', 'Big Shoulders Inline Text', 'Press Start 2P', 'Kablammo', 'Moirai One', 'Monoton'];

applyFontSwapAnim(mainTitle, fonts, "VT323", 2000, 200);

function applyFontSwapAnim(element, fonts, defaultFont, duration = 2000, interval = 200) {
  const text = element.innerText;
  const chars = text.split("");

  let totalTime = 0;

  const charElements = [];
  
  chars.forEach((char, index) => {
    charElements.push(document.createElement("span"));
    charElements[index].style.display = "inline-block";
    charElements[index].style.width = "0.8em";
    charElements[index].innerText = char;
  });
``
  const toClear = setInterval(() => {
    if (totalTime >= duration) {
      clearInterval(toClear);
      element.innerHTML = "";
      charElements.forEach((charElement) => {
        charElement.style.fontFamily = "monospace";
        element.innerHTML += charElement.outerHTML;
      });
      return;
    }

    element.innerHTML = ""
    
    charElements.forEach((charElement, index) => {
      const randomFontIndex = Math.floor(Math.random() * fonts.length);
      charElement.style.fontFamily = fonts[randomFontIndex];
      element.innerHTML += charElement.outerHTML;
    });

    totalTime += interval;
  }, interval);
}


