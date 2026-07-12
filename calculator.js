/* - Global Variables - */

let numberOne = "";
let numberTwo = "";
let mathOperation = "";

let lastKeyStroke = ""; /* flag to identify last key stroke, useful for certain logical decisions */
let periodOperatorUsed = false; /* flag to identify if decimal operator was used when entering the current number */
let skipFlag = false; /* useful for breaking out of listener sequence if a bad input is pressed */

const allowedNumericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const allowedOperationKeys = ['+', '-', '*', '/'];
const allowedUtilityKeys = ["Delete", "Backspace", "=", "Enter"];



/* - Buttons - */

const inputButtonListeners = function(event) {
    event.preventDefault();

    const keyStrokeTarget = event.target;
    let keyId;
    
    if (event instanceof MouseEvent) {keyId = keyStrokeTarget.id;} /* if the event is a mouse event, keyId is defined using mouse event logic */
    else if (event instanceof KeyboardEvent) {
        if (allowedNumericKeys.includes(event.key)){keyId = event.key;} /* if the event is a keyboard event, and the key is a valid key, define keyId using keyboard event logic */
        else {skipFlag = true;}
    }
    
    if (keyStrokeTarget.tagName == "BUTTON" || event instanceof KeyboardEvent) { /* prevent non-button targets from triggering logic (Ex: the background <div>) */
        if (lastKeyStroke == "=") { /* if the last operator was an equals sign, and our next input is a keypad entry, it means we must be starting a new equation */
            numberOne = "";
        }
        if (keyId == ".") { /* logic to identify if period operator is being misused (pressed repeatedly) */
            if (periodOperatorUsed == false) {
                periodOperatorUsed = true;
            }
            else {
                skipFlag = true;
            }
        }
        if (!skipFlag) {
            if (mathOperation == "" && !skipFlag) { /* if mathOperation is an empty string, it means we are currently looking to retrieve the user's first number, since the expected order of inputs is: num1 > operator > num2 */
                numberOne = numberOne + keyId;
            }
            else { /* if mathOperation is not empty, it means we have a valid operator, and need the second number. For example, the prepared list of inputs may be: < 92 + ?? > */
                numberTwo = numberTwo + keyId;
            }

            lastKeyStroke = keyId;

            renderScreen(keyId);
        }
        skipFlag = false;
    }
}

function initializeInputButtons() {
    const inputButtonsNode = document.querySelector(".inputButtons");

    inputButtonsNode.addEventListener("click", inputButtonListeners);
    document.addEventListener("keyup", inputButtonListeners);
}

const operationsButtonsListeners = function(event) {
    event.preventDefault();

    const keyStrokeTarget = event.target;
    let keyId;
    
    if (event instanceof MouseEvent) {keyId = keyStrokeTarget.id;}
    else if (event instanceof KeyboardEvent) {
        if (allowedOperationKeys.includes(event.key)){keyId = event.key;}
        else {skipFlag = true;}
    }

    if (keyStrokeTarget.tagName == "BUTTON" || event instanceof KeyboardEvent) {
        if (mathOperation == "" && !skipFlag) { /* if a math operator (+/-/×/÷) was not yet inputted, we will accept. Otherwise, simply ignore. */
            mathOperation = keyId;
            periodOperatorUsed = false; /* Once the math operator is inputted, it means that we will be expecting a new number (num2). Therefore, we can unlock the period button for use again.*/

            lastKeyStroke = keyId;

            renderScreen(keyId);
        }

        skipFlag = false;
    }
}

function initializeOperationsButtons() {
    const operationsButtonsNode = document.querySelector(".operationsButtons");

    operationsButtonsNode.addEventListener("click", operationsButtonsListeners);
    document.addEventListener("keyup", operationsButtonsListeners);
}

const utilityButtonListeners = function(event) {
    event.preventDefault();

    const keyStrokeTarget = event.target;
    let keyId;
    
    if (event instanceof MouseEvent) {keyId = keyStrokeTarget.id;}
    else if (event instanceof KeyboardEvent) {
        if (allowedUtilityKeys.includes(event.key)){keyId = event.key;}
        else {skipFlag = true;}
    }

    if (keyStrokeTarget.tagName == "BUTTON" || event instanceof KeyboardEvent) {
        if ((keyId == "=" || keyId == "Enter") && !skipFlag) { /* if the '=' button was pressed, initiate the operation with the given values */
            mathOperate(mathOperation, numberOne, numberTwo);
            renderScreen(""); /* clears the "current input" (which would be '=') so the final output screen is only one line */
        }
        else if ((keyId == "Delete" || keyId == "Backspace") && !skipFlag) {
            clearAll();
            renderScreen("");
        }

        lastKeyStroke = keyId;

        skipFlag = false;
    }
}

function initializeUtilityButtons() {
    const utilityButtonsNode = document.querySelector(".utilityButtons");

    utilityButtonsNode.addEventListener("click", utilityButtonListeners);
    document.addEventListener("keyup", utilityButtonListeners);
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

    currentNumberNode.textContent = string; /* Outputs to the top of the output screen */
    outputScreenNode.textContent = numberOne + " " + mathOperation + " " + numberTwo;  /* Since each variable has a value of "" by default, this string dynamically updates as inputs are added, without complex logic */
}



/* - Calculations - */

function addNums(num1, num2) {
    return Number((Number(num1) + Number(num2)).toFixed(10));  /* Limits decimal to 10 trailing figures, for brevity */
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

    if (number2 == "" && mathOperator == "") mathOutput = "";  /* If only the first number was inputted and then the "=" button is pressed, output is null and system resets */

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

function clearAll() { /* Purges all globals, start fresh with blank slate */
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