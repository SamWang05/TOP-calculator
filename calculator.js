let numberOne = "";
let numberTwo = "";
let mathOperation = "";
let mathResult = "";

let lastKeyStroke = "";



/* - Buttons - */

function initializeInputButtons() {
    const inputButtonsNode = document.querySelector(".inputButtons");

    inputButtonsNode.addEventListener("click", (event) => {
        event.preventDefault();

        const keyStrokeTarget = event.target;
        const keyId = keyStrokeTarget.id;

        if (keyStrokeTarget.tagName == "BUTTON") {
            if (isNaN(lastKeyStroke) && mathOperation == ""){
                numberOne = "";
            }
            if (mathOperation == "") {
                numberOne = numberOne + keyId;
            }
            else {
                numberTwo = numberTwo + keyId;
            }

            lastKeyStroke = keyId;

            renderScreen(keyId);
        }
    });
}

function initializeOperationsButtons() {
    const operationsButtonsNode = document.querySelector(".operationsButtons");

    operationsButtonsNode.addEventListener("click", (event) => {
        event.preventDefault();

        const keyStrokeTarget = event.target;
        const keyId = keyStrokeTarget.id;

        if (keyStrokeTarget.tagName == "BUTTON") {
            if (mathOperation == "") {
                mathOperation = keyId;
            }

            lastKeyStroke = keyId;

            renderScreen(keyId);
        }
    });
}

function initializeUtilityButtons() {
    const utilityButtonsNode = document.querySelector(".utilityButtons");

    utilityButtonsNode.addEventListener("click", (event) => {
        event.preventDefault();

        const keyStrokeTarget = event.target;
        const keyId = keyStrokeTarget.id;

        if (keyStrokeTarget.tagName == "BUTTON") {

            if (keyStrokeTarget.id == "=") {
                mathResult = mathOperate(mathOperation, numberOne, numberTwo);
                renderScreen("");
            }

            lastKeyStroke = keyId;
        }
    });
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
    return num1 + num2;
}

function subNums(num1, num2) {
    return num1 - num2;
}

function multNums(num1, num2) {
    return num1 * num2;
}

function divNums(num1, num2) {
    return num1 / num2;
}

function mathOperate(mathOperator, number1, number2) {
    let mathOutput;

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

    numberOne = mathOutput;
    mathResult = mathOutput;
    numberTwo = "";
    mathOperation = "";

    return mathOutput;
}



/* - Main - */

function main() {
    initializeButtons();
}

main();