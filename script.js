// Global elements
var containerEl = document.getElementById('header-container');

var headerEl = document.getElementById('quiz-header');

var infoEl = document.getElementById('quiz-info');

var highscoresEl = document.getElementById('highscores');

var timerEl = document.getElementById('countdown');

var startEl = document.getElementById('start-quiz');

var quizHeaderContent = document.getElementById('quiz-header-content');

var quizInfoContent = document.getElementById('quiz-info-content');

var footerEl = document.getElementsByClassName('footer');

var currentIndex = 0;
var timeLeft = 60;
var timeCaptured = 0;

// Questions and answers
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
        questions: ['1. JavaScript', '2. Terminal/bash', '3. For loops', '4. Console.log'],
        correctAnswer: 'd',
    }
    
];

// Start quiz activates on click and starts quizStart function
startEl.addEventListener("click", function() {quizStart(); countdown();}, false);

// Function activates quiz after start quiz button clicked
function quizStart() {

    if (currentIndex != myQuestions.length) {

        var question = myQuestions[currentIndex];
        console.log(question);

        // replace header with question
        replaceHeader(question?.question);

        // create html list of questions from myQuestions
        var list = createList(question?.answers, question?.questions);
        
        // replace quiz-info with created html list
        infoEl.innerHTML = list.innerHTML;

        // Assigns list functionality
        assignListFunctionality(question?.answers, question?.questions);

        // Removes start quiz button 
        if (startEl) {
            startEl.remove();
        }
    } else {
        timeCaptured = timeLeft;
        timeLeft = 0;
        pageSubmission();
    }
}

// Assigns functionality to answers list
function assignListFunctionality(answers,questions) {
    for (var i = 0; i < answers.length; i++) {
        let listItem = document.getElementById(answers[i]);
        listItem.addEventListener("click", function(event) {selectAnswer(event);}, false);
            
    }
}

// Replaces header with question
function replaceHeader(question) {
    let newHeaderEl = document.createElement('h2');
    newHeaderEl.id = 'quiz-header-content';
    newHeaderEl.textContent = question; 
    quizHeaderContent.innerHTML = newHeaderEl.innerHTML;
}

// Replaces quiz info with question list
function createList(answers, questions) {
    let newContainer = document.createElement('div');
    let newListUl = document.createElement('ol');
    newListUl.id = 'quiz-info-content';
    for (var i = 0; i < answers.length; i++) {
        let newListItem = document.createElement('li');
        newListItem.textContent = questions[i];
        newListItem.id = answers[i];
        newListUl.appendChild(newListItem);
    }
    newContainer.appendChild(newListUl);
    return newContainer;
}

// Activates event on answer selection, if correct moves on, if incorrect removes 10 seconds and moves on
function selectAnswer(event) {
    var answer = myQuestions[currentIndex].correctAnswer;

    if (answer === event.target.id) {
        currentIndex++; 
        setTimeout(function() { quizStart(); }, 500);
        correct();
    } else {
        currentIndex++
        timeLeft = timeLeft - 10;
        setTimeout(function() { quizStart(); }, 500);
        wrong();
    }
}

// If answer is correct, changes footer to correct
function correct(event) {
    document.querySelector('footer').innerHTML = "Correct!"
    setTimeout(function() {document.querySelector('footer').innerHTML = ''}, 500);
}

// If answer is wrong, changes footer to wrong
function wrong(event) {
    document.querySelector('footer').innerHTML = "Wrong!"
    setTimeout(function() {document.querySelector('footer').innerHTML = ''}, 500);
}

// Activates once last question is completed
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

    // Adds even handler for form submission
    document.getElementById('submit-button').addEventListener('click', formSubmission);
}

// Adds initials and score to local storage
function formSubmission(event) {
    event.preventDefault();
    var initialsInput = document.getElementById('initials-input');
    let localHighscores = JSON.parse(localStorage.getItem('highscores') || "[]"); 
    localHighscores.push({initials:initialsInput.value, time:timeCaptured});
    
    // Sorts the high scores
    localHighscores.sort((a,b) => (b.time - a.time));
    
    localStorage.setItem('highscores', JSON.stringify(localHighscores));

    // Moves to Highscores page
    renderHighscoresView();
}

// This function creates the submission page for entering initials for highscore
function createSubmissionForm() {

    // Adds div, label, span, and input
    let div = document.createElement('div');
    div.id = "quiz-form";

    let label = document.createElement('label');
    let span = document.createElement('span');
    span.textContent = 'Enter Initials:';
    
    let input = document.createElement('input');
    input.name = 'initials';
    input.type = 'text';
    input.id = 'initials-input'

    let submitInput = document.createElement('div');
    submitInput.innerHTML = '<button type="submit" id="submit-button" value="submit">Submit</button>';

    // Adds child to parents
    label.appendChild(span);
    label.appendChild(input);
    div.appendChild(submitInput);
    div.appendChild(label);

    return div;
}

// Creates highscores page
function renderHighscoresView() {
    // Changes header to Highscores
    replaceHeader('Highscores');

    // Lists highscores
    var scores = createHighscoresList();
    infoEl.innerHTML = scores.innerHTML;

    // Creates clear highscores button to remove from local storage
    document.getElementById('clear-highscores-button').addEventListener('click', function(event){
        localStorage.removeItem('highscores');
        location.reload();
    })

    // Creates back button
    document.getElementById('back-button').addEventListener('click', function(event){
        location.reload();
    });

    // Removes start quiz button from highscores page
    if (startEl) {
        startEl.remove();
    }
}

// Timer countdown function
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

// Creates highscores list on highscores page
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

    // Creates button for back button
    let backButton = document.createElement('div');
    backButton.innerHTML = '<button type="submit" id="back-button" value="submit">Go Back</button>';
    
    // Creates button for submit button
    let clearHighscores = document.createElement('div');
    clearHighscores.innerHTML = '<button type="submit" id="clear-highscores-button" value="submit">Clear Highscores</button>';

    // Appends children to parents
    newContainer.appendChild(newListUl);
    newContainer.appendChild(backButton);
    newContainer.appendChild(clearHighscores);

    return newContainer;
}
