
// Function to append a score to the array of a specific game
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, updateDoc, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOT2krZGgCIdH3UoBA3FFV984rKnfnIEk",
  authDomain: "agglomeration-project.firebaseapp.com",
  projectId: "agglomeration-project",
  storageBucket: "agglomeration-project.firebasestorage.app",
  messagingSenderId: "116434044665",
  appId: "1:116434044665:web:9ebef05a798ba91e700428",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let userId;
onAuthStateChanged(auth, async (user) => {
        if (user) {
          userId = user.uid;
        }
         else {
          console.log("User not authenticated");
        }
      });
   
/**
 * Appends a score to the array of a specific game, allowing duplicate values.
 * @param {string} userId - The user's unique ID.
 * @param {string} gameName - The name of the game (e.g., 'game1').
 * @param {number} score - The score to append to the game's score array.
 */
async function appendScoreToGame(userId, gameName, score) {
  try {
    // Reference to the specific game's document in the user's collection
    const gameDocRef = doc(db, "users", userId, gameName, "gameData");

    // Fetch the current document to get the existing scores
    const gameDocSnap = await getDoc(gameDocRef);

    if (gameDocSnap.exists()) {
      // Get the existing scores array or initialize it
      const gameData = gameDocSnap.data();
      const currentScores = gameData.scores || [];

      // Append the new score
      currentScores.push(score);

      // Update the document with the new scores array
      await setDoc(gameDocRef, { scores: currentScores });

      console.log(`Score ${score} added to ${gameName} for user ${userId}`);
    } else {
      // If the document does not exist, create it with the new score
      await setDoc(gameDocRef, { scores: [score] });
      console.log(`Score ${score} added to a new ${gameName} document for user ${userId}`);
    }
  } catch (error) {
    console.error("Error adding score:", error.message);
  }
}

const grid = document.getElementById('grid');
const result = document.getElementById('result');
const startButton = document.getElementById('startTest');

const gridSize = 25; // 5x5 grid
const cellColors = ['grey', 'green']; // Default and target color
let activeCell = -1;
let reactionTime = [];
let startTime;
let gameInProgress = false;
let gameTimeout;
let cellTimeout;

// Create the grid
function createGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    grid.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  if (!gameInProgress) return;

  const clickedIndex = parseInt(event.target.dataset.index);
  if (clickedIndex === activeCell) {
    // Correct cell clicked
    const timeTaken = Date.now() - startTime;
    reactionTime.push(timeTaken);
    result.textContent = `✅ Correct! Reaction time: ${timeTaken} ms.`;

    clearTimeout(cellTimeout); // Reset the cell change timer
    if (gameInProgress) {
      cellTimeout = setTimeout(changeRandomCell, 500); // Change to a new cell after a short delay
    }
  } else {
    // Wrong cell clicked
    endGame();
  }
}

// Change a random cell's color
function changeRandomCell() {
  if (!gameInProgress) return;

  highlightAllCells(false); // Reset all cells
  activeCell = Math.floor(Math.random() * gridSize); // Pick a random cell
  const cell = grid.children[activeCell];
  cell.style.backgroundColor = cellColors[1]; // Change color to green
  startTime = Date.now(); // Start timer
}

// Highlight all cells with default color
function highlightAllCells(reset = true) {
  Array.from(grid.children).forEach((cell) => {
    cell.style.backgroundColor = reset ? cellColors[0] : cellColors[0];
  });
}

let score;

// Calculate average reaction time
function calculateAverageReactionTime() {
  if (reactionTime.length === 0) return 0;
  const total = reactionTime.reduce((acc, curr) => acc + curr, 0);
  const average = (total / reactionTime.length).toFixed(2);

  score = Math.floor((1 / average) * 10000);
  console.log(score);
  appendScoreToGame(userId,"game4", score)

  return average;
}

// End the game
function endGame() {
  gameInProgress = false;

  // Clear all timeouts
  clearTimeout(gameTimeout);
  clearTimeout(cellTimeout);

  if (reactionTime.length === 0) {
    result.textContent = "You didn't click any cells! Try again.";
    alert("No reaction times recorded. Try again!");
  } else {
    const avgReactionTime = calculateAverageReactionTime();
    result.textContent = `Game Over! Average Reaction Time: ${avgReactionTime} ms.`;
  }

  highlightAllCells(false); // Reset all cells
}

// Start the test
function startTest() {
  // Clear any previous timeouts
  clearTimeout(gameTimeout);
  clearTimeout(cellTimeout);

  gameInProgress = true;
  reactionTime = [];
  result.textContent = 'Wait for the first cell to change color...';
  highlightAllCells(true);

  // Start the game by changing the first random cell after a short delay
  setTimeout(changeRandomCell, Math.random() * 2000 + 1000); // Delay between 1-3 seconds

  // End the game after 10 seconds
  gameTimeout = setTimeout(() => {
    endGame(); // End game logic
  }, 10000); // 10 seconds limit
}

// Event listener for start button
startButton.addEventListener('click', () => {
  gameInProgress = false;
  createGrid(); // Recreate grid
  startTest();
});

// Initialize the grid on page load
createGrid();
