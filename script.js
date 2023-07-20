let initialState = function () {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
};
let historyState = [];
let currentState, turn;

let resetBoard = function () {
  currentState = initialState();
  historyState = [];
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

    historyState.push(deepCopyState(currentState));

    updateBoard();

    console.log(historyState);
    turn = turn === "X" ? "O" : "X";
  }
});

function deepCopyState(state) {
  return JSON.parse(JSON.stringify(state));
}

resetBoard();
