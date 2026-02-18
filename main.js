const body = document.body;

const box = document.getElementById('box');

let offsetX, offsetY;
let isDragging = false;

box.addEventListener("pointerdown", (e) => {
    isDragging = true;
    offsetX = e.clientX - box.offsetLeft;
    offsetY = e.clientY - box.offsetTop;
    box.setPointerCapture(e.pointerId);
});

box.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    box.style.left = e.clientX - offsetX + "px";
    box.style.top = e.clientY - offsetY + "px";
});

box.addEventListener("pointerup", () => {
    isDragging = false;
});

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

const variableWidthText = document.querySelector('.variable-width-text');

const variableWidthTextChars = variableWidthText.textContent.split("");

variableWidthText.innerHTML = variableWidthTextChars.map(char => {
    return `<span>${char}</span>`;
}).join("");

const variableWidthTextSpans = variableWidthText.querySelectorAll('span');

body.addEventListener("pointermove", (e) => {
    variableWidthTextSpans.forEach(span => {
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;
        const distance = Math.sqrt(offsetX * offsetX + (offsetY * offsetY)/7);
        // const distance = Math.abs(offsetX);
        const weight = Math.max(100, 900 - distance * 7);
        span.style.fontWeight = weight;
    });
});