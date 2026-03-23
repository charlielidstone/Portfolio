export function applyDragability(element) {
    const defaultStyles = {
        position: "fixed",
        left: "50px",
        top: "50px",
        zIndex: 1,
        cursor: "grab",
    };

    try {
        Object.assign(element.style, defaultStyles);

        let offsetX, offsetY;
        let isDragging = false;
        
        element.addEventListener("pointerdown", (e) => {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.setPointerCapture(e.pointerId);
            element.style.cursor = "grabbing";
        });
        
        element.addEventListener("pointermove", (e) => {
            if (!isDragging) return;
            element.style.left = e.clientX - offsetX + "px";
            element.style.top = e.clientY - offsetY + "px";
        });
        
        element.addEventListener("pointerup", () => {
            isDragging = false;
            element.style.cursor = "grab";
        });
    } catch (error) {
        console.error("Failed to apply default styles:", error);
    }
}
