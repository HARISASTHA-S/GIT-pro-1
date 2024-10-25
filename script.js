let expression = '';
let splitString = '';
let lastResult = null; // Variable to store the last result
const resultView = document.getElementById("viewresult");

function buttonClick(component) {
    let value = component.getAttribute('data-value');
    handleInput(value);
}

function handleInput(value) {

    if (isNaN(value) && value !== 'equal' && value !== 'AC' && value !== '.') {
        // Check if the value is an operator
        if (['+', '-', '*', '/', '%'].includes(value)) {
            if (lastResult !== null) {
                // If there's a last result, use it as the starting point for the next operation
                expression = lastResult.toString();
            }
            splitString = value;
        } else {
            showError("Error");
            return;
        }
    }

    if (value === "AC") {
        expression = '';
        lastResult = null; // Reset last result
        resultView.innerHTML = '0';
    } else if (value === 'equal') {
        // Apply calculation
        if (splitString) {
            let finalValue = expression.split(splitString);
            if (finalValue.length === 2) {
                let numberLeft = Number(finalValue[0]);
                let numberRight = Number(finalValue[1]);
                let result = getCalculatedResult(numberLeft, splitString, numberRight);
                lastResult = result; // Store the result for further operations
                resultView.innerHTML = result;
            } else {
                showError("Error");
            }
        } else {
            showError("Error");
        }
    } else {
        expression += value;
        resultView.innerHTML = expression;
    }
}

function getCalculatedResult(leftOperand, operator, rightOperand) {
    switch (operator) {
        case '+':
            return leftOperand + rightOperand;
        case '-':
            return leftOperand - rightOperand;
        case '*':
            return leftOperand * rightOperand;
        case '/':
            return leftOperand / rightOperand;
        case '%': // Modulus operation
            return leftOperand % rightOperand;
    }
}

function showError(message) {
    resultView.innerHTML = message;
    setTimeout(() => {
        resultView.innerHTML = '0'; // Reset to 0 after showing error
        expression = ''; // Reset expression
    }, 2000);
}

// Keyboard event listener
document.addEventListener('keydown', (event) => {
    const key = event.key;
    // Handle other Shift key combinations for symbols
    if (event.shiftKey) {
        switch (key) {
            case '2':
                handleInput('@'); // Handle Shift + 2
                return;
            case '3':
                handleInput('#'); // Handle Shift + 3
                return;
            case '4':
                handleInput('$'); // Handle Shift + 4
                return;
            case '5':
                handleInput('%'); // Handle Shift + 5
                    return;  
            case '6':
                handleInput('^'); // Handle Shift + 6
                return;
            case '7':
                handleInput('&'); // Handle Shift + 7
                return;
            case '8':
                handleInput('*'); // Handle Shift + 8
                return;
            case '9':
                handleInput('('); // Handle Shift + 9
                return;
            case '0':
                handleInput(')'); // Handle Shift + 0
                return;
            // Add other symbols as needed
            default:
                break; // Ignore other Shift key combinations
        }
    }

    // Handle numeric keys and valid operators
    if (!isNaN(key) || ['+', '-', '*', '/', '=','%', 'Enter', 'Escape', 'Backspace'].includes(key)) {
        if (key === 'Enter' || key === '=') {
            handleInput('equal');
        } else if (key === 'Escape') {
            handleInput('AC');
        } 
        else if (key === '%'){
            handleInput('%');
        }else if (key === 'Backspace') {
            // Remove the last character from the expression
            expression = expression.slice(0, -1);
            resultView.innerHTML = expression.length > 0 ? expression : '0'; // Display the updated expression or reset to 0
        } else {
            handleInput(key);
        }
    } 
});
