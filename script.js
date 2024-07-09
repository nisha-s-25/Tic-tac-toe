// JavaScript code to handle Tic Tac Toe game logic

// Game variables
let currentPlayer = 'X'; // 'X' starts the game
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the Tic Tac Toe board state

// Winning combinations (indices in gameState array)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to handle cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id').split('-')[1]);

    // Check if the cell is already marked or game is not active
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update cell and gameState
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for win
    checkWin();

    // Check for draw
    checkDraw();

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for a win
function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            document.getElementById('status').textContent = ''; // Clear status
            document.getElementById('result').textContent = `Player ${gameState[a]} wins!`;
            return;
        }
    }
}

// Function to check for a draw
function checkDraw() {
    if (!gameState.includes('') && gameActive) {
        gameActive = false;
        document.getElementById('status').textContent = ''; // Clear status
        document.getElementById('result').textContent = `It's a draw!`;
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];

    // Reset cell text content
    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => {
        cell.textContent = '';
    });

    // Reset status and result messages
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    document.getElementById('result').textContent = '';
}

// Event listeners
document.getElementById('board').addEventListener('click', handleCellClick);
document.getElementById('resetButton').addEventListener('click', resetGame);
