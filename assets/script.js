var timer = document.getElementById("timer")
var timeInterval;
var timeLeft = 60

var startButton = document.getElementById("start-button")
var questionSection = document.getElementById("questions-container")
var questionHere = document.getElementById("question-here")
var answersSection = document.getElementById("answers-section")

var correctIncorrect = document.getElementById("correct-incorrect")
var restartButton = document.getElementById("restart-btn")
var resultsSection = document.getElementById("results-section")
var theEnd = document.getElementById("the-end")
var submitButton = document.getElementById("submit-button")
var initials = document.getElementById("initials")
var lastScore = document.getElementById("last-score")

var currentQuestionIndex;
var questions = [
    {
        q: "What is one way to get HTML elements from the DOM for use in JavaScript?",
        answers: [
            { a: "console.log()", isCorrect: false },
            { a: "An array", isCorrect: false },
            { a: "document.querySelector", isCorrect: true },
            { a: "Setting a timer", isCorrect: false }
        ]
    }
    ,
    {
        q: "What is the difference between =, ==, and ===?",
        answers: [
            { a: "A single = assigns a variable, a == compares values, a === compares values but does not allow for type coersion.", isCorrect: true },
            { a: "They are different letters in Morse Code.", isCorrect: false },
            { a: "A single = is used in JavaScript, a == is used in CSS, and a === is used in HTML.", isCorrect: false },
            { a: "A single = compares value, a == compares value but does not allow for type conversion, a === assigns a variable.", isCorrect: false }
        ]
    }
    ,
    {
        q: "Which of these is not a primitive date type?",
        answers: [
            { a: "Boolean", isCorrect: false },
            { a: "String", isCorrect: false },
            { a: "Number", isCorrect: false },
            { a: "Array", isCorrect: true }
        ]
    }
    ,
    {
        q: "What does it mean to concatonate something?",
        answers: [
            { a: "To do something with a cat", isCorrect: false },
            { a: "To link together in a chain or series", isCorrect: true },
            { a: "To emphasize something", isCorrect: false },
            { a: "To place something in quotation marks", isCorrect: false }
        ]
    }
    ,
    {
        q: "What is one way to place sibling sections side by side in CSS?",
        answers: [
            { a: "display: flex; display: block", isCorrect: false },
            { a: "align-items: center", isCorrect: false },
            { a: "display: flex; justify-content: space-between", isCorrect: true },
            { a: "::before ::after", isCorrect: false }
        ]
    }
]

function startTimer() {


    // Use the "setInterval()" method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
        // As long as the "timeLeft" is greater than 1
        if (timeLeft > 1) {
            // Set text contents of "timer" to show timeLeft
            timer.textContent = timeLeft
            // Decrement "timeLeft" by 1
            timeLeft--;
        }
        else {
            // Once "timeLeft" gets to 0, set "timer" to an empty string
            timer.textContent = '';
            // Use clearInterval() to stop the timer
            clearInterval(timeInterval);
            // Restart quiz
            restartQuiz()

        }
    }, 1000);
}


//starts quiz
startButton.addEventListener("click", startQuiz)

//restarts quiz
restartButton.addEventListener("click", restartQuiz)

submitButton.addEventListener("click", submitQuiz)
    function submitQuiz(){ 
    var initialsValue = initials.value;
    // var highScores = JSON.parse(localStorage.getItem("highScores"));
    var savedScore = {
        score: timeLeft,
        initials: initialsValue
    }
    // highScores.push(savedScore);
    localStorage.setItem("savedScore", JSON.stringify(savedScore))

        
    // var savingInitials = localStorage.setItem("initials", JSON.stringify(initialsValue));
    // var savingScores = localStorage.setItem("score", JSON.stringify(timeLeft))
    // localStorage.setItem("score", JSON.stringify(timeLeft));
    // lastScore.innerText = "Last score:" + JSON.parse(localStorage.getItem(savingInitials, savingScores ))
    lastScore.innerText = "Last score:" + localStorage.getItem("savedScore")
    }

//On clicking start button, start button is hidden and question container is revealed; the question here element is populated with the current question, and buttons are created for each answer; the timer is started. 
function startQuiz() {
    console.log("start", questions.length)
    startButton.classList.add("hide")
    questionSection.classList.remove("hide")
    currentQuestionIndex = 0;
    questionHere.innerText = questions[currentQuestionIndex].q;

    createAnswerButton()
    startTimer()

}


//function to create the answer buttons for the answers of each question
function createAnswerButton() {
    answersSection.innerHTML = '';
    questions[currentQuestionIndex].answers.forEach(answer => {
        var answerButton = document.createElement("button")
        answerButton.innerText = answer.a;
        answerButton.onclick = checkAnswer;
        answerButton.setAttribute("data-isCorrect", answer.isCorrect);
        answersSection.appendChild(answerButton);
    });
}

//when an answer button is clicked, if it is correct, display "correct", increment the score, and run nextQuestion function to move to next question. If incorrect answer is clicked, display "incorrect", move to next question, but do no increment score.
function checkAnswer(e) {
    e.preventDefault()
    var clickedAnswer = e.target;
    var isCorrectValue = clickedAnswer.getAttribute('data-isCorrect')
    if (isCorrectValue === "true") {
        console.log("test");
        correctIncorrect.innerHTML = "Correct!";
        nextQuestion();


    }
    else {
        timeLeft = timeLeft - 5;
        correctIncorrect.innerHTML = "Incorrect!"
        nextQuestion();
    }

}

//to increment to the next question
function nextQuestion() {
    currentQuestionIndex++
    questionHere.innerHTML = ''
    console.log('current question index', currentQuestionIndex)
    if (currentQuestionIndex >= questions.length) {
        theEnd.classList.remove("hide");
        resultsSection.textContent = 'Your Score:' + timeLeft;
        timer.textContent = timeLeft;
        questionSection.classList.add("hide");
        answersSection.classList.add("hide");
        clearInterval(timeInterval);
    }
    else {
        questionHere.innerText = questions[currentQuestionIndex].q
        createAnswerButton()
    }

}

//restartQuiz function to run if timer reaches 0, or at end of quiz.     
function restartQuiz() {
    location.reload()
    



}

