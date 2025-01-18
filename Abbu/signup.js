import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, collection, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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
const db = getFirestore(app); // Initialize Firestore

// Function to sign up the user
async function signUpUser(email, password) {
  try {
    // Register the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    console.log("User signed up with ID:", userId);

    // Initialize Firestore for the user
    await initializeGameCollections(userId);

    console.log("Game collections created for the user.");
  } catch (error) {
    console.error("Error during sign-up:", error.message);
  }
}

// Function to initialize 5 game collections for the user
async function initializeGameCollections(userId) {
    const games = ["game1", "game2", "game3", "game4", "game5"]; // List of game names
  
    // Create each game collection with an initial document containing an empty array
    const promises = games.map(async (game) => {
      // const gameRef = doc(collection(db, "users", userId, game)); // Reference to subcollection
      const gameRef = doc(db, "users", userId, game, "gameData");

      await setDoc(gameRef, { scores: [] }); // Add an initial document with an empty array
    });
  
    // Wait for all collections to be created
    await Promise.all(promises);
  }
  

// Add event listener to the signup button
let signupbtn = document.querySelector(".signup-btn");

signupbtn.addEventListener("click", (event) => {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmp = document.getElementById("confirm-password").value;

  if (password === confirmp) {
    signUpUser(email, password);
  } else {
    alert("Re-enter password");
  }
});
