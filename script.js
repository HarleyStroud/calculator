
const displayContainer = document.querySelector("#input_text");
const calculatorButtons = document.querySelector("#calculator_container");

let firstUserNumber;
let secondUserNumber;
let userOperator;

let isEnteringFirstNumber = false;
let isEnteringSecondNumber = false;
let isEnteringOperator = false;

let lastEntered = null;

calculatorButtons.addEventListener('click', (event) => {
    let target = event.target;
    let userInput = "";
    let currentEntered = "";

    let isInputOperator = false;
    let isEvaluating = false;
    let isSign = false;

    switch(target.id) {
        case 'btn_zero':
            userInput = "0";
            break;
        case 'btn_one':
            userInput = "1";
            break;
        case 'btn_two':
            userInput = "2";
            break;
        case 'btn_three':
            userInput = "3";
            break;
        case 'btn_four':
            userInput = "4";
            break;
        case 'btn_five':
            userInput = "5";
            break;
        case 'btn_six':
            userInput = "6";
            break;
        case 'btn_seven':
            userInput = "7";
            break;
        case 'btn_eight':
            userInput = "8";
            break;
        case 'btn_nine':
            userInput = "9";
            break;
        case 'btn_add':
            userOperator = "+";
            userInput = "+";
            isInputOperator = true;
            break;
        case 'btn_subtract':
            userOperator = "-";
            userInput = "-";
            isInputOperator = true;
            break;
        case 'btn_multiply':
            userOperator = "*";
            userInput = "*";
            isInputOperator = true;
            break;
        case 'btn_divide':
            userOperator = "/";
            userInput = "/";
            isInputOperator = true;
            break;
        case 'btn_decimal':
            userInput = ".";
            break;
        case 'btn_sign':
            isSign = true;
            break;
        case 'btn_equal':
            isEnteringSecondNumber = false;
            isInputOperator = true;
            isEvaluating = true
            userInput = operate(userOperator, firstUserNumber, secondUserNumber);
            break;
        case 'btn_clear':
            isInputOperator = false;
            isEvaluating = false;
            isSign = false;
            isEnteringFirstNumber = false;
            isEnteringSecondNumber = false;
            isEnteringOperator = false;
            lastEntered = null;
            currentEntered = null;
            firstUserNumber = null;
            secondUserNumber = null;
            userOperator = null;
            updateDisplay("0", true);
            return;
    }

    if(userOperator != null && lastEntered != "operator" && lastEntered != "second") {
        isEnteringOperator = true;
        isEnteringFirstNumber = false;
    }
    else if(lastEntered == "operator") {
        isEnteringSecondNumber = true;
    }

    if(!isEnteringSecondNumber && !isEnteringOperator) {
        isEnteringFirstNumber = true;
        currentEntered = "first";
    }
    else if(isEnteringSecondNumber) {
        currentEntered = "second";
    }
    else if(isEnteringOperator) {
        currentEntered = "operator";
    }

    let isNewInput = false;
    if(currentEntered != lastEntered) {
        isNewInput = true;
    }
    else {
        isNewInput = false;
    }

    lastEntered = currentEntered;

    if (isEnteringFirstNumber) {
        console.log(`First User Number = ${firstUserNumber} before input`);

        if(firstUserNumber == null) {
            firstUserNumber = userInput
        }
        else {
            if(isSign) {
                let firstChar = firstUserNumber[0];
                if(firstChar == "-") {
                    firstUserNumber = firstUserNumber.substring(1);
                }
                else {
                    firstUserNumber = "-" + firstUserNumber;
                }
            }
            else {
                firstUserNumber += userInput;
            }
        }
        
        console.log(`First User Number = ${firstUserNumber} after input`);
    }
    else if(isEnteringSecondNumber) {
        console.log(`Second User Number = ${secondUserNumber} before input`);
        if(secondUserNumber == null) {
            secondUserNumber = userInput;
        }
        else {
            if(isSign) {
                let firstChar = secondUserNumber[0];
                if(firstChar == "-") {
                    secondUserNumber = secondUserNumber.substring(1);
                }
                else {
                    secondUserNumber = "-" + secondUserNumber;
                }
            }
            else {
                secondUserNumber += userInput;
            }
        }
        console.log(`Second User Number = ${secondUserNumber} after input`);
    }

    if(isEnteringOperator) {
        isEnteringFirstNumber = false;
        isEnteringSecondNumber = false;
        isEnteringOperator = false;
    }

    if(isEvaluating) {
        isEnteringFirstNumber = false;
        isEnteringSecondNumber = false;
        firstUserNumber = userInput;
        secondUserNumber = null;
        lastEntered = "first"
        userOperator = null;
    }

    updateDisplay(userInput, isNewInput, isSign);
});


function testOperations() {
    firstUserNumber = prompt("Enter First Number");
    console.log("First Number Entered: " + firstUserNumber);

    userOperator = prompt("Enter the operation");
    console.log("Operation selected: " + userOperator);

    secondUserNumber = prompt("Enter Second Number");
    console.log("Second Number Entered: " + secondUserNumber);

    operate(userOperator, firstUserNumber, secondUserNumber);
}


function operate(operator, firstNumber, secondNumber) {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    let answer;
    if(operator == "+") {
        answer = add(firstNumber, secondNumber);
    }
    else if(operator == "-") {
        answer = subtract(firstNumber, secondNumber);
    }
    else if(operator == "X" || operator == "*") {
        answer = multiply(firstNumber, secondNumber);
    }
    else if(operator == "/") {
        answer = divide(firstNumber, secondNumber);
    }
    
    console.log(`Answer: ${answer}`);
    return answer;
}


function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}


function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}


function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}


function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber
}


let displayValue = "";
function updateDisplay(newValue, isNewInput, isSignEntered = false) {
    if(isSignEntered) {0
        let firstChar = displayValue[0];
        if(firstChar == "-") {
            displayValue = displayValue.substring(1);
        }
        else if(firstChar != "0") {
            displayValue = "-" + displayValue;
        }
    }
    else if(isNewInput) {
        displayValue = newValue;
    }
    else {
        displayValue += newValue;
    }
    
    displayContainer.textContent = displayValue;
    console.log(`New Value: ${displayValue}`);
    console.log(`New Value: ${newValue}`);
}