let initialBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let turn = "X";

let buildBoard = function (board) {
  let gameBoard = document.querySelector(".game-board");
  let boardHTML = "";
  let box = 0;

  for (let i = 0; i < board.length; i++) {
    boardHTML += `<div class="row">`;

    for (let j = 0; j < board[i].length; j++) {
      box++;
      boardHTML += `<button class='square'>${i} + ${j}</button>`;
    }

    boardHTML += `</div>`;
    gameBoard.innerHTML = boardHTML;
  }
};

document.addEventListener("click", function (event) {
  if (event.target.matches(".square")) {
    console.log(event.target);
    event.target.innerHTML = turn;
    turn = turn === "X" ? "O" : "X";
  }
});

buildBoard(initialBoard);
