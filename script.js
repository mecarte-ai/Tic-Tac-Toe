let initialBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let buildBoard = function (board) {
  let gameBoard = document.querySelector(".game-board");
  let boardHTML = "";
  let box = 0;

  for (let i = 0; i < board.length; i++) {
    boardHTML += `<div class="row">`;

    for (let j = 0; j < board[i].length; j++) {
      box++;
      boardHTML += `<div class='square'>box ${box}</div>`;
    }

    boardHTML += `</div>`;
    gameBoard.innerHTML = boardHTML;
  }
};

buildBoard(initialBoard);
