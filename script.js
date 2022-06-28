var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');

var currentIndex = 0;

var questions = [
    {
        question: 'What is...',
        answers: ['a', 'b', 'c', 'd'],
        answer: 'c',
    }
]

function displayQuestion() {
    var currentQuestion = questions[currentIndex];

    Element.textContent = currentQuestion.question;
}
function quizStart() {
    // var quiz-start 
    // if ("click") {
    //     displayQuestion();
    //     countdown();
    //     document.getElementById("quizStart").click();
    //     console.log();
    //     }
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
