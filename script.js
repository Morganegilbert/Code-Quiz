
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

var footerEl = document.getElementsByClassName('footer');

startEl.addEventListener("click", function() {quizStart(); countdown();}, false);

var currentIndex = 0;
var timeLeft = 60;
var timeCaptured = 0;
// localStorage.setItem('highscores', JSON.stringify([]));

var myQuestions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: ['a', 'b', 'c', 'd'],
        questions: ['1. Strings','2. Booleans', '3. Alerts', '4. Numbers'],
        correctAnswer: 'c',
    },

    {
        question: 'The condition in an if/else statement is enclosed within _____.',
        answers:  ['a', 'b', 'c', 'd'],
        questions: ['1. Quotes', '2. Curly brackets', '3. Parenthesis', '4. Square brackets'],
        correctAnswer: 'b',
    },

    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers:  ['a', 'b', 'c', 'd'],
        questions: ['1. Numbers and strings', '2. Other arrays', '3. Booleans', '4. All of the above'],
        correctAnswer: 'd',
    },

    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers:   ['a', 'b', 'c', 'd'],
        questions: ['1. Commas', '2. Curly brackets', '3. Quotes', '4. Parentheses'],
        correctAnswer: 'c',
    },

    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers:   ['a', 'b', 'c', 'd'],
        questions: ['1. JavaScript', '2. erminal/bash', '3. For loops', '4. Console.log'],
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

    if (currentIndex != myQuestions.length) {

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
    } else {
        timeCaptured = timeLeft;
        timeLeft = 0;
        pageSubmission();

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
        setTimeout(function() { quizStart(); }, 500);
        correct();
    } else {
        currentIndex++
        timeLeft = timeLeft - 10;
        console.log('time left now is', timeLeft);
        setTimeout(function() { quizStart(); }, 500);
        wrong();
    }
}

function correct(event) {
    // let footerEl = document.createElement('footer');   
    document.querySelector('footer').innerHTML = "Correct!"
    setTimeout(function() {document.querySelector('footer').innerHTML = ''}, 500);
    // footer.name = ('Correct!');
    // footer.id = ('answer-result');
    console.log("This is footer? correct", footerEl);
}

function wrong(event) {
    // let footerEl = document.createElement('footer');
    document.querySelector('footer').innerHTML = "Wrong!"
    setTimeout(function() {document.querySelector('footer').innerHTML = ''}, 500);

    // footer.name = ('Wrong!');
    // footer.id = ('answer-result');
    // footer.innerHTML = '<button type="submit" id="submit-button" value="submit">Submit</button>';
    console.log("This is footer? wrong", footerEl);

}

function pageSubmission() {
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

    // add even handler for form submission
    document.getElementById('submit-button').addEventListener('click', formSubmission);
}

function formSubmission(event) {
    event.preventDefault();
    var initialsInput = document.getElementById('initials-input');
    // console.log("This is initialInput", initialsInput.value);
    // console.log("This is the form event", event);
    let localHighscores = JSON.parse(localStorage.getItem('highscores') || "[]"); 
    localHighscores.push({initials:initialsInput.value, time:timeCaptured});
    console.log("here are the highscores", localHighscores);
    
    // Not sure if sort will work
    localHighscores.sort((a,b) => (b.time - a.time));
    
    localStorage.setItem('highscores', JSON.stringify(localHighscores));

    // Update to high scores view
    renderHighscoresView();
}

function createSubmissionForm() {
    let div = document.createElement('div');
    div.id = "quiz-form";
    // form.method = "POST";

    let label = document.createElement('label');
    let span = document.createElement('span');
    span.textContent = 'Enter Initials:';
    
    let input = document.createElement('input');
    input.name = 'initials';
    input.type = 'text';
    input.id = 'initials-input'

    let submitInput = document.createElement('div');
    submitInput.innerHTML = '<button type="submit" id="submit-button" value="submit">Submit</button>';
    // submitInput.type = 'submit';
    // submitInput.value = 'submit';
    // submitInput.id = 'submit-button';
 
    // submitInput.value = 'Submit';

    label.appendChild(span);
    label.appendChild(input);
    div.appendChild(submitInput);
    div.appendChild(label);

    
    return div;
}

function renderHighscoresView() {
    // update header
    replaceHeader('Highscores');

    //list high scores
    var scores = createHighscoresList();
    infoEl.innerHTML = scores.innerHTML;
    document.getElementById('clear-highscores-button').addEventListener('click', function(event){
        localStorage.removeItem('highscores');
        location.reload();

    })

    document.getElementById('back-button').addEventListener('click', function(event){
        location.reload();
    });
    if (startEl) {
        startEl.remove();
    }
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

function createHighscoresList() {
    let newContainer = document.createElement('div');
    let newListUl = document.createElement('ol');
    newListUl.id = 'quiz-info-content';
    let localHighscores = JSON.parse(localStorage.getItem('highscores') || "[]"); 

    for (var i = 0; i < localHighscores.length; i++) {
        let newListItem = document.createElement('li');
        newListItem.textContent = localHighscores[i].initials + '-' + localHighscores[i].time;
        // newListItem.addEventListener("click", function() {functionName();}, false);

        newListUl.appendChild(newListItem);

    }
    let backButton = document.createElement('div');
    backButton.innerHTML = '<button type="submit" id="back-button" value="submit">Go Back</button>';
    // backButton.value = 'Go Back';
    
    let clearHighscores = document.createElement('div');
    clearHighscores.innerHTML = '<button type="submit" id="clear-highscores-button" value="submit">Clear Highscores</button>';
    // clearHighscores.value = 'Clear Highscores';

    newContainer.appendChild(newListUl);
    newContainer.appendChild(backButton);
    newContainer.appendChild(clearHighscores);

    return newContainer;
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