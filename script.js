let initialState = function () {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
};
let moves = [];
let currentState, turn;
let moveIndex = 0;

let resetBoard = function () {
  currentState = initialState();
  moves = [];
  moveIndex = 0;
  turn = "X";
  hideControlButtons();
  updateBoard();
};

document
  .getElementById("previous-button")
  .addEventListener("click", showPreviousMove);
document.getElementById("next-button").addEventListener("click", showNextMove);
document.getElementById("reset-button").addEventListener("click", resetBoard);

let updateBoard = function () {
  let board = document.querySelector(".game-board");
  if (!board) return;
  board.innerHTML = buildBoard(currentState);
};

let buildBoard = function (state) {
  let boardHTML = "";

  const winningPattern = getWinningPattern(state);
  const isWinningMove = winningPattern !== null;

  for (let i = 0; i < state.length; i++) {
    boardHTML += `<div class="row">`;

    for (let j = 0; j < state[i].length; j++) {
      const isSquareWinning =
        isWinningMove && winningPattern.includes(i * 3 + j);
      const disabledClass = state[i][j] !== "" ? "disabled" : "";
      const winningClass = isSquareWinning ? "winning-square" : "";

      boardHTML += `<button class="square ${winningClass}" data-row='${i}' data-column='${j}' ${disabledClass}>${state[i][j]}</button>`;
    }

    boardHTML += `</div>`;
  }
  return boardHTML;
};

document.addEventListener("click", function (event) {
  if (event.target.matches(".square")) {
    let row = event.target.getAttribute("data-row");
    let column = event.target.getAttribute("data-column");

    currentState[row][column] = turn;

    moves.push(deepCopyState(currentState));

    moveIndex = moves.length - 1;
    updateBoard();

    if (checkWinner(currentState, turn)) {
      alert(turn + " wins!");
      disableSquareButtons(); // Disable buttons when a player wins
      showControlButtons(); // Show the "Previous," "Next," and "Reset" buttons

      updateButtonStates();
      return; // Stop further processing
    }

    turn = turn === "X" ? "O" : "X";

    if (isDraw()) {
      alert("It's a draw!");
      disableSquareButtons();
      showControlButtons();
      updateButtonStates();
    }
  }
});

function deepCopyState(state) {
  return JSON.parse(JSON.stringify(state));
}

function checkWinner(board, player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] === player &&
      board[1][j] === player &&
      board[2][j] === player
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  }
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  }

  return false;
}

function showPreviousMove() {
  if (moveIndex > 0) {
    moveIndex--;
    currentState = deepCopyState(moves[moveIndex]);
    updateBoard();
    updateButtonStates();
    disableSquareButtons();
  }
}

function showNextMove() {
  if (moveIndex < moves.length - 1) {
    moveIndex++;
    currentState = deepCopyState(moves[moveIndex]);
    updateBoard();
    updateButtonStates();
    disableSquareButtons();
  }
}

function disableSquareButtons() {
  const squareButtons = document.querySelectorAll(".square");

  squareButtons.forEach((button) => {
    button.disabled = true;
  });
}

function showControlButtons() {
  const buttonContainer = document.querySelector(".button-container");
  buttonContainer.style.visibility = "visible";
}

function hideControlButtons() {
  const buttonContainer = document.querySelector(".button-container");
  buttonContainer.style.visibility = "hidden";
}

function isDraw() {
  // Check if all squares are filled with X or O
  for (let i = 0; i < currentState.length; i++) {
    for (let j = 0; j < currentState[i].length; j++) {
      if (currentState[i][j] === "") {
        return false;
      }
    }
  }
  // If all squares are filled, and no player has won, it's a draw
  return true;
}

function showResetButton() {
  // Show the reset button by setting the display style to "block"
  const resetButton = document.getElementById("reset-button");
  resetButton.style.display = "block";
}

function updateButtonStates() {
  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");

  // Enable or disable the "Previous" button based on the moveIndex
  previousButton.disabled = moveIndex === 0;

  // Enable or disable the "Next" button based on the moveIndex
  nextButton.disabled = moveIndex === moves.length - 1;
}

function getWinningPattern(board) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return [i * 3, i * 3 + 1, i * 3 + 2];
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] !== "" &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      return [j, j + 3, j + 6];
    }
  }

  // Check diagonals
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return [0, 4, 8];
  }
  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return [2, 4, 6];
  }

  // If no winner, return null
  return null;
}

resetBoard();
