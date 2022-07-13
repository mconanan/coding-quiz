# coding-quiz
Module 4 Challenge; Create a coding quiz

On page load, user is greeted with a start button.
An .addEventListener on the start button calls startQuiz function. This hides the start button, exposes the question section, populates the question section with the first question, starts the timer, and calls the createAnswerButton function.

The createAnswerButton function creates a button for each answer of the current question. The answer buttons change to match the corresponding question. When an answer button is clicked, the checkAnswer function is called.

In the checkAnswer function, if clicked answer is correct, or "true", "Correct!" is displayed beneath the answer section, and the nextQuestion function is called. If the clicked answer is incorrect, or "false", 5 seconds are removed from the clock, "Incorrect!" is displayed, and the nextQuestion function is called.

The nextQuestion function increments the currentQuestionIndex to advance to the next question, and continues until the last question is reached. Once the last question is reached, the questions and answers are hidden, a restart button is displayed, along with the score (which is the number of seconds left), and a text input field to insert the user's initials to store to local memory. Once the user enters their initials and clicks submit, the last recorded score is retreived from local memory, and displayed next to "Last Score:". 

Once the restart button is clicked, the restartQuiz function is called, and the page is reloaded to being again.