let isColoring = false;
let currColor = '';

export function updateBrush(event) {
    let returnedStyleObj = getComputedStyle(event.currentTarget);
    let clickedColor = returnedStyleObj.backgroundColor;
    let brush = document.getElementById("brush");
    brush.style.backgroundColor = clickedColor;
    currColor = clickedColor;
};

export const handleMouseDown = event => {
    event.currentTarget.style.backgroundColor = currColor;
    isColoring = true;
};

export const handleMouseMove = event => {
    if (isColoring) {
       event.currentTarget.style.backgroundColor = currColor; 
    };
};

export const handleMouseUp = event => {
    isColoring = false;
};