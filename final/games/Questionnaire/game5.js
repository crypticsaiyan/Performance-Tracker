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


    function getRandomIndices(array, count) {
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}
    // List of questions with their options
    const questions = [
  {
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"]
  },
  {
    question: "What is your preferred programming language?",
    options: ["JavaScript", "Python", "Java", "C++"]
  },
  {
    question: "What is your favorite season?",
    options: ["Winter", "Spring", "Summer", "Fall"]
  },
  {
    question: "What kind of music do you enjoy?",
    options: ["Pop", "Rock", "Classical", "Jazz"]
  },
  {
    question: "What is your favorite type of food?",
    options: ["Italian", "Chinese", "Mexican", "Indian"]
  },
  {
    question: "How do you prefer to spend your free time?",
    options: ["Reading", "Traveling", "Playing Sports", "Watching Movies"]
  },
  {
    question: "What kind of movies do you enjoy?",
    options: ["Action", "Comedy", "Drama", "Horror"]
  },
  {
    question: "Which type of pet do you prefer?",
    options: ["Dog", "Cat", "Bird", "Fish"]
  },
  {
    question: "What is your favorite drink?",
    options: ["Coffee", "Tea", "Juice", "Water"]
  },
  {
    question: "How do you usually start your day?",
    options: ["With a workout", "With coffee", "By reading the news", "By sleeping in"]
  },
  {
    question: "Where would you like to go on vacation?",
    options: ["Beach", "Mountains", "City", "Countryside"]
  },
  {
    question: "What is your preferred mode of transport?",
    options: ["Car", "Bike", "Bus", "Train"]
  },
  {
    question: "What is your ideal way to relax?",
    options: ["Meditation", "Listening to music", "Watching TV", "Taking a walk"]
  },
  {
    question: "Which type of book do you like the most?",
    options: ["Fiction", "Non-fiction", "Mystery", "Science Fiction"]
  },
  {
    question: "How do you like your coffee?",
    options: ["Black", "With milk", "With sugar", "I don’t drink coffee"]
  },
  {
    question: "What time of day do you feel most productive?",
    options: ["Morning", "Afternoon", "Evening", "Late night"]
  },
  {
    question: "What is your favorite type of weather?",
    options: ["Sunny", "Rainy", "Snowy", "Cloudy"]
  },
  {
    question: "What kind of exercise do you enjoy?",
    options: ["Running", "Yoga", "Swimming", "Weightlifting"]
  },
  {
    question: "What is your dream job?",
    options: ["Entrepreneur", "Artist", "Scientist", "Teacher"]
  },
  {
    question: "What is your favorite dessert?",
    options: ["Ice cream", "Cake", "Cookies", "Pie"]
  },
  {
    question: "How do you like to celebrate your birthday?",
    options: ["With friends and family", "Traveling", "A quiet day at home", "Throwing a party"]
  },
  {
    question: "What is your favorite outdoor activity?",
    options: ["Hiking", "Camping", "Cycling", "Fishing"]
  },
  {
    question: "What is your favorite indoor activity?",
    options: ["Cooking", "Reading", "Gaming", "Watching TV"]
  },
  {
    question: "What type of art do you prefer?",
    options: ["Painting", "Sculpture", "Photography", "Digital Art"]
  },
  {
    question: "What is your favorite type of clothing?",
    options: ["Casual", "Formal", "Sporty", "Traditional"]
  },
  {
    question: "What do you enjoy most in a city?",
    options: ["The food", "The culture", "The nightlife", "The architecture"]
  },
  {
    question: "How do you prefer to stay fit?",
    options: ["Gym workouts", "Outdoor activities", "Group classes", "I don’t exercise"]
  },
  {
    question: "What type of technology excites you the most?",
    options: ["AI", "Virtual Reality", "Space exploration", "Smart home devices"]
  },
  {
    question: "What’s your favorite way to stay connected with friends?",
    options: ["Calling", "Texting", "Social Media", "Meeting in person"]
  },
  {
    question: "What motivates you the most?",
    options: ["Success", "Helping others", "Passion", "Recognition"]
  },
  {
    question: "What is your favorite type of snack?",
    options: ["Chips", "Chocolate", "Fruits", "Popcorn"]
  },
  {
    question: "What is your favorite time of the year?",
    options: ["Spring", "Summer", "Fall", "Winter"]
  },
  {
    question: "What kind of shows do you like watching?",
    options: ["Reality shows", "Documentaries", "Sitcoms", "Drama series"]
  },
  {
    question: "Which superpower would you like to have?",
    options: ["Flying", "Invisibility", "Super strength", "Time travel"]
  },
  {
    question: "What is your favorite meal of the day?",
    options: ["Breakfast", "Lunch", "Dinner", "Snacks"]
  },
  {
    question: "What kind of games do you enjoy?",
    options: ["Board games", "Video games", "Card games", "Outdoor games"]
  },
  {
    question: "What do you usually do on weekends?",
    options: ["Relax", "Go out with friends", "Work on hobbies", "Catch up on chores"]
  },
  {
    question: "What is your favorite holiday tradition?",
    options: ["Decorating", "Cooking festive meals", "Exchanging gifts", "Traveling"]
  },
  {
    question: "What is your favorite animal?",
    options: ["Dog", "Cat", "Horse", "Bird"]
  },
  {
    question: "What do you value most in a friendship?",
    options: ["Loyalty", "Humor", "Kindness", "Shared interests"]
  },
  {
    question: "What type of environment do you prefer to work in?",
    options: ["Quiet", "Collaborative", "Fast-paced", "Flexible"]
  },
  {
    question: "What do you enjoy most in a vacation destination?",
    options: ["The food", "The history", "The scenery", "The activities"]
  },
  {
    question: "What inspires you the most?",
    options: ["Nature", "Art", "Books", "People"]
  },
  {
    question: "How do you prefer to spend a rainy day?",
    options: ["Reading a book", "Watching movies", "Sleeping", "Going out"]
  },
  {
    question: "What’s your go-to comfort food?",
    options: ["Pizza", "Pasta", "Soup", "Burger"]
  },
  {
    question: "What is your dream type of home?",
    options: ["Apartment in the city", "House in the suburbs", "Cabin in the woods", "Beachfront villa"]
  },
  {
    question: "How do you prefer to celebrate achievements?",
    options: ["Throwing a party", "Treating yourself", "Sharing with loved ones", "Quiet reflection"]
  },
  {
    question: "What is your favorite way to learn new things?",
    options: ["Reading", "Watching videos", "Taking a class", "Hands-on practice"]
  },
  {
    question: "What is your favorite type of soup?",
    options: ["Tomato", "Chicken noodle", "Mushroom", "Lentil"]
  }
];


    let currentQuestionIndex = 0;
    let questionStartTime;
    let responses = [];
    const randomIndices = getRandomIndices(questions, 10);
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result');
    //let i=0;
    // Function to display the question and options
    function displayQuestion() {
      const question = questions[randomIndices[currentQuestionIndex]];
        console.log(currentQuestionIndex)
      questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
      `;

      question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.setAttribute('data-option', option);
        optionElement.setAttribute('data-index', index);
        optionElement.addEventListener('click', handleAnswer);
        questionContainer.appendChild(optionElement);
      });

      questionStartTime = Date.now(); // Start timing the response
    }

    // Function to handle answer selection
   // Function to handle answer selection
function handleAnswer(event) {
  const selectedOption = event.target.getAttribute('data-option');
  const timeTaken = Date.now() - questionStartTime; // Calculate response time

  responses.push({
    question: questions[randomIndices[currentQuestionIndex]].question,
    optionChosen: selectedOption,
    responseTime: timeTaken
  });

  resultContainer.innerHTML = `<p>You chose: <strong>${selectedOption}</strong>. Time taken: <strong>${timeTaken} ms</strong>.</p>`;

  // Disable further answers
  const options = document.querySelectorAll('.option');
  options.forEach(option => (option.style.pointerEvents = 'none'));

  // Wait for 1 second and move to the next question
  setTimeout(nextQuestion, 1000);
}

// Function to go to next question
function nextQuestion() {
  currentQuestionIndex++;

  // Check if there are more questions left
  if (currentQuestionIndex < randomIndices.length) {
    displayQuestion();
  } else {
    displayFinalResults(); // Show results if no questions left
  }
}

// Function to display final results after all questions are answered
function displayFinalResults() {
  let resultsHtml = '<h2>Survey Complete! Here are your responses:</h2>';
  let totalResponseTime = 0;

  responses.forEach((response, index) => {
    resultsHtml += `
      <p><strong>Question ${index + 1}: </strong>${response.question}</p>
      <p>Chosen Option: ${response.optionChosen}</p>
      <p>Response Time: ${response.responseTime} ms</p>
      <hr />
    `;
    totalResponseTime += response.responseTime;
  });

  const averageResponseTime = (totalResponseTime / responses.length).toFixed(2);
  console.log(averageResponseTime)
  let score = Math.floor((1/averageResponseTime)*10000)
  console.log(score)

appendScoreToGame(userId,"game5", score)
  resultsHtml += `<p><strong>Average Response Time:</strong> ${averageResponseTime} ms</p>`;

  resultContainer.innerHTML = resultsHtml; // Display results in the container
}

    // Initialize the first question
    displayQuestion();