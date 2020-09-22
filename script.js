class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperandTextElement.innerText = '';
        this.previousOperandTextElement.innerText = '';
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = '';
    }

    delete() {
        // If the current operand is a result of a calculation we can't change it!
        if( typeof(this.currentOperand) !== 'string') return;
        // If the current operand is empty but operation is not empty let's clear it!
        //if(this.currentOperand === '' && this.operation !== '') this.operation = '';
        // In other cases let's try to delete the last character of current operand 
        this.currentOperand = this.currentOperand.slice(0,-1);
    }

    appendNumber(number) {
        // If the current operand is a result of a calculation we can't change it!
        if(typeof(this.currentOperand) !== 'string') return;
        // If we get a comma but we already have got it - leave it!
        if( number === '.' && this.currentOperand.includes('.') ) return;
        // Otherwise add number to the current operand
        this.currentOperand =  this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '' || this.currentOperand === '.') return;

        if(this.previousOperand !== '') this.compute(); 

        switch(operation){
            case 'xy': 
                this.operation = '^';
                break;
            case 'y&radic;'

        }
        this.operation = operation;
        this.previousOperand = this.currentOperand; // + this.operation;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousOperand),
              curr = parseFloat(this.currentOperand);

        if( isNaN(prev) || isNaN(curr) ) return;

        switch(this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            default: 
                return;
        }

        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = '';
    }

    getDisplayNumber(number) {

        const stringNumber = number.toString(),
              integerPart = parseFloat(stringNumber.split('.')[0]),
              decimalPart = stringNumber.split('.')[1];
        let display = '';

        if(isNaN(integerPart)) display = '';
        else display = integerPart.toLocaleString('en', { maximumFractionDigits:0} );

        if( decimalPart != null ) return `${display}.${decimalPart}`;
        else return display;
    }

    updateDisplay() {

        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if( this.operation != '' ) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => { 
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => { 
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});


