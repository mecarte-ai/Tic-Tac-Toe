let initialState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentState = [];

let turn = "X";

let buildBoard = function (board) {
  let gameBoard = document.querySelector(".game-board");
  let boardHTML = "";

  for (let i = 0; i < board.length; i++) {
    boardHTML += `<div class="row">`;

    for (let j = 0; j < board[i].length; j++) {
      boardHTML += `<button class='square' data-row='${i}' data-column='${j}'></button>`;
    }

    boardHTML += `</div>`;
    gameBoard.innerHTML = boardHTML;
  }
};

document.addEventListener("click", function (event) {
  if (event.target.matches(".square")) {
    console.log(event.target);

    let row = event.target.getAttribute("data-row");
    let column = event.target.getAttribute("data-column");

    console.log(row);
    console.log(column);

    event.target.innerHTML = turn;
    turn = turn === "X" ? "O" : "X";
  }
});

buildBoard(initialState);
