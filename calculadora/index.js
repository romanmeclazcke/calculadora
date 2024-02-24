const board = document.getElementById('board');
const message = document.getElementById('message');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

function select(cellIndex) {
    if (boardState[cellIndex] === '' && !checkWinner()) {
        boardState[cellIndex] = currentPlayer;
        render();
        if (!checkWinner()) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function render() {
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => select(index));
        board.appendChild(cellElement);
    });
}

function checkWinner() {
    const winningCombinations = [ //"formas" de la cuales podes ganar
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            message.textContent = `¡${currentPlayer} ha ganado!`;
            return true;
        }
    }

    if (boardState.every(cell => cell !== '')) {
        message.textContent = '¡Empate!';
        return true;
    }
    return false;
}

function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', '']; //reinicio todo el trablero
    message.textContent = '';
    render();
}

render();
