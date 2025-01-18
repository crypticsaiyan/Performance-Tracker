// Hidden numbers (predefined list)
const hiddenNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// Function to calculate and display the result
function checkInput() {
  const userInput = document.getElementById("user-input").value;
  const inputNumbers = userInput.split(",").map(num => parseInt(num.trim()));

  let correctNumbers = [];
  let incorrectNumbers = [];

  inputNumbers.forEach(num => {
    if (hiddenNumbers.includes(num)) {
      correctNumbers.push(num);
    } else {
      incorrectNumbers.push(num);
    }
  });

  // Calculate the percentage of correct answers
  const correctPercentage = (correctNumbers.length / hiddenNumbers.length) * 100;

  // Display results
  let resultMessage = `You identified ${correctNumbers.length} correct number(s) out of ${hiddenNumbers.length}.<br>`;
  resultMessage += `Correct Percentage: ${correctPercentage.toFixed(2)}%.<br>`;
  

  if (incorrectNumbers.length > 0) {
    resultMessage += `Incorrect number: ${incorrectNumbers.join(", ")}.<br>`;
  } else {
    resultMessage += "No incorrect numbers entered!<br>";
  }

  document.getElementById("result").innerHTML = resultMessage;
}

// Add event listener to submit button
document.getElementById("submit-button").addEventListener("click", checkInput);
