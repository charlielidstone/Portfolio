import { applyDragability } from "./draggable.js";

const body = document.body;

const box = document.getElementById('box');
applyDragability(box);

const ca = document.querySelector('.chromatic-aberration');

// make box-shadow point in direction of mouse relative to center of element, between 1px and -1px
body.addEventListener("pointermove", (e) => {
    const rect = ca.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    const shadowX = offsetX / 20;
    const shadowY = offsetY / 20;
    ca.style.textShadow = `
        ${shadowX}px ${shadowY}px 0 rgba(255,255,0,0.1),
        ${shadowX * -1}px ${shadowY * -1}px 0 rgba(0,255,255,0.1)
    `;
});


const gradualBlurBox = document.getElementById("gradual-blur-box");
applyDragability(gradualBlurBox);

const divCount = 7;

for (let i=0; i<divCount; i++) {
    const newElement = document.createElement("div");
    newElement.setAttribute("class", "gradual-blur-div");
    console.log(newElement);
    gradualBlurBox.appendChild(newElement);
    // newElement.style.backdropFilter = `blur(${i**2}px)`
}
