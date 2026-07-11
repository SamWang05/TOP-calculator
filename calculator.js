/* - Global Variables - */

let numberOne = "";
let numberTwo = "";
let mathOperation = "";

let lastKeyStroke = ""; /* flag to identify last key stroke, useful for certain logical decisions */
let periodOperatorUsed = false; /* flag to identify if decimal operator was used when entering the current number */



/* - Buttons - */

const inputButtonListeners = function(event) {
    event.preventDefault(); /* prevent mouse from highlighting accidentally */

    const keyStrokeTarget = event.target;
    const keyId = keyStrokeTarget.id;

    if (keyStrokeTarget.tagName == "BUTTON") { /* prevent non-button targets from triggering logic (Ex: the background <div>) */
        let periodSkipFlag = false;

        if (lastKeyStroke == "=") { /* if the last operator was an equals sign, and our next input is a keypad entry, it means we must be starting a new equation */
            numberOne = "";
        }
        if (keyId == ".") { /* logic to identify if period operator is being misused (pressed repeatedly) */
            if (periodOperatorUsed == false) {
                periodOperatorUsed = true;
            }
            else {
                periodSkipFlag = true;
            }
        }
        if (!periodSkipFlag) {
            if (mathOperation == "" && !periodSkipFlag) { /* if mathOperation is an empty string, it means we are currently looking to retrieve the user's first number, since the expected order of inputs is: num1 > operator > num2 */
                numberOne = numberOne + keyId;
            }
            else { /* if mathOperation is not empty, it means we have a valid operator, and need the second number. For example, the prepared list of inputs may be: < 92 + ?? > */
                numberTwo = numberTwo + keyId;
            }

            lastKeyStroke = keyId;

            renderScreen(keyId);
        }
    }
}

function initializeInputButtons() {
    const inputButtonsNode = document.querySelector(".inputButtons");

    inputButtonsNode.addEventListener("click", inputButtonListeners);
}

const operationsButtonsListeners = function(event) {
    event.preventDefault();

    const keyStrokeTarget = event.target;
    const keyId = keyStrokeTarget.id;

    if (keyStrokeTarget.tagName == "BUTTON") {
        if (mathOperation == "") { /* if a mathOperation was not yet inputted, we will accept. Otherwise, simply ignore. */
            mathOperation = keyId;
            periodOperatorUsed = false;


            lastKeyStroke = keyId;

            renderScreen(keyId);
        }
    }
}

function initializeOperationsButtons() {
    const operationsButtonsNode = document.querySelector(".operationsButtons");

    operationsButtonsNode.addEventListener("click", operationsButtonsListeners);
}

const utilityButtonListeners = function(event) {
    event.preventDefault();

    const keyStrokeTarget = event.target;
    const keyId = keyStrokeTarget.id;

    if (keyStrokeTarget.tagName == "BUTTON") {
        if (keyId == "=") {
            mathOperate(mathOperation, numberOne, numberTwo);
            renderScreen("");
        }
        else if (keyId == "clearAll") {
            clearAll();
            renderScreen("");
        }

        lastKeyStroke = keyId;
    }
}

function initializeUtilityButtons() {
    const utilityButtonsNode = document.querySelector(".utilityButtons");

    utilityButtonsNode.addEventListener("click", utilityButtonListeners);
}

function initializeButtons() {
    initializeInputButtons();
    initializeOperationsButtons();
    initializeUtilityButtons();
}



/* - Screen - */

function renderScreen(string) {
    const currentNumberNode = document.querySelector(".currentNumber");
    const outputScreenNode = document.querySelector(".outputText");

    currentNumberNode.textContent = string;
    outputScreenNode.textContent = numberOne + " " + mathOperation + " " + numberTwo;
}



/* - Calculations - */

function addNums(num1, num2) {
    return Number((Number(num1) + Number(num2)).toFixed(10));
}

function subNums(num1, num2) {
    return Number((Number(num1) - Number(num2)).toFixed(10));
}

function multNums(num1, num2) {
    return Number((Number(num1) * Number(num2)).toFixed(10));
}

function divNums(num1, num2) {
    return Number((Number(num1) / Number(num2)).toFixed(10));
}

function mathOperate(mathOperator, number1, number2) {
    let mathOutput;

    if (number2 == "" && mathOperator == "") mathOutput = "";

    else {
        if (mathOperator == "+") {
            mathOutput = String(addNums(number1, number2));
        }
        if (mathOperator == "-") {
            mathOutput = String(subNums(number1, number2));
        }
        if (mathOperator == "*") {
            mathOutput = String(multNums(number1, number2));
        }
        if (mathOperator == "/") {
            mathOutput = String(divNums(number1, number2));
        }
    }

    clearAll();

    numberOne = mathOutput;
}

function clearAll() {
    numberOne = "";
    numberTwo = "";
    mathOperation = "";

    lastKeyStroke = "";
    periodOperatorUsed = false;
}



/* - Main - */

function main() {
    initializeButtons();
}

main();