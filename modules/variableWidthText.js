export function initVariableWidthText(selector = '.variable-width-text') {
    const variableWidthText = document.querySelector(selector);
    
    if (!variableWidthText) return;
    
    const variableWidthTextChars = variableWidthText.textContent.split("");
    
    variableWidthText.innerHTML = variableWidthTextChars.map(char => {
        return `<span>${char}</span>`;
    }).join("");
    
    const variableWidthTextSpans = variableWidthText.querySelectorAll('span');
    
    const handlePointerMove = (e) => {
        variableWidthTextSpans.forEach(span => {
            const rect = span.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const offsetX = e.clientX - centerX;
            const offsetY = e.clientY - centerY;
            const distance = Math.sqrt(offsetX * offsetX + (offsetY * offsetY) / 7);
            const weight = Math.max(100, 900 - distance * 7);
            span.style.fontWeight = weight;
        });
    };
    
    document.body.addEventListener("pointermove", handlePointerMove);
    
    // Optional: return cleanup function
    return () => {
        document.body.removeEventListener("pointermove", handlePointerMove);
    };
}

export default initVariableWidthText;