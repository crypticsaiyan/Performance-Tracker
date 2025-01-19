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

document.addEventListener('DOMContentLoaded', () => {
  let words = [];
  let correct = 0;
  const box = document.getElementById('answers');
  let superdiv;

  const removehidden = () => {
    superdiv = document.getElementById('input');
    superdiv.classList.remove('hidden');
  };

  const over = () => {
    const timeOverWindow = document.getElementById('timeOverWindow');
    timeOverWindow.classList.remove('hidden');
    timeOverWindow.classList.add('block');
    appendScoreToGame(userId,"game1", correct)
  };

  // Log the query string
  const urlParams = new URLSearchParams(window.location.search);

  // Extract and decode the 'words' parameter
  const encodedWords = urlParams.get('words');
  if (encodedWords) {
    words = JSON.parse(decodeURIComponent(encodedWords));
    console.log(words); // Logs the array of words
  } else {
    console.log('No words found in the query string.');
  }

  document.getElementById('submit').addEventListener('click', async () => {
    let input = document.getElementById('ans').value;
    if (words.includes(input)) {
      console.log(true);
      correct++;
      const sbox = document.createElement('div');
      sbox.textContent = input;
      box.append(sbox);
      document.getElementById('score').textContent = 10 - correct;
      document.getElementById('ans').value = '';

      // Update Firebase with the new score
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          userId = user.uid;
        } else {
          console.log("User not authenticated");
        }
      });
    } else {
      document.getElementById('ans').value = '';
      console.log(false);
    }
  });

  setTimeout(removehidden, 10000);
  setTimeout(over, 40000);
});
