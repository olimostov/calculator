class Calculator {
  constructor(prevOperandTextElement, curOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.curOperandTextElement = curOperandTextElement;
    this.clear();
  }

  clear() {
    this.currOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }
  delete() { 
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }
  appendNumber(number) { 
    if (number === '.' && this.includes('.')) {
      return;
    }
    this.currOperand= this.currOperand.toString() + number.toString();

  }
  chooseOperation(operation) {
    if (this.currOperand === '') { return; }
    if (this.prevOperand !== '') {

      this.compute(); 
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  } 

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) {
      return
    };
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break
      case "-":
        computation = prev - curr;
        break;
      case "x":
        computation = prev * curr;
        break;
      case "÷":
      computation = prev / curr;
        break;
      default:
        return
    }
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = '';
  }

  updDisplay() {
    this.curOperandTextElement.innerText = this.currOperand;
    if (this.operation != null) {
      this.prevOperandTextElement.innerText = `${this.prevOperand} ${this.operation}`
    }
  }
  
  negativeNumbers() {
    this.currOperand[0] == '-' ? this.currOperand = this.currOperand.substr(1) : this.currOperand = '-'.concat(this.currOperand);
  }
}
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const prevOperandTextElement = document.querySelector('[data-previous-operand]');
const curOperandTextElement = document.querySelector('[data-current-operand]');
const minPlusBtn = document.querySelector('[data-min-plus]');

const calculator = new Calculator(prevOperandTextElement, curOperandTextElement); 
numberBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.innerText);
    calculator.updDisplay();
  })
})

allClearBtn.addEventListener('click', btn => {
  calculator.clear();
  calculator.updDisplay();
})
operationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updDisplay();
  })
})
equalsBtn.addEventListener('click', btn => {
  calculator.compute();
  calculator.updDisplay();
})
minPlusBtn.addEventListener('click', btn => {
  calculator.negativeNumbers();
  calculator.updDisplay()
})
deleteBtn.addEventListener('click', btn => {
  calculator.delete();
  calculator.updDisplay();
})