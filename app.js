const gridSize = 600;
let row = (col = 20); // Increase the number of cells
let isErasing = false;
let selectedColor = "#333333"; // Default color
let isRandomColorMode = false; // Flag to indicate random color mode
const colorButton = document.getElementById("colorbtn");
const colorPicker = document.getElementById("colorPicker"); // Get color picker element
const randomButton = document.getElementById("randombtn"); // Get random button element

const container = document.querySelector(".grid-container");
container.style.width = `${gridSize}px`;
container.style.height = `${gridSize}px`;

function createGrid() {
  container.innerHTML = "";
  for (let i = 1; i <= row * col; i++) {
    const divInside = document.createElement("div");
    divInside.style.width = `${gridSize / col - 2}px`;
    divInside.style.height = `${gridSize / col - 2}px`;
    divInside.classList.add("cell");

    divInside.addEventListener("mousemove", () => {
      if (isErasing) {
        divInside.style.backgroundColor = "white"; // Erase
      } else {
        if (isRandomColorMode) {
          divInside.style.backgroundColor = getRandomColor(); // Draw with random color
        } else {
          divInside.style.backgroundColor = selectedColor; // Draw with selected color
        }
      }
    });

    container.appendChild(divInside);
  }
}

function updateGridSize() {
  row = col = parseInt(document.querySelector("#gridSizeSlider").value);
  createGrid();
}

function clearSketchpad() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
}

function toggleEraser() {
  isErasing = !isErasing; // Toggle eraser mode
  const erasebtn = document.querySelector("#erasebtn");
  erasebtn.textContent = isErasing ? "Drawing Mode" : "Eraser Mode";
}

function openColorPicker() {
  colorPicker.click(); // Trigger color picker click
}

function setColor(event) {
  selectedColor = event.target.value;
  // colorButton.style.backgroundColor = selectedColor; // Set color button background directly
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

randomButton.addEventListener("click", () => {
  isRandomColorMode = !isRandomColorMode;
  randomButton.textContent = isRandomColorMode ? "Random (On)" : "Random (Off)";
});

createGrid(); // Initial grid creation

// Listen for changes in the slider value
const slider = document.querySelector("#gridSizeSlider");
slider.addEventListener("input", updateGridSize);

// Listen for click on clear button
const clearbtn = document.querySelector("#clearbtn");
clearbtn.addEventListener("click", clearSketchpad);

// Listen for click on eraser button
const erasebtn = document.querySelector("#erasebtn");
erasebtn.addEventListener("click", toggleEraser);

// Listen for click on color button
colorButton.addEventListener("click", openColorPicker);

// Listen for color selection
colorPicker.addEventListener("input", setColor);
