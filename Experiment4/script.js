let game = document.getElementById("game");

game.style.textAlign = "center";
game.style.fontFamily = "Arial";
game.style.background = "#f1f3f5";
game.style.padding = "20px";

let heading = document.createElement("h2");
heading.textContent = "Interactive Chessboard";
game.appendChild(heading);

let message = document.createElement("p");
message.textContent = "Click a piece, then click where you want to move it.";
game.appendChild(message);

let board = document.createElement("div");

board.style.display = "grid";
board.style.gridTemplateColumns = "repeat(8, 60px)";
board.style.width = "480px";
board.style.margin = "20px auto";
board.style.border = "4px solid #333";
board.style.maxWidth = "100%";

game.appendChild(board);

let pieces = [
    ["♜","♞","♝","♛","♚","♝","♞","♜"],
    ["♟","♟","♟","♟","♟","♟","♟","♟"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["♙","♙","♙","♙","♙","♙","♙","♙"],
    ["♖","♘","♗","♕","♔","♗","♘","♖"]
];

let selected = null;
let squares = [];

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {

        let square = document.createElement("div");

        square.style.width = "60px";
        square.style.height = "60px";
        square.style.display = "flex";
        square.style.justifyContent = "center";
        square.style.alignItems = "center";
        square.style.fontSize = "40px";
        square.style.cursor = "pointer";

        square.style.backgroundColor =
            (row + col) % 2 === 0 ? "#f0d9b5" : "#779556";

        square.textContent = pieces[row][col];

        board.appendChild(square);
        squares.push(square);

        square.onclick = function() {

            let index = row * 8 + col;

            if (selected === null) {
                if (square.textContent !== "") {
                    selected = index;
                    square.style.outline = "3px solid yellow";
                }
            }
            else {
                let source = squares[selected];

                if (source === square) {
                    source.style.outline = "none";
                    selected = null;
                    return;
                }

                if (square.textContent !== "" &&
                    square.textContent === source.textContent) {
                    source.style.outline = "none";
                    selected = index;
                    square.style.outline = "3px solid yellow";
                    return;
                }

                square.textContent = source.textContent;
                source.textContent = "";

                source.style.outline = "none";
                selected = null;
            }
        };
    }
}