function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "⚡ WARNING! You've opened a portal to the Upside Down. Division by zero is not allowed! 👾";
    }
    return a / b;
}

function operate(operator, a, b) {
    const numA = Number(a);
    const numB = Number(b);

    switch (operator) {
        case "+":
            return add(numA, numB);
        case "-":
            return subtract(numA, numB);
        case "*":
            return multiply(numA, numB);
        case "/":
            return divide(numA, numB);
        default:
            return numB;
    }
}

let firstOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;
let currentInput = "0";
let shouldResetScreen = false;


function roundResult(num) {
    if (typeof num !== "number" || Number.isNaN(num)) {
        return num;
    }
    return Math.round((num + Number.EPSILON) * 100000000) / 100000000;
}

function getOperatorSymbol(op) {
    if (op === "*") return "×";
    if (op === "/") return "÷";
    if (op === "-") return "−";
    return op;
}

const previousOperandDisplay = document.getElementById("previous-operand");
const currentOperandDisplay = document.getElementById("current-operand");
const keypad = document.querySelector(".keypad");

function updateDisplay() {
    currentOperandDisplay.textContent = currentInput;

    if (firstOperand !== null && currentOperator !== null) {
        previousOperandDisplay.textContent = `${roundResult(firstOperand)} ${getOperatorSymbol(currentOperator)}`;
    } else {
        previousOperandDisplay.textContent = "";
    }
}

function inputDigit(digit) {
    if (shouldResetScreen || currentInput === "⚡ WARNING! You've opened a portal to the Upside Down. Division by zero is not allowed! 👾") {
        currentInput = digit;
        shouldResetScreen = false;
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }

    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === "0" ? digit : currentInput + digit;
    }

    updateDisplay();
}

function inputDecimal() {
    if (shouldResetScreen || currentInput === "⚡ WARNING! You've opened a portal to the Upside Down. Division by zero is not allowed! 👾") {
        currentInput = "0.";
        shouldResetScreen = false;
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }

    if (waitingForSecondOperand) {
        currentInput = "0.";
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }

  
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}

function handleOperator(nextOperator) {
    if (currentInput === "⚡ WARNING! You've opened a portal to the Upside Down. Division by zero is not allowed! 👾") {
        return;
    }

    shouldResetScreen = false;

    const inputValue = parseFloat(currentInput);
    if (currentOperator && waitingForSecondOperand) {
        currentOperator = nextOperator;
        updateDisplay();
        return;
    }

    if (firstOperand === null && !Number.isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (currentOperator) {
        const result = operate(currentOperator, firstOperand, inputValue);

        if (result === "⚡ WARNING! You've opened a portal to the Upside Down. Division by zero is not allowed! 👾") {
            currentInput = result;
            firstOperand = null;
            currentOperator = null;
            shouldResetScreen = true;
            updateDisplay();
            previousOperandDisplay.textContent = "";
            return;
        }

        const rounded = roundResult(result);
        currentInput = String(rounded);
        firstOperand = rounded;
    }

    waitingForSecondOperand = true;
    currentOperator = nextOperator;
    updateDisplay();
}

function handleEquals() {
    if (currentOperator === null || waitingForSecondOperand || currentInput === "⚡ WARNING! You've opened a portal to the Upside Down. Division by zero is not allowed! 👾") {
        return;
    }

    const secondOperand = parseFloat(currentInput);
    const result = operate(currentOperator, firstOperand, secondOperand);

    if (result === "⚡ WARNING! You've opened a portal to the Upside Down. Division by zero is not allowed! 👾") {
        previousOperandDisplay.textContent = `${roundResult(firstOperand)} ${getOperatorSymbol(currentOperator)} 0 =`;
        currentInput = result;
        firstOperand = null;
        currentOperator = null;
        shouldResetScreen = true;
        updateDisplay();
        return;
    }

    const rounded = roundResult(result);
    previousOperandDisplay.textContent = `${roundResult(firstOperand)} ${getOperatorSymbol(currentOperator)} ${roundResult(secondOperand)} =`;
    currentInput = String(rounded);
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    shouldResetScreen = true;

    currentOperandDisplay.textContent = currentInput;
}

function handleClear() {
    firstOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
    currentInput = "0";
    shouldResetScreen = false;
    updateDisplay();
}

function handleBackspace() {
    if (shouldResetScreen || currentInput === "⚡ WARNING! You've opened a portal to the Upside Down. Division by zero is not allowed! 👾") {
        handleClear();
        return;
    }

    if (waitingForSecondOperand) {
        return;
    }

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }

    updateDisplay();
}


keypad.addEventListener("click", function (event) {
    const target = event.target;
    if (!target.matches("button")) return;

    if (target.dataset.number) {
        inputDigit(target.dataset.number);
        return;
    }

    if (target.dataset.operator) {
        handleOperator(target.dataset.operator);
        return;
    }

    const action = target.dataset.action;
    if (action === "decimal") {
        inputDecimal();
    } else if (action === "clear") {
        handleClear();
    } else if (action === "delete") {
        handleBackspace();
    } else if (action === "equals") {
        handleEquals();
    }
});

function triggerButtonEffect(selector) {
    const button = document.querySelector(selector);
    if (button) {
        button.classList.add("pressed");
        setTimeout(function () {
            button.classList.remove("pressed");
        }, 120);
    }
}

window.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        inputDigit(key);
        triggerButtonEffect(`button[data-number="${key}"]`);
    } else if (key === ".") {
        inputDecimal();
        triggerButtonEffect("#decimal-btn");
    } else if (key === "+" || key === "-") {
        handleOperator(key);
        triggerButtonEffect(`button[data-operator="${key}"]`);
    } else if (key === "*") {
        handleOperator("*");
        triggerButtonEffect("#multiply-btn");
    } else if (key === "/") {
        event.preventDefault(); 
        handleOperator("/");
        triggerButtonEffect("#divide-btn");
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleEquals();
        triggerButtonEffect("#equals-btn");
    } else if (key === "Backspace") {
        handleBackspace();
        triggerButtonEffect("#delete-btn");
    } else if (key === "Escape" || key.toLowerCase() === "c") {
        handleClear();
        triggerButtonEffect("#clear-btn");
    }
});
