
var containerEl = document.getElementById('header-container');

var headerEl = document.getElementById('quiz-header');

var infoEl = document.getElementById('quiz-info');

var highscoresEl = document.getElementById('highscores');

var timerEl = document.getElementById('countdown');
// var mainEl = document.getElementById('main');

var startEl = document.getElementById('start-quiz');

var quizHeaderContent = document.getElementById('quiz-header-content');
console.log(quizHeaderContent);

var quizInfoContent = document.getElementById('quiz-info-content');
console.log(quizInfoContent);
// var button = document.querySelector(".button");

startEl.addEventListener("click", function() {quizStart(); countdown();}, false);

var currentIndex = 0;
var timeLeft = 60;
var timeCaptured = 0;

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
        correctAnswer: 'b',
    },

    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers:  ['a', 'b', 'c', 'd'],
        questions: ['Numbers and strings', 'Other arrays', 'Booleans', 'All of the above'],
        correctAnswer: 'd',
    },

    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers:   ['a', 'b', 'c', 'd'],
        questions: ['Commas', 'Curly brackets', 'Quotes', 'Parentheses'],
        correctAnswer: 'c',
    },

    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
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

        var question = myQuestions[currentIndex];
        console.log(question);

        // replace header with question
        replaceHeader(question?.question);

        // create html list of questions from myQuestions
        var list = createList(question?.answers, question?.questions);
        

        // replace quiz-info with created html list
        infoEl.innerHTML = list.innerHTML;

        // asign list functionality
        assignListFunctionality(question?.answers, question?.questions);

        // iterating current index
        // currentIndex++;

        // remove quiz button
        if (startEl) {
            startEl.remove();
        }

}

function assignListFunctionality(answers,questions) {
    for (var i = 0; i < answers.length; i++) {
        let listItem = document.getElementById(answers[i]);
        listItem.addEventListener("click", function(event) {selectAnswer(event);}, false);
            
    }
}

function replaceHeader(question) {
    let newHeaderEl = document.createElement('h2');
    newHeaderEl.id = 'quiz-header-content';
    newHeaderEl.textContent = question; 
    quizHeaderContent.innerHTML = newHeaderEl.innerHTML;
}

function createList(answers, questions) {
    let newContainer = document.createElement('div');
    let newListUl = document.createElement('ol');
    newListUl.id = 'quiz-info-content';
    for (var i = 0; i < answers.length; i++) {
        let newListItem = document.createElement('li');
        newListItem.textContent = questions[i];
        // newListItem.addEventListener("click", function() {functionName();}, false);
        newListItem.id = answers[i];

        newListUl.appendChild(newListItem);

    }
    newContainer.appendChild(newListUl);
    return newContainer;
}

function selectAnswer(event) {
    var answer = myQuestions[currentIndex].correctAnswer;
    console.log(answer === event.target.id);

    if (answer === event.target.id) {
        console.log("i have correct answer");
        currentIndex++; 
        quizStart();
    } else {
        currentIndex++
        timeLeft = timeLeft - 10;
        console.log('time left now is', timeLeft);
        quizStart();
    }
}

function pageSubmission() {
    console.log("we are starting to replace content");
    // header change to All Done!
    replaceHeader('All done!');

    let newContainer = document.createElement('div');
    newContainer.id = 'quiz-info-content';

    // List final score in info
    let spanItem = document.createElement('span');
    spanItem.textContent = 'Your final score is ' + timeCaptured;
    newContainer.appendChild(spanItem);


    // Enter initials input box
    var form = createSubmissionForm();
    newContainer.appendChild(form);
    infoEl.innerHTML = newContainer.innerHTML;

}

function createSubmissionForm() {
    let form = document.createElement('form');
    form.method = "POST";

    let label = document.createElement('label');
    let span = document.createElement('span');
    span.textContent = 'Enter Initials:';
    
    let input = document.createElement('input');
    input.name = 'initials';


    label.appendChild(span);
    label.appendChild(input);
    form.appendChild(label);

    return form;
}

function countdown() {

  
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
        pageSubmission();
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