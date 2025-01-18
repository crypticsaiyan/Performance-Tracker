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

const gridSize = 225; // Total number of cells
const gridElement = document.getElementById('grid');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart');

let startTime; // To store the start time

// Function to generate the grid
function generateGrid() {
  gridElement.innerHTML = '';
  resultElement.textContent = '';
  const randomPosition = Math.floor(Math.random() * gridSize);
  const normalLetter = 'O';
  const hiddenLetter = 'Q';

  startTime = new Date(); // Capture the time when the grid is generated

  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = i === randomPosition ? hiddenLetter : normalLetter;
    cell.addEventListener('click', () => handleCellClick(i === randomPosition));
    gridElement.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(isCorrect) {
  if (isCorrect) {
    const endTime = new Date(); // Capture the time when the correct cell is clicked
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Calculate time difference in seconds
    console.log(timeTaken);
    resultElement.textContent = `🎉 Correct! You found the hidden letter in ${timeTaken} seconds!`;
    appendScoreToGame(userId,"game3", timeTaken)
  } else {
    resultElement.textContent = '❌ Try again!';
  }
}

// Restart button
restartButton.addEventListener('click', generateGrid);

// Initialize the grid
generateGrid();
