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

    console.log(initialState());
    console.log(currentState);

    if (checkWinner(currentState, turn)) {
      console.log(turn + " wins!");
    }

    historyState.push(deepCopyState(currentState));

    updateBoard();

    console.log(historyState);
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

resetBoard();
