// Initialize variables
let currentQuestionIndex = 0;
let userAnswers = {};

// Create an array of questions and their options
const questions = [
  {
    question: "What is your skin type?",
    options: ["Oily", "Dry", "Normal"]
  },
  {
    question: "What is your biggest skin concern?",
    options: ["Discoloration", "Wrinkles", "Acne"]
  },
  {
    question: "What is your age?",
    options: ["18-34", "35-50", "50+"]
  }
];

document.addEventListener("DOMContentLoaded", function () {
  var submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", function () {
    // Hide the "Begin skincare" button
    submitBtn.style.display = "none"; // Generate the first question
    generateQuestion(currentQuestionIndex);
  });
});

// Function to generate a single question UI
function generateQuestion(index) {
  var app = document.getElementById("quiz");
  app.innerHTML = ""; // Clear previous UI
  if (index < questions.length) {
    const q = questions[index];
    var questionLabel = document.createElement("label");
    questionLabel.textContent = q.question;

    var select = document.createElement("select");
    select.id = "currentQuestion";
    q.options.forEach(function (option) {
      var optionElement = document.createElement("option");
      optionElement.value = option.toLowerCase();
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });

    var nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", function () {
      const select = document.getElementById("currentQuestion");
      const selectedOption = select.options[select.selectedIndex].textContent;
      userAnswers[q.question] = selectedOption;
      currentQuestionIndex++;
      generateQuestion(currentQuestionIndex);
    });

    app.appendChild(questionLabel);
    app.appendChild(select);
    app.appendChild(nextButton);
  } else {
    generateReport();
  }
}

// Function to generate report
// Function to generate report
function generateReport() {
  var app = document.getElementById("quiz");
  app.innerHTML = "Report:<br>"; // Initialize report
  let skinTypeProducts = {
    Oily: ["Tower 28 Beauty", "SOS Daily Rescue Facial Spray"],
    Dry: ["Summer Fridays", "Dream Oasis Deep Hydration Serum"],
    Normal: ["The Ordinary", "Mini Natural Moisturizing Factors + HA"]
  };

  let ageProducts = {
    "18-34": ["Typology", "Glow Drops with 5% Vitamin C + Aloe Vera"],
    "35-50": ["Kiehl's", "Midnight Recovery Omega Rich Botanical Night Cream"],
    "50+": ["Clinique", "Turnaround™ Overnight Revitalizing Moisturizer"]
  };

  let skinConcernProducts = {
    Wrinkles: [
      "Drunk Elephant",
      "Lala Retro™ Whipped Refillable Moisturizer with Ceramides"
    ],
    Discoloration: ["Topicals", "Faded Serum for Dark Spots & Discoloration"],
    Acne: ["Glow Recipe", "Blueberry Bounce Gentle Cleanser"]
  };

  for (const [question, answer] of Object.entries(userAnswers)) {
    app.innerHTML += `<strong>${question}:</strong> ${answer}<br>`;
    if (question === "What is your skin type?") {
      let recommendedProducts = skinTypeProducts[answer];
      app.innerHTML += `Based on your skin type, we recommend: ${recommendedProducts.join(
        ", "
      )}<br>`;
    }
    if (question === "What is your age?") {
      let recommendedProducts = ageProducts[answer];
      app.innerHTML += `Based on your skin type, we recommend: ${recommendedProducts.join(
        ", "
      )}<br>`;
    }

    if (question === "What is your biggest skin concern?") {
      let recommendedProducts = skinConcernProducts[answer];
      app.innerHTML += `For your skin concern, we recommend: ${recommendedProducts.join(
        ", "
      )}<br>`;
    }
  }
}
