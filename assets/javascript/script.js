// Wait for the DOM to finish loading before running the game.

/**
 * Gets the button elements.
 * Adds event listeners to them.
 * Assigns functions according to button data-type.
 */

document.addEventListener("DOMContentLoaded", function(){
    let clickOns = document.getElementsByClassName("clickOn");

    for (let clickOn of clickOns){
        clickOn.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else if (this.getAttribute("data-type") === "reset") {
                location.reload();
            } else if (this.getAttribute("data-type") === "timer") {
                startTimer(); 
            } else {
                let operation = this.getAttribute("data-type");
                runGame(operation);
            }
        })
    }

})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed.
 */

function runGame(operation) {

    //Creates two random numbers between 1 and 12.
    let firstNumber = Math.floor(Math.random() * 11)+1;
    let secondNumber = Math.floor(Math.random() * 11)+1;

    if (operation === "addition") {
        additionQuestion(firstNumber, secondNumber);
    } else if (operation === "subtraction") {
        subtractionQuestion(firstNumber, secondNumber);
    } else if (operation === "multiplication") {
        multiplicationQuestion(firstNumber, secondNumber);
    } else if (operation === "division") {
        divisionQuestion(firstNumber, secondNumber);
    } else {
        alert(`unknown operation: ${operation}`);
        throw `unknown operation: ${operation}.`
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
    let userRight = userAnswer === calculatedAnswer[0];

    if (userRight) {
        alert("Correct answer! Well done! :D");
        increaseScore();

    } else {
        alert(`You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}. Better luck next time!`);
        increaseWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands and the operator directly from the DOM
 * Returns the correct answer
 */

function calculateCorrectAnswer() {
    let partA = parseInt(document.getElementById('partA').innerText);
    let partB = parseInt(document.getElementById('partB').innerText);
    let symbol = document.getElementById('symbol').innerText;

    if (symbol === "+") {
        return [partA + partB, "addition"];
    } else if (symbol === "-") {
        return [partA - partB, "subtraction"];
    } else if (symbol === "x") {
        return [partA * partB, "multiplication"];
    } else if (symbol === "/") {
        return [partA / partB, "division"];
    } else {
        alert(`Didn't recognise ${symbol} symbol.`);
        throw `didn't recoginise ${symbol} symbol. Aborting!`;
    }

}

/**
 * Gets the current score from the DOM and adds 1.
 */

function increaseScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */

function increaseWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

/**
 * Displays addition questions.
 */

function additionQuestion(partA, partB) {
    document.getElementById('partA').textContent = partA;
    document.getElementById('partB').textContent = partB;
    document.getElementById('symbol').textContent = "+";
}

/**
 * Displays subtraction questions.
 */

function subtractionQuestion(partA, partB) {
    document.getElementById("partA").textContent = partA > partB ? partA : partB;
	document.getElementById("partB").textContent = partA < partB ? partB : partA;
	document.getElementById("symbol").textContent = "-";
}

/**
 * Displays multiplication questions.
 */

function multiplicationQuestion(partA, partB) {
    document.getElementById('partA').textContent = partA;
    document.getElementById('partB').textContent = partB;
    document.getElementById('symbol').textContent = "x";
}

/**
 * Displays division questions.
 */

function divisionQuestion(partA, partB) {
    document.getElementById('partA').textContent = partA*partB;
    document.getElementById('partB').textContent = partB;
    document.getElementById('symbol').textContent = "/";
}

/**
 * Timer to counts down to 0.
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
            alert("Your time is up!");
            location.reload();
        }
    }, 1000);
}

/**
 * Novice Timer to start at 80seconds on click
 */

timerDisplayNovice.onclick = function () {
    var time = 80, // time in seconds here
        display = document.querySelector('#timerDisplayNovice');
    startTimer(time, display);
};

/**
 * Intermediate Timer to start at 40 seconds on click
 */

timerDisplayIntermediate.onclick = function () {
    var time = 40, // time in seconds here
        display = document.querySelector('#timerDisplayIntermediate');
    startTimer(time, display);
};

/**
 * Advanced Timer to start at 20 seconds on click
 */

timerDisplayAdvanced.onclick = function () {
    var time = 20, // time in seconds here
        display = document.querySelector('#timerDisplayAdvanced');
    startTimer(time, display);
};