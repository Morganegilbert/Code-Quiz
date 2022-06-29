console.log(document);

var containerEl = document.getElementById('header-container');
console.log(containerEl);

var headerEl = document.getElementById('quiz-header');
console.log('this is my header', headerEl);

// var infoEl = document.getElementById('quiz-info');
// console.log(infoEl);

var highscoresEl = document.getElementById('highscores');
console.log(highscoresEl);

var timerEl = document.getElementById('countdown');
// var mainEl = document.getElementById('main');
console.log(timerEl);

var startEl = document.getElementById('start-quiz');
console.log(startEl);

// var button = document.querySelector(".button");

startEl.addEventListener("click", function() {quizStart(); }, false);

var currentIndex = 0;
var myQuestions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: ['a', 'b', 'c', 'd'],
        questions: ['Strings','Booleans', 'Alerts', 'Numbers'],
        correctAnswer: 'c',
    },

    {
        question: 'The condition in an if/else statement is enclosed within _____.',
        answers:  ['a', 'b', 'c', 'd'],
        questions: ['Quotes', 'Curly brackets', 'Parenthesis', 'Square brackets'],
        correctAnswer: 'c',
    },

    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers:  ['a', 'b', 'c', 'd'],
        questions: ['Numbers and strings', 'Other arrays', 'Booleans', 'All of the above'],
        correctAnswer: 'c',
    },

    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers:   ['a', 'b', 'c', 'd'],
        questions: ['Commas', 'Curly brackets', 'Quotes', 'Parentheses'],
        correctAnswer: 'c',
    },

    {
        question: 'A veru useful tool used during development and debugging for printing content to the debugger is:',
        answers:   ['a', 'b', 'c', 'd'],
        questions: ['JavaScript', 'Terminal/bash', 'For loops', 'Console.log'],
        correctAnswer: 'd',
    }
    
];

// startEl.addEventListener("click", function (){
//     countdown();
// }
// );

// startEl.onclick = function() {
//     countdown();
//     console.log("great...");
// }

function displayQuestion() {
    var currentQuestion = myQuestions[currentIndex];

    Element.textContent = currentQuestion.myQuestions;
}

function quizStart() {
    // var questionChoice = answer; 
    console.log(myQuestions);
    console.log(currentIndex)

        var question = myQuestions[currentIndex];
        console.log(question)

        // replace header with question
        replaceHeader(question?.question);

        // create html list of questions from myQuestions


        // replace quiz-info with created html list

        // iterating current index
}

function replaceHeader(question) {
    let newHeaderEl = document.createElement('h2')
    newHeaderEl.textContent = question; 
    headerEl.replaceWith(newHeaderEl);

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

// quizStart();

// var results = {

// }
// localStorage.setItem(input, J)