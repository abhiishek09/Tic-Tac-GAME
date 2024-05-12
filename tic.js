// Define variables
let boxes = document.querySelectorAll('.box');
let resetButton = document.getElementById('reset-btn');
let turnO = true; // true for O's turn, false for X's turn

// Define win patterns
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

// Function to check for a winner
function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            // Highlight winning boxes
            boxes[a].style.backgroundColor = 'green';
            boxes[b].style.backgroundColor = 'green';
            boxes[c].style.backgroundColor = 'green';
            disableBoxes(); // Disable all boxes
            return true;
        }
    }
    return false;
}

// Function to disable all boxes
function disableBoxes() {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

// Function to handle box click event
function handleBoxClick(event) {
    let box = event.target;
    if (!box.innerText) { // Check if the box is empty
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // Disable the clicked box
        if (!checkWinner()) { // If there's no winner yet
            // Check if all boxes are filled (tie game)
            let allFilled = true;
            boxes.forEach(box => {
                if (!box.innerText) {
                    allFilled = false;
                }
            });
            if (allFilled) {
                alert("It's a tie!");
            }
        }
    }
}

// Function to reset the game
function resetGame() {
    boxes.forEach(box => {
        box.innerText = ''; // Clear box text
        box.style.backgroundColor = ''; // Reset box background color
        box.disabled = false; // Enable the box
    });
    turnO = true; // Reset turn to O
}

// Add click event listener to boxes
boxes.forEach(box => {
    box.addEventListener('click', handleBoxClick);
});

// Add click event listener to reset button
resetButton.addEventListener('click', resetGame);
