import './style.css';
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

gsap.to("#main__title", {
  filter: "blur(7px)",
  scale: 0.9,
  duration: 1,
  ease: "power2.in",
  scrollTrigger: {
    trigger: "header",
    start: "bottom bottom",
    end: "bottom center",
    scrub: true,
    toggleActions: "restart pause resume pause"
  }
});


var mainTitle = document.getElementById("main__title");
const fonts = ['VT323', 'Lisu Bosa', 'Caveat', 'Chokokutai', 'Handjet', 'Lugrasimo', 'Lumanosimo', 'Permanent Marker', 'Rowdies', 'Zeyada', 'Big Shoulders Inline Text', 'Press Start 2P', 'Kablammo', 'Moirai One', 'Monoton'];

applyFontSwapAnim(mainTitle, fonts, "VT323", 1000, 200);


function applyFontSwapAnim(element, fonts, defaultFont, duration = 2000, interval = 200) {
  const text = element.innerText;
  const chars = text.split("");

  let totalTime = 0;

  const charElements = [];
  
  chars.forEach((char, index) => {
    charElements.push(document.createElement("span"));
    charElements[index].classList.add("main__title-char");
    charElements[index].style.display = "inline-block";
    charElements[index].style.width = "0.8em";
    charElements[index].innerText = char;
  });

  const toClear = setInterval(() => {
    if (totalTime >= duration) {
      clearInterval(toClear);

      element.innerHTML = "";
      charElements.forEach((charElement) => {
        charElement.style.fontFamily = "monospace";
        element.innerHTML += charElement.outerHTML;
      });

      charElements.forEach((charElement, index) => {
        console.log('Setting up hover for element', index, 'with element', charElement);
        
        charElement.addEventListener("mouseover", () => {
          console.log('Mouse over event triggered for element', index);
          charElement.style.fontFamily = "serif";
        });
        
        charElement.addEventListener("mouseout", () => {
          console.log('Mouse out event triggered for element', index);
          charElement.style.fontFamily = "monospace";
        });
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


