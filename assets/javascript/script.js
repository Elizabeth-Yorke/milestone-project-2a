// Wait for the DOM to finish loading before running the game.
// Get the button elements and add event listeners to them.

document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else if (this.getAttribute("data-type") === "reset") {
                location.reload();
            } else if (this.getAttribute("data-type") === "timer") {
                startTimer();   
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed.
 */

function runGame(gameType) {

    //Creates two random numbers between 1 and 12.
    let num1 = Math.floor(Math.random() * 11)+1;
    let num2 = Math.floor(Math.random() * 11)+1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtraction") {
        displaySubtractionQuestion(num1, num2);
    } else if (gameType === "multiplication") {
        displayMultiplicationQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`unknown game type: ${gameType}`);
        throw `unknown game type: ${gameType}. Aborting!`
    }

}


/**
 * Gets the answer from calculateCorrectAnswer()
 * Compares the users answer with the return from calculateCorrectAnswer()
 * Sends a Well Done! Alert if the answers match.
 * Sends a Better luck next time Alert if the answers don't match.
 */

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Correct answer! Well done! :D");
        incrementScore();
    } else {
        alert(`You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}. Better luck next time!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands and the operator directly from the DOM
 * Returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtraction"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiplication"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }

}

/**
 * Gets the current score from the DOM and adds 1.
 */

function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
	document.getElementById("operand2").textContent = operand1 < operand2 ? operand2 : operand1;
	document.getElementById("operator").textContent = "-";
}

function displayMultiplicationQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1*operand2;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "/";
}

/**
 * Timer to count down to 0.
 */

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            //timer = duration;
            alert("Your time is up!");
        }
    }, 1000);
}

/**
 * Novice Timer to start on click
 */

TimerDisplayNovice.onclick = function () {
    var time = 80, // time in seconds here
        display = document.querySelector('#TimerDisplayNovice');
    startTimer(time, display);
};

/**
 * Intermediate Timer to start on click
 */

TimerDisplayIntermediate.onclick = function () {
    var time = 40, // time in seconds here
        display = document.querySelector('#TimerDisplayIntermediate');
    startTimer(time, display);
};

/**
 * Advanced Timer to start on click
 */

TimerDisplayAdvanced.onclick = function () {
    var time = 20, // time in seconds here
        display = document.querySelector('#TimerDisplayAdvanced');
    startTimer(time, display);
};