let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

const numberButtons = document.querySelectorAll('.btn[id^="one"], .btn[id^="two"], .btn[id^="three"], .btn[id^="four"], .btn[id^="five"], .btn[id^="six"], .btn[id^="seven"], .btn[id^="eight"], .btn[id^="nine"], .btn#zero');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (waitingForSecondOperand) {
            displayValue = button.textContent;
            waitingForSecondOperand = false;
        } else {
            displayValue = displayValue === '0' ? button.textContent : displayValue + button.textContent;
        }
        updateDisplay();
    });
});

const operatorButtons = document.querySelectorAll('.btn[id^="add"], .btn[id^="subtract"], .btn[id^="multiply"], .btn[id^="divide"]');

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
            operator = button.textContent;
            waitingForSecondOperand = true;
        } else {
            if (!waitingForSecondOperand) {
                performCalculation();
                operator = button.textContent;
                waitingForSecondOperand = true;
            }
        }
    });
});

document.getElementById('equals').addEventListener('click', () => {
    if (waitingForSecondOperand) {
        return;
    }
    performCalculation();
    operator = null;
});

function performCalculation() {
    const secondOperand = parseFloat(displayValue);
    switch (operator) {
        case '+':
            displayValue = (firstOperand + secondOperand).toString();
            break;
        case '-':
            displayValue = (firstOperand - secondOperand).toString();
            break;
        case '*':
            displayValue = (firstOperand * secondOperand).toString();
            break;
        case '/':
            if (secondOperand === 0) {
                displayValue = 'Error';
            } else {
                displayValue = (firstOperand / secondOperand).toString();
            }
            break;
        default:
            return;
    }
    firstOperand = parseFloat(displayValue);
    waitingForSecondOperand = true;
    updateDisplay();
}

document.getElementById('clear').addEventListener('click', () => {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
});

document.getElementById('decimal').addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
});

updateDisplay();
