const riddles = [
    { question: "What gets smaller every time it takes a bath?", answer: "Soap" },
    { question: "I'm not a blanket, yet I cover the ground; a crystal from heaven that doesn't make a sound. What am I?", answer: "Snowflake" },
    { question: "I'm sweet and cold with a stick to hold; a treat on a hot day, worth more than gold. What am I?", answer: "icecream" },
    { question: "What has keys but can't open locks?", answer: "piano" },
    { question: "I have a neck, but no head. I have two arms, but no hands. What am I?", answer: "shirt" },
    { question: "What word contains 26 letters but only has three syllables?", answer: "Alphabet" },
    { question: "What comes down but never goes up?", answer: "Rain" },
    { question: "What five-letter word typed in all capital letters can be read the same upside down?", answer: "SWIMS" },
    { question: "The more you take, the more you leave behind. What am I?", answer: "Footsteps" },
    { question: "David's father has three sons: Snap, Crackle and _____?", answer: "David" },
    { question: "What is more useful when it is broken?", answer: "egg" },
    { question: "I am easy to lift, but hard to throw. What am I?", answer: "feather" },
    { question: "Which fish costs the most?", answer: "goldfish" },
    { question: "What goes up, but never comes down?", answer: "Age" },
    { question: "What has a neck but no head?", answer: "bottle" },
    { question: "What is full of holes but still holds water?", answer: "sponge" },
    { question: "What has a face and two hands but no arms or legs?", answer: "Clock" },
    { question: "What has a head, a tail, is brown, and has no legs?", answer: "Penny" },
    { question: "What has a foot but no legs?", answer: "Ruler" },
    { question: "What has a thumb and four fingers but is not alive?", answer: "glove" },
    { question: "What has a ring but no finger?", answer: "Telephone" },
    { question: "What has one eye but can’t see?", answer: "Needle" },
    { question: "What has a bed but never sleeps?", answer: "River" },
    { question: "What has a bank but no money?", answer: "River" },
    {
      question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
      answer: "M"
    },
    {
      question: "What can travel around the world while staying in the corner?",
      answer: "Stamp"
    },
    {
      question: "What gets wetter as it dries?",
      answer: "Towel"
    },
    {
      question: "What can you catch but not throw?",
      answer: "Cold"
    },
    {
      question: "What runs, but never walks, has a bed, but never sleeps?",
      answer: "River"
    },
    {
      question: "What is always coming but never arrives?",
      answer: "Tomorrow"
    },
  
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
    questionElement.dataset.answer = randomRiddle.answer.toLowerCase(); // Store the answer in a data attribute
  }
  
  // Function to end the game
  function endGame() {
    resultElement.innerHTML = "Game Over! Thanks for playing!";
    questionElement.innerHTML = ""; // Clear the question
    answerInput.disabled = true; // Disable input field
    checkButton.disabled = true; // Disable button
    finalResultElement.innerHTML = `You answered ${correctCount} out of ${maxAttempts} questions correctly.`; // Display correct answers
  }
  
  // Initialize with a random question
  updateRiddle();
  
  // Add event listener to the "Check" button
  checkButton.addEventListener("click", function () {
    const userAnswer = answerInput.value.trim().toLowerCase();
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
  