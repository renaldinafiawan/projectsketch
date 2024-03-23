const gridSize = 600;
let row = (col = 20); // Increase the number of cells
let isErasing = false;
let selectedColor = "#333333"; // Default color
let isRandomColorMode = false; // Flag to indicate random color mode
const colorButton = document.getElementById("warnabtn");
const colorPicker = document.getElementById("colorPicker"); // Get color picker element
const randomButton = document.getElementById("acakbtn"); // Get random button element

const container = document.querySelector(".kotakkotak");
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
  const hapusbtn = document.querySelector("#bersihbtn");
  hapusbtn.textContent = isErasing ? "Drawing Mode" : "Eraser Mode";
}

function openColorPicker() {
  colorPicker.click(); // trigger color picker click
}

function setColor(event) {
  selectedColor = event.target.value;
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
  randomButton.textContent = isRandomColorMode ? "Acak (On)" : "Acak (Off)";
});
createGrid(); //initial grid creation

//listen for changes in the slider values

const slider = document.querySelector("#gridSizeSlider");
slider.addEventListener("input", updateGridSize);

//Listen for click on clear button
const bersihbtn = document.querySelector("#bersihbtn");
bersihbtn.addEventListener("click", toggleEraser);

//Listen for click on japus button
const hapusbtn = document.querySelector("#hapusbtn");
hapusbtn.addEventListener("click", clearSketchpad);

//Listen for click on color button
colorButton.addEventListener("click", openColorPicker);

//Listen for click on clear button
colorPicker.addEventListener("input", setColor);
