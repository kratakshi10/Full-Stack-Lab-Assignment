
const board = document.getElementById("board");
const drawing = document.getElementById("drawing");

let positions = [0, 0];
let player = 0;
let gameOver = false;

const snakes = {
    17: 7,
    54: 34,
    62: 19,
    99: 78,
    87: 24,
    93: 73
};

const ladders = {
    4: 14,
    9: 31,
    20: 38,
    28: 84,
    40: 59,
    51: 67,
    63: 81,
    71: 91
};

// Get coordinates of each square
function getPoint(num) {
    const block = Math.floor((num - 1) / 10);
    const offset = (num - 1) % 10;

    const col = block % 2 === 0 ? offset : 9 - offset;
    const row = 9 - block;

    return {
        x: col * 100 + 50,
        y: row * 100 + 50
    };
}

// Draw a ladder
function drawLadder(start, end) {
    const a = getPoint(start);
    const b = getPoint(end);

    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    const ox = (dy / length) * 15;
    const oy = (-dx / length) * 15;

    const x1 = a.x + ox;
    const y1 = a.y + oy;
    const x2 = b.x + ox;
    const y2 = b.y + oy;

    const x3 = a.x - ox;
    const y3 = a.y - oy;
    const x4 = b.x - ox;
    const y4 = b.y - oy;

    let svg = `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="#8B4513" stroke-width="10" stroke-linecap="round"/>
        <line x1="${x3}" y1="${y3}" x2="${x4}" y2="${y4}"
              stroke="#8B4513" stroke-width="10" stroke-linecap="round"/>
    `;

    for (let i = 1; i <= 7; i++) {
        const t = i / 8;

        const cx = a.x + dx * t;
        const cy = a.y + dy * t;

        svg += `
            <line x1="${cx + ox}" y1="${cy + oy}"
                  x2="${cx - ox}" y2="${cy - oy}"
                  stroke="#F5C16C" stroke-width="8"
                  stroke-linecap="round"/>
        `;
    }

    drawing.innerHTML += svg;
}

// Draw a snake
function drawSnake(start, end, color) {
    const a = getPoint(start);
    const b = getPoint(end);

    const dx = b.x - a.x;
    const dy = b.y - a.y;

    const curve = `
        M ${a.x} ${a.y}
        C ${a.x + dx * 0.8 + 100} ${a.y + dy * 0.3},
          ${a.x + dx * 0.2 - 100} ${a.y + dy * 0.7},
          ${b.x} ${b.y}
    `;

    drawing.innerHTML += `
        <path d="${curve}"
              stroke="${color}" stroke-width="22"
              fill="none" stroke-linecap="round"/>

        <circle cx="${a.x}" cy="${a.y}"
                r="20" fill="${color}"
                stroke="#222" stroke-width="2"/>

        <circle cx="${a.x - 7}" cy="${a.y - 5}"
                r="4" fill="white"/>

        <circle cx="${a.x + 7}" cy="${a.y - 5}"
                r="4" fill="white"/>

        <circle cx="${a.x - 7}" cy="${a.y - 5}"
                r="2" fill="black"/>

        <circle cx="${a.x + 7}" cy="${a.y - 5}"
                r="2" fill="black"/>
    `;
}

// Create numbered board
for (let row = 9; row >= 0; row--) {
    for (let col = 0; col < 10; col++) {

        let num;

        if (row % 2 === 0)
            num = row * 10 + col + 1;
        else
            num = row * 10 + (10 - col);

        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = "cell" + num;

        let mark = "";

        if (snakes[num]) {
            cell.classList.add("snake-cell");
            mark = "🐍";
        }

        if (ladders[num]) {
            cell.classList.add("ladder-cell");
            mark = "🪜";
        }

        if (num === 1) mark = "START";
        if (num === 100) mark = "🏆";

        cell.innerHTML = `
            <span class="number">${num}</span>
            <span class="mark">${mark}</span>
            <span class="players"></span>
        `;

        board.appendChild(cell);
    }
}

// Draw all ladders
Object.entries(ladders).forEach(([start, end]) => {
    drawLadder(Number(start), Number(end));
});

// Draw all snakes
const snakeColors = [
    "#E53935",
    "#8E44AD",
    "#00897B",
    "#E67E22",
    "#3949AB",
    "#558B2F"
];

Object.entries(snakes).forEach(([start, end], i) => {
    drawSnake(Number(start), Number(end), snakeColors[i]);
});

// Update players
function updateBoard() {

    for (let i = 1; i <= 100; i++) {
        document.querySelector("#cell" + i + " .players").innerHTML = "";
    }

    positions.forEach((pos, index) => {

        if (pos === 0) return;

        const token = document.querySelector(
            "#cell" + pos + " .players"
        );

        token.innerHTML += index === 0
            ? '<span class="p1">● P1</span>'
            : '<span class="p2">● P2</span>';
    });
}

// Roll dice
function rollDice() {

    if (gameOver) return;

    const dice = Math.floor(Math.random() * 6) + 1;

    document.getElementById("dice").innerHTML =
        "Dice: " + dice;

    let newPosition = positions[player] + dice;

    if (newPosition > 100) {
        player = player === 0 ? 1 : 0;

        document.getElementById("turn").innerHTML =
            "Player " + (player + 1) + "'s Turn";

        return;
    }

    positions[player] = newPosition;

    if (ladders[newPosition]) {
        positions[player] = ladders[newPosition];
        alert("🪜 You climbed a ladder!");
    }
    else if (snakes[newPosition]) {
        positions[player] = snakes[newPosition];
        alert("🐍 A snake bit you!");
    }

    updateBoard();

    if (positions[player] === 100) {
        document.getElementById("turn").innerHTML =
            "🏆 Player " + (player + 1) + " Wins!";

        gameOver = true;
        return;
    }

    player = player === 0 ? 1 : 0;

    document.getElementById("turn").innerHTML =
        "Player " + (player + 1) + "'s Turn";
}

// Restart
function restartGame() {
    positions = [0, 0];
    player = 0;
    gameOver = false;

    document.getElementById("dice").innerHTML = "Dice: 🎲";
    document.getElementById("turn").innerHTML = "Player 1's Turn";

    updateBoard();
}

updateBoard();
