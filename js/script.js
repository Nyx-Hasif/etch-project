// These are constants that define the default color, mode, and size for the drawing grid.
//This line declares a constant variable named DEFAULT_COLOR and assigns it a value of #333333, which is a hex code representing a dark gray color.
const DEFAULT_COLOR = "#333333";

//This line declares a constant variable named DEFAULT_MODE and assigns it a value of 'color'.
//This variable is used to keep track of the current drawing mode (color, rainbow, or eraser), and 'color' is the default mode.
const DEFAULT_MODE = "color";

//This line declares a constant variable named DEFAULT_SIZE and assigns it a value of 16.
//This variable is used to keep track of the current grid size, and 16 is the default size.
const DEFAULT_SIZE = 16;

//These three lines declare three variables currentColor, currentMode, and currentSize, and assign them the values of DEFAULT_COLOR, DEFAULT_MODE, and DEFAULT_SIZE, respectively.
//These variables are used to keep track of the current color, drawing mode, and grid size.
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

//This line declares a function named setCurrentColor that takes in a parameter newColor.
// When called, this function sets the value of the currentColor variable to the value of the newColor parameter.
function setCurrentColor(newColor) {
  currentColor = newColor;
}

//This line declares a function named setCurrentMode that takes in a parameter newMode.
// When called, this function sets the value of the currentMode variable to the value of the newMode parameter, and also calls the activateButton function, passing in the newMode parameter.
function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}
//This line declares a function named setCurrentSize that takes in a parameter newSize.
//When called, this function sets the value of the currentSize variable to the value of the newSize parameter.
function setCurrentSize(newSize) {
  currentSize = newSize;
}

//These lines declare several variables using the const keyword and assign them to specific HTML elements on the page.
//colorPicker is assigned to an input element with an id of 'colorPicker', colorBtn, rainbowBtn, eraserBtn, and clearBtn are assigned to button elements with corresponding ids,
//sizeValue is assigned to a span element with an id of 'sizeValue', sizeSlider is assigned to an input element with an id of 'sizeSlider', and grid is assigned to a div element with an id of 'grid'.
const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");

//This line sets an event listener on a color picker input element, so that whenever the user selects a color from the picker,
// the setCurrentColor function is called with the selected color value as the argument.
colorPicker.oninput = (e) => setCurrentColor(e.target.value);

//These lines set event listeners on three button elements, so that when each button is clicked,
//the setCurrentMode function is called with a string argument indicating which mode to activate: "color", "rainbow", or "eraser".
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
//This line sets an event listener on a button element, so that when the button is clicked, the reloadGrid function is called.
clearBtn.onclick = () => reloadGrid();

//These lines set event listeners on a range input element, so that when the user moves the slider,
//the updateSizeValue function is called to update the displayed size value, and when the user releases the slider, the changeSize function is called to change the grid size.
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

//These lines set event listeners on the body element, so that when the user presses down on the mouse button anywhere on the page,
// the mouseDown variable is set to true, and when the user releases the mouse button, the mouseDown variable is set to false.
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//This function updates the size of the grid and reloads it with the new size, based on the value passed as an argument.
function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

//This function updates the displayed size value in the UI based on the value passed as an argument.
function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

//This function clears the current grid and sets up a new grid with the current size value.
function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

//This function sets up the grid in the HTML document with a specified size, by creating child elements (divs) with a class of "grid-element",
// and adding event listeners to them for changing their color when the mouse is moved over them or clicked on them.
function clearGrid() {
  grid.innerHTML = "";
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}

//This function is called whenever the user interacts with the grid, and it changes the color of the grid element that was interacted with.
//The function first checks if the event type is "mouseover" and if the mouse button is not down (i.e. the user is not currently dragging the mouse).
// If this condition is true, the function returns without doing anything. This is to prevent the function from executing when the user is just hovering over the grid without actually drawing anything.

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  //Next, the function checks the current mode of the application. If the mode is "rainbow",
  // the function generates a random RGB value and sets the background color of the grid element to that value. If the mode is "color",
  //the function sets the background color of the grid element to the current color (stored in the currentColor variable).
  //If the mode is "eraser", the function sets the background color of the grid element to white (#fefefe).
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

//This function is called whenever the user clicks on a mode button (color, rainbow, or eraser),
// and it updates the appearance of the buttons to indicate which mode is currently active.
function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  //The function first checks the current mode of the application and removes the "active" class from the corresponding button (i.e. the button that represents the current mode).
  //Next, the function adds the "active" class to the button that represents the new mode (i.e. the button that was just clicked).
  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

//This code is executed when the page finishes loading, and it initializes the grid and sets the default mode.
window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};

//The setupGrid function creates the grid elements and sets up the grid layout based on the DEFAULT_SIZE constant.
//The activateButton function sets the default mode to DEFAULT_MODE and updates the appearance of the mode buttons accordingly.
