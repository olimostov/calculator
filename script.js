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
    // debugger;
    // this.prevOperandTextElement += this.currOperand;
    this.currOperand = computation;
    // debugger;
    this.operation = undefined;
    // debugger;
    this.prevOperand = "";
    // debugger;
    // this.prevOperandTextElement.innerHTML = "";
    this.prevOperandTextElement.innerText = "";
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
    // debugger;
    if (this.operation != null && this.operation != undefined) {
      this.prevOperandTextElement.innerHTML = `${this.getDisplayNum(
        this.prevOperand
      )}<span class="operator"> ${this.operation} </span>`;
    }
    // this.prevOperandTextElement.innerText = this.prevOperand;
  }
  negativeNumbers() {
    this.currOperand[0] == "-"
      ? (this.currOperand = this.currOperand.substr(1))
      : (this.currOperand = "-".concat(this.currOperand));
  }
}

// Calculator DOM elements
const btn = document.querySelectorAll("button");
const numBtns = document.querySelectorAll("[data-num]");
const operationBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");
const allClearBtn = document.querySelector("[data-allClear]");
const delBtn = document.querySelector("[data-delete]");
const minPlusBtn = document.querySelector("[data-minPlus]");
const prevOperandTextElement = document.querySelector("[data-prev-operand]");
const currOperandTextElement = document.querySelector("[data-curr-operand]");

// Currency Converter DOM elements
const currencyExtension = document.querySelector("[data-currency-extension]");
const converterField = document.querySelector("[data-currency-converter]");
const currencyExtensionBtn = document.querySelector(
  "[data-currency-extension-btn]"
);
const currencyBtn = document.querySelectorAll("[data-currency-btn]");
const currencyName = document.querySelectorAll("[data-currency-name]");
const currencyValue = document.querySelectorAll("[data-currency-value]");

const cryptoExtension = document.querySelector("[data-crypto-extension]");

// Calculator
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
  console.log("btn:", btn.target.innerText);
  console.log("btn value type:", typeof btn.target.innerText);
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
minPlusBtn.addEventListener("click", (btn) => {
  calculator.negativeNumbers();
  calculator.updDisplay();
});

document.addEventListener("keypress", (e) => {
  // if (!currencyExtension.classList.contains("extension-active-right")) {
  const nums = /[0-9.]/;
  const operators = /[+\*-÷]/;
  const division = "/";
  const del = "Backspace";
  const equals = "Enter";
  const allClear = "c";
  let keyVal;
  switch (e.key) {
    case equals:
      keyVal = "=";
      // debugger;
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
    // return;
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
    case "=":
      calculator.compute();
      debugger;
      calculator.updDisplay();
      debugger;
      break;
    case "AC":
      calculator.clear();
      calculator.updDisplay();
      break;
    default:
      return;
  }
  // }
});
class Converter {
  constructor(currencies) {
    // this.base = base;
    this.currencies = currencies;
  }

  addCurrency(currName) {
    this.currencyRow = `<div data-currency-name class="currency-name">${currName}</div>
    <div data-currency-value class="currency-amount">
      <input type="text" />${this.apiRespVal}
    </div>`;
    return this.currencyRow;
    // debugger;
    // this.currencyExtension.push(currName);
    // console.log("currencyList:", this.currencyList);
  }
  // updList() {}
}

const currencies = ["AUD", "UAH", "USD", "GBP", "JPY", "INR"];
// converter
const converter = new Converter(currencies);

currencyExtensionBtn.addEventListener("click", (e) => {
  currencyExtension.classList.toggle("extension-active-right");
  currencyExtension.style.transition = "all .5s ease-out";
});
cryptoExtension.addEventListener("click", (e) => {
  cryptoExtension.classList.toggle("extension-active-left");
  cryptoExtension.style.transition = "all .5s ease-out";
});
currencyBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let currName = e.target.textContent;
    // converterField.innerHTML = converter.addCurrency(currName);
    converterField.innerHTML = `<div data-currency-name class="currency-name">${currName}</div>
                                <div data-currency-value class="currency-amount"><input type="text" /></div>`;
  });
});
