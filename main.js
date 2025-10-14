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
