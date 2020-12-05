class Calculator {
  constructor(prevOperandTextElement, currOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currOperandTextElement = currOperandTextElement;
    this.clear();
  }
  clear() {
    this.currOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
    this.prevOperandTextElement.innerHTML = "";
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }
  appendNum(num) {
    if (num === "." && this.currOperand.includes(".")) {
      return;
    }
    this.currOperand = this.currOperand.toString() + num.toString();
  }
  chooseOperation(operation) {
    if (this.currOperand === "") {
      return;
    }
    if (this.prevOperand !== "") {
      this.compute();
    }
    // this.dispOperator = `<span class="operator"> ${operation} </span>`;

    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) {
      return;
    }
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷" || "/":
        computation = prev / curr;
        break;
      default:
        return;
    }
    // this.prevOperandTextElement += this.currOperand;
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
    this.prevOperandTextElement.innerHTML = "";
  }

  getDisplayNum(num) {
    const strNum = num.toString();
    const intDigits = parseFloat(strNum.split(".")[0]);
    const decimalDigits = strNum.split(".")[1];
    let intDisplay;
    if (isNaN(intDigits)) {
      intDisplay = "";
    } else {
      intDisplay = intDigits.toLocaleString("en", { maxFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${intDisplay}.${decimalDigits}`;
    } else {
      return intDisplay;
    }
  }

  updDisplay() {
    this.currOperandTextElement.innerText = this.getDisplayNum(
      this.currOperand
    );

    if (this.operation != null && this.operation != undefined) {
      this.prevOperandTextElement.innerHTML = `${this.getDisplayNum(
        this.prevOperand
      )}<span class="operator"> ${this.operation} </span>`;
    }
    // this.prevOperandTextElement.innerText = this.prevOperand;
  }
  negPosNum() {}
}
const btn = document.querySelectorAll("button");
const numBtns = document.querySelectorAll("[data-num]");
const operationBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");
const allClearBtn = document.querySelector("[data-allClear]");
const delBtn = document.querySelector("[data-delete]");
const munPlus = document.querySelector("[data-minPlus]");
const prevOperandTextElement = document.querySelector("[data-prev-operand]");
const currOperandTextElement = document.querySelector("[data-curr-operand]");

const calculator = new Calculator(
  prevOperandTextElement,
  currOperandTextElement
);

numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNum(btn.innerText);
    calculator.updDisplay();
  });
});
operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updDisplay();
  });
});
equalsBtn.addEventListener("click", (btn) => {
  calculator.compute();
  calculator.updDisplay();
});
allClearBtn.addEventListener("click", (btn) => {
  calculator.clear();
  calculator.updDisplay();
});
delBtn.addEventListener("click", (btn) => {
  calculator.delete();
  calculator.updDisplay();
});

// document.addEventListener("keydown", (e) => {
//   let keyVal = e.key;
//   let btn = Array.from(document.querySelectorAll("button")).find(
//     (el) => el.textContent.toString() === keyVal
//   );
//   console.log("btn:", btn.textContent);
//   btn.classList.toggle("active");
// });
document.addEventListener("keypress", (e) => {
  const nums = /[0-9.]/;
  const operators = /[=+\*-÷]/;
  const division = "/";
  const del = "Backspace";
  const equals = "Enter";
  const allClear = "c";
  let keyVal;
  switch (e.key) {
    case equals:
      keyVal = "=";
      break;
    case "Backspace":
      keyVal = "DEL";
      break;
    case allClear:
      keyVal = "AC";
      break;
    case division:
      keyVal = "÷";
      break;
    default:
      keyVal = e.key;
  }
  console.log("keyVal:", keyVal);
  console.log("keyVal type:", typeof keyVal);
  let btn = Array.from(document.querySelectorAll("button")).find(
    (el) => el.textContent.toString() === keyVal
  );
  btn.classList.toggle("active");
  setTimeout(() => {
    btn.classList.toggle("active");
  }, 100);
  switch (keyVal) {
    case String(keyVal.match(nums)):
      calculator.appendNum(keyVal);
      // debugger;
      calculator.updDisplay();
      break;
    case String(keyVal.match(operators)):
      calculator.chooseOperation(keyVal);
      calculator.updDisplay();
      break;
    case String(del):
      calculator.delete();
      calculator.updDisplay();
      break;
    case equals:
      calculator.compute();
      calculator.updDisplay();
      break;
    case "AC":
      calculator.clear();
      calculator.updDisplay();
      break;
    default:
      return;
  }
});
