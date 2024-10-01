// Initialize variables for the game state
let board = ['', '', '', '', '', '', '', '', '']; // Represents the game board
let currentPlayer = 'X'; // Start with player X
let isGameActive = true; // Track whether the game is ongoing

// Function to create the grid dynamically
function createGrid() {
    const gridElement = document.getElementById('grid');

    // Loop to create 9 cells for the Tic-Tac-Toe grid
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div'); // Create a new div for each cell
        cell.className = 'cell'; // Add cell class for styling
        cell.addEventListener('click', () => handleCellClick(i)); // Add click event listener
        gridElement.appendChild(cell); // Append the cell to the grid
    }
}

// Handle the click event on a cell
function handleCellClick(index) {
    // Check if the cell is already occupied or if the game is over
    if (board[index] !== '' || !isGameActive) {
        return; // Exit if the cell is occupied or the game is not active
    }

    // Update the board with the current player's symbol
    board[index] = currentPlayer;
    updateCell(index); // Update the visual representation of the cell

    // Check for a win or a draw
    if (checkWin()) {
        announceResult(`${currentPlayer} wins!`); // Announce winner
    } else if (board.every(cell => cell)) {
        announceResult("It's a draw!"); // Announce draw if board is full
    } else {
        // Change turn to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').innerText = `${currentPlayer}'s Turn`; // Update the status text
    }
}

// Update the visual representation of a cell
function updateCell(index) {
    const cells = document.querySelectorAll('.cell');
    cells[index].innerText = board[index]; // Set the cell's text to the current player's symbol
}

// Check for a win condition
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Check each winning combination
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c]; // Check if they are the same
    });
}

// Announce the result using a Bootstrap alert
function announceResult(message) {
    isGameActive = false; // Stop the game
    const alert = `<div class="alert alert-info alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
    document.body.insertAdjacentHTML('afterbegin', alert); // Insert alert at the top of the page
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Reset the board
    currentPlayer = 'X'; // Reset the current player
    isGameActive = true; // Restart the game
    document.getElementById('status').innerText = `${currentPlayer}'s Turn`; // Reset status text
    document.getElementById('grid').innerHTML = ''; // Clear the grid
    createGrid(); // Recreate the grid
}

// Event listener for the reset button
document.getElementById('resetButton').addEventListener('click', resetGame);

// Initialize the game
createGrid();
