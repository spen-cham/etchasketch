const holder = document.querySelector('.container');
const reset = document.querySelector('.reset');
const resize = document.querySelector('.resize');
const recolor = document.querySelector('.recolor');
let currentSize = 18;
let currentColor = 'green';

function fillGrid(size, width) {
    const div = document.createElement('div');
    div.style.width = `${(width - 100) / (size*3.2)}px`; //scales boxes
    div.style.height = div.style.width;
    holder.appendChild(div);
    div.classList.add('box');
}

function buildGrid (size) {
    const width = holder.clientWidth;

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            fillGrid(size, width);
        }
        const breaker = document.createElement('hr');
        holder.appendChild(breaker);
    }

}

function resetGrid() { //undoes all coloring on grid
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.classList.remove('touched');
        box.style.backgroundColor = 'lightcyan';
    });
}

function isColor(strColor) { //checks if input to recolor button is valid
    var s = new Option().style;
    s.color = strColor;
    return s.color == strColor;
}

recolor.addEventListener('click', function(e) {
    let newColor = prompt("Please enter the new color.");
    if(!isColor(newColor)) {
        alert('This is not an accepted color.');
    }
    else {
        currentColor = newColor;
    }
});

holder.addEventListener('mouseover', function(e) {

    if (e.target.matches('.box') && !e.target.matches('.touched')) { //if hover over untouched box
        e.target.classList.add('touched'); //add touched class
        e.target.style.backgroundColor = currentColor;
    }

});

reset.addEventListener('click', function(e) {
    console.log("Grid Reset.");
    resetGrid();
});

resize.addEventListener('click', function(e) {
    let newSize = prompt("Please enter the new size of your grid.");
    if (newSize < 1 || newSize > 99 || !Number.isInteger(parseInt(newSize))){ //only takes nums from 1-99
        alert("Error: this grid size is invalid.");
    }
    else {
        boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.remove(); //clean out any boxes still present
        })
        console.log('Grid Resized to ' + newSize + '.');
        buildGrid(newSize); //and refills with appropriate sizing
    }
});


buildGrid(currentSize); //creates the grid for usage