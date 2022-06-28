var timerEl = document.getElementById('.countdown');
var mainEl = document.getElementById('main');

var button = document.querySelector(".button");

var currentIndex = 0;
const myQuestions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: {
                a:'Strings',
                b: 'B. Booleans', 
                c: 'Alerts', 
                d: 'Numbers', 
        },
        correctAnswer: '',

        question: 'The condition in an if/else statement is enclosed within _____.',
        answers: {
            a: 'Quotes', 
            b: 'Curly brackets', 
            c: 'Parenthesis', 
            d: 'Square brackets',
        },
        correctAnswer: 'c',

        question: 'Arrays in JavaScript can be used to store ____.',
        answers: {
            a: 'Numbers and strings', 
            b: 'Other arrays', 
            c: 'Booleans', 
            d: 'All of the above',
        },
        correctAnswer: 'c',

        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers: {
            a: 'Commas', 
            b: 'Curly brackets', 
            c: 'Quotes', 
            d: 'Parentheses',
        },
        correctAnswer: 'c',

        question: 'A veru useful tool used during development and debugging for printing content to the debugger is:',
        answers: {
            a: 'JavaScript', 
            b: 'Terminal/bash', 
            c: 'For loops', 
            d: 'Console.log',
        },
        correctAnswer: 'd',

    }
];

// button.addEventListener("click", function (quizStart){


// }
// );

function displayQuestion() {
    // var currentQuestion = questions[currentIndex];

    // Element.textContent = currentQuestion.question;
    }

function quizStart() {
    // var questionChoice = answer; 
    if ("click") {
        displayQuestion();
        countdown();
        // document.getElementById("quizStart").click();
        console.log();
        }
}

function countdown() {
    var timeLeft = 60;
  
    // TODO: Add a comment describing the functionality of the setInterval() method:
    var timeInterval = setInterval(function () {
      // TODO: Add comments describing the functionality of the `if` statement:
      if (timeLeft > 1) {
        timerEl.textContent = 'Time: ' + timeLeft;
        timeLeft--;
      } // TODO: Add comments describing the functionality of the `else if` statement:
      else if (timeLeft === 1) {
        timerEl.textContent = 'Time: ' + timeLeft;
        timeLeft--;
      } // TODO: Add comments describing the functionality of the `else` statement:
      else {
        timerEl.textContent = 'Time: 0';
        clearInterval(timeInterval);
        displayMessage();
      }
    }, 1000);
  }


// object.addEventListener("click", "keypress", function(event) {
//   event.preventDefault();

//   set new submission to local storage 
//   if ("click", event.key === "Enter") {
//     event.preventDefault();
//     document.getElementById("quizStart").click();
//     console.log();
//     }
//   localStorage.setItem(user)
  
// });

// function displayQuiz() {
//     var wordCount = 0;

//     var msgInterval = 
// }

quizStart();

// var results = {

// }
// localStorage.setItem(input, J)