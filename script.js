let initialState = function () {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
};
let historyState = [];
let currentState, turn;
let moveIndex = 0;

let resetBoard = function () {
  currentState = initialState();
  historyState = [];
  moveIndex = 0;
  turn = "X";
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

  for (let i = 0; i < state.length; i++) {
    boardHTML += `<div class="row">`;

    for (let j = 0; j < state[i].length; j++) {
      boardHTML += `<button class="square" data-row='${i}' data-column='${j}'>${state[i][j]}</button>`;
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

    historyState.push(deepCopyState(currentState));

    moveIndex = historyState.length - 1;

    if (checkWinner(currentState, turn)) {
      alert(turn + " wins!");
      disableSquareButtons(); // Disable buttons when a player wins
      showControlButtons(); // Show the "Previous," "Next," and "Reset" buttons
      return; // Stop further processing
    }

    updateBoard();

    turn = turn === "X" ? "O" : "X";
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
    currentState = deepCopyState(historyState[moveIndex]);
    updateBoard();
  }
}

function showNextMove() {
  if (moveIndex < historyState.length - 1) {
    moveIndex++;
    currentState = deepCopyState(historyState[moveIndex]);
    updateBoard();
  }
}

function disableSquareButtons() {
  const squareButtons = document.querySelectorAll(".square");

  squareButtons.forEach((button) => {
    button.disabled = true;
  });
}

function showControlButtons() {
  // Show the buttons by setting the display style to "block"
  const buttonContainer = document.querySelector(".button-container");
  buttonContainer.style.display = "block";
}

resetBoard();
