let numberOne = "";
let numberTwo = "";
let mathOperation = "";

let lastKeyStroke = "";
let periodOperatorUsed = false;



/* - Buttons - */

const inputButtonListeners = function(event) {
    event.preventDefault();

    const keyStrokeTarget = event.target;
    const keyId = keyStrokeTarget.id;

    if (keyStrokeTarget.tagName == "BUTTON") {
        let periodSkipFlag = false;

        if (lastKeyStroke == "=") {
            numberOne = "";
        }
        if (keyId == ".") {
            if (periodOperatorUsed == false) {
                periodOperatorUsed = true;
            }
            else {
                periodSkipFlag = true;
            }
        }
        if (!periodSkipFlag) {
            if (mathOperation == "" && !periodSkipFlag) {
                numberOne = numberOne + keyId;
            }
            else {
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
        if (mathOperation == "") {
            mathOperation = keyId;
            periodOperatorUsed = false;
        }

        lastKeyStroke = keyId;

        renderScreen(keyId);
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