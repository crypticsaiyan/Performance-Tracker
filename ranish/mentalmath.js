const riddles = [
    { question: "24 + 18", answer: 42 },
    { question: "56 - 29", answer: 27 },
    { question: "12 × 6", answer: 72 },
    { question: "81 ÷ 9", answer: 9 },
    { question: "42 + 33", answer: 75 },
    { question: "72 ÷ 8", answer: 9 },
    { question: "15 × 5", answer: 75 },
    { question: "90 - 38", answer: 52 },
    { question: "23 + 17", answer: 40 },
    { question: "98 ÷ 7", answer: 14 },
    { question: "63 ÷ 7", answer: 9 },
    { question: "19 × 4", answer: 76 },
    { question: "56 + 48", answer: 104 },
    { question: "144 ÷ 12", answer: 12 },
    { question: "75 - 47", answer: 28 },
    { question: "36 × 2", answer: 72 },
    { question: "49 + 51", answer: 100 },
    { question: "56 × 2", answer: 112 },
    { question: "125 ÷ 5", answer: 25 },
    { question: "72 - 19", answer: 53 },
    { question: "15 + 8", answer: 23 },
    { question: "32 ÷ 4", answer: 8 },
    { question: "17 × 3", answer: 51 },
    { question: "58 + 42", answer: 100 },
    { question: "27 ÷ 3", answer: 9 },
    { question: "54 ÷ 6", answer: 9 },
    { question: "45 + 19", answer: 64 },
    { question: "63 - 48", answer: 15 },
    { question: "72 ÷ 6", answer: 12 },
    { question: "10 × 9", answer: 90 },
    { question: "34 + 27", answer: 61 },
    { question: "60 ÷ 5", answer: 12 },
    { question: "28 × 3", answer: 84 },
    { question: "94 - 68", answer: 26 },
    { question: "125 ÷ 25", answer: 5 },
    { question: "38 × 2", answer: 76 },
    { question: "45 + 22", answer: 67 },
    { question: "88 ÷ 11", answer: 8 },
    { question: "56 - 15", answer: 41 },
    { question: "16 × 5", answer: 80 },
    { question: "12 + 25", answer: 37 },
    { question: "48 ÷ 8", answer: 6 },
    { question: "51 - 29", answer: 22 },
    { question: "14 × 6", answer: 84 },
    { question: "98 + 16", answer: 114 },
    { question: "62 ÷ 2", answer: 31 },
    { question: "75 ÷ 5", answer: 15 },
    { question: "42 × 2", answer: 84 },
    { question: "63 + 19", answer: 82 },
    { question: "56 - 24", answer: 32 },
    { question: "60 + 33", answer: 93 },
    { question: "48 × 3", answer: 144 },
    { question: "27 + 53", answer: 80 },
    { question: "92 ÷ 4", answer: 23 },
    { question: "36 - 19", answer: 17 },
    { question: "21 × 4", answer: 84 },
    { question: "15 + 48", answer: 63 },
    { question: "99 - 57", answer: 42 },
    { question: "64 ÷ 8", answer: 8 },
    { question: "40 + 35", answer: 75 },
    { question: "72 ÷ 9", answer: 8 },
    { question: "81 - 52", answer: 29 },
    { question: "47 + 23", answer: 70 },
    { question: "90 ÷ 10", answer: 9 },
    { question: "33 × 2", answer: 66 },
    { question: "48 + 27", answer: 75 },
    { question: "102 ÷ 6", answer: 17 },
    { question: "28 × 5", answer: 140 },
    { question: "56 ÷ 7", answer: 8 },
    { question: "18 × 5", answer: 90 },
    { question: "13 + 56", answer: 69 },
    { question: "75 ÷ 15", answer: 5 },
    { question: "84 ÷ 7", answer: 12 },
    { question: "67 + 28", answer: 95 },
    { question: "27 × 4", answer: 108 },
    { question: "62 - 17", answer: 45 },
    { question: "98 + 19", answer: 117 },
    { question: "48 ÷ 12", answer: 4 },
    { question: "22 × 3", answer: 66 },
    { question: "53 + 14", answer: 67 },
    { question: "99 ÷ 11", answer: 9 },
    { question: "41 - 16", answer: 25 },
    { question: "88 + 7", answer: 95 },
    { question: "27 + 29", answer: 56 },
    { question: "90 - 54", answer: 36 },
    { question: "14 + 18", answer: 32 },
    { question: "52 ÷ 13", answer: 4 },
    { question: "64 - 48", answer: 16 },
    { question: "45 × 2", answer: 90 },
    { question: "63 ÷ 3", answer: 21 },
    { question: "49 - 21", answer: 28 },
    { question: "67 × 3", answer: 201 },
    { question: "36 ÷ 4", answer: 9 },
    { question: "80 + 15", answer: 95 },
    { question: "18 ÷ 3", answer: 6 },
    { question: "24 × 3", answer: 72 },
    { question: "56 ÷ 8", answer: 7 },
    { question: "49 + 12", answer: 61 },
    { question: "38 × 2", answer: 76 },
    { question: "72 ÷ 12", answer: 6 }
];

const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const checkButton = document.getElementById("Check");
const resultElement = document.getElementById("result");
const attemptsCountElement = document.getElementById("attempts-count"); // Element to display total attempts
const finalResultElement = document.getElementById("final-result"); // Element to display the final result

let correctCount = 0; // Counter for correct answers
let totalAttempts = 0; // Counter for total questions attempted
const maxAttempts = 10; // Maximum attempts before the game ends

// Function to get a random riddle
function getRandomRiddle() {
  const randomIndex = Math.floor(Math.random() * riddles.length);
  return riddles[randomIndex];
}

// Function to update the question
function updateRiddle() {
  const randomRiddle = getRandomRiddle();
  questionElement.innerHTML = randomRiddle.question;
  questionElement.dataset.answer = randomRiddle.answer; // Store the answer in a data attribute
}

// Function to end the game
function endGame() 
{
  resultElement.innerHTML = "Game Over! Thanks for playing!";
  questionElement.innerHTML = ""; // Clear the question
  answerInput.remove() // Disable input field
  checkButton.remove() // Disable button
  finalResultElement.innerHTML = `You answered ${correctCount} out of ${maxAttempts} questions correctly.`; // Display correct answers
}

// Initialize with a random question
updateRiddle();

// Add event listener to the "Check" button
checkButton.addEventListener("click", function () {
  const userAnswer = answerInput.value.trim();
  const correctAnswer = questionElement.dataset.answer;

  totalAttempts++; // Increment the total attempts
  attemptsCountElement.innerHTML = `Total Attempts: ${totalAttempts}`; // Update total attempts display

  if (userAnswer === correctAnswer) {
    correctCount++; // Increment the correct answer count
    resultElement.innerHTML = "Correct Answer!";
  } else {
    resultElement.innerHTML = `Incorrect Answer! Correct Answer:"${correctAnswer}".`;
  }

  answerInput.value = ""; // Clear the input field

  if (totalAttempts < maxAttempts) {
    updateRiddle(); // Load a new riddle if game is not over
  } else {
    endGame(); // End the game when total attempts reach maxAttempts
  }
});