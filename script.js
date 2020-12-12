// Calculator DOM elements
const btn = document.querySelectorAll('button');
const numBtns = document.querySelectorAll('[data-num]');
const operationBtns = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('[data-equals]');
const allClearBtn = document.querySelector('[data-allClear]');
const delBtn = document.querySelector('[data-delete]');
const minPlusBtn = document.querySelector('[data-minPlus]');
const prevOperandTextElement = document.querySelector('[data-prev-operand]');
const currOperandTextElement = document.querySelector('[data-curr-operand]');

// Crypto Converter DOM elements
const cryptoExtension = document.querySelector('[data-crypto-extension]');

// Classes
class Calculator {
  constructor(prevOperandTextElement, currOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currOperandTextElement = currOperandTextElement;
    this.clear();
  }
  clear() {
    this.currOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
    this.computation = undefined;
    this.prevOperandTextElement.innerHTML = '';
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }
  appendNum(num) {
    if (num === '.' && this.currOperand.includes('.')) {
      return;
    }
    this.currOperand = this.currOperand.toString() + num.toString();
  }
  chooseOperation(operation) {
    if (this.currOperand === '') {
      return;
    }
    if (this.prevOperand !== '') {
      this.compute();
    }
    // this.dispOperator = `<span class="operator"> ${operation} </span>`;

    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }
  compute() {
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) {
      return;
    }
    switch (this.operation) {
      case '+':
        this.computation = prev + curr;
        break;
      case '-':
        this.computation = prev - curr;
        break;
      case '*':
        this.computation = prev * curr;
        break;
      case '÷' || '/':
        this.computation = prev / curr;
        break;
      default:
        return;
    }
    this.currOperand = this.computation;
    this.operation = undefined;
    this.prevOperand = '';
    this.prevOperandTextElement.innerText = '';
  }

  getDisplayNum(num) {
    const strNum = num.toString();
    const intDigits = parseFloat(strNum.split('.')[0]);
    const decimalDigits = strNum.split('.')[1];
    let intDisplay;
    if (isNaN(intDigits)) {
      intDisplay = '';
    } else {
      intDisplay = intDigits.toLocaleString('en', { maxFractionDigits: 0 });
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
  }
  negativeNumbers() {
    this.currOperand[0] == '-'
      ? (this.currOperand = this.currOperand.substr(1))
      : (this.currOperand = '-'.concat(this.currOperand));
  }
}

// Calculator
const calculator = new Calculator(
  prevOperandTextElement,
  currOperandTextElement
);

numBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (calculator.computation && calculator.operation == undefined) {
      calculator.clear();
      calculator.appendNum(btn.innerText);
      calculator.updDisplay();
    } else {
      calculator.appendNum(btn.innerText);
      calculator.updDisplay();
    }
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (calculator.operation != undefined) {
      calculator.operation = btn.innerText;
    }
    calculator.chooseOperation(btn.innerText);
    calculator.updDisplay();
  });
});

equalsBtn.addEventListener('click', (btn) => {
  console.log('btn:', btn.target.innerText);
  console.log('btn value type:', typeof btn.target.innerText);
  console.log(`current num: ${this.currOperand}`);
  console.log(`prev num: ${this.prevOperand}`);
  console.log(`current operation: ${this.operation}`);
  calculator.compute();
  calculator.updDisplay();
});
allClearBtn.addEventListener('click', (btn) => {
  calculator.clear();
  calculator.updDisplay();
});
delBtn.addEventListener('click', (btn) => {
  calculator.delete();
  calculator.updDisplay();
});
minPlusBtn.addEventListener('click', (btn) => {
  calculator.negativeNumbers();
  calculator.updDisplay();
});

document.addEventListener('keydown', (e) => {
  const nums = /[\d\.]/;
  const operators = /[*÷+-]/;
  const division = '/';
  const del = 'Backspace';
  const equals = /Enter|=/;
  const allClear = 'c';
  let keyVal = e.key;

  switch (e.key) {
    case String(e.key.match(equals)):
      keyVal = '=';
      break;
    case del:
      keyVal = 'DEL';
      break;
    case allClear:
      keyVal = 'AC';
      break;
    case division:
      keyVal = '÷';
      break;
    default:
      keyVal = e.key;
  }
  console.log('keyVal:', keyVal);
  console.log('keyVal type:', typeof keyVal);
  let btn = Array.from(document.querySelectorAll('button')).find(
    (el) => el.textContent.toString() === keyVal
  );
  btn.classList.toggle('active');
  setTimeout(() => {
    btn.classList.toggle('active');
  }, 100);

  switch (keyVal) {
    case String(keyVal.match(nums)):
      if (calculator.computation && calculator.operation == undefined) {
        calculator.clear();
        calculator.appendNum(keyVal);
        calculator.updDisplay();
      } else {
        calculator.appendNum(keyVal);
        calculator.updDisplay();
      }
      break;
    case String(keyVal.match(operators)):
      if (calculator.operation != undefined) {
        calculator.operation = btn.innerText;
      }

      calculator.chooseOperation(btn.innerText);
      calculator.updDisplay();
      break;
    case '=':
      calculator.compute();
      calculator.updDisplay();
      break;
    case 'DEL':
      calculator.delete();
      calculator.updDisplay();
      break;
    case 'AC':
      calculator.clear();
      calculator.updDisplay();
      break;
    default:
      keyVal;
  }
});

// Currency Converter DOM elements
const currencyExtension = document.querySelector('[data-currency-extension]');
const converterField = document.querySelector('[data-currency-converter]');
const currencyExtensionBtn = document.querySelector(
  '[data-currency-extension-btn]'
);
const currencyBtn = document.querySelectorAll('[data-currency-btn]');
const currencyName = document.querySelectorAll('[data-currency-name]');
const currencyValue = document.querySelectorAll('[data-currency-value]');
const currencyList = document.createElement('ul');
currencyList.id = 'curr-converter';
currencyList.setAttribute('data-currency-converter', '');
currencyExtension.appendChild(currencyList);
const currencies = [
  {
    name: 'AUD',
    icon: {
      className: 'fas fa-dollar-sign',
    },
    li: {
      className: 'currency-name',
      dataAttribute: 'data-currency-name',
    },
    input: {
      className: 'currency-amount',
      dataAttribute: 'data-currency-value',
    },
  },
  {
    name: 'UAH',
    icon: {
      className: 'fas fa-hryvnia',
    },
    li: {
      className: 'currency-name',
      dataAttribute: 'data-currency-name',
    },
    input: {
      className: 'currency-amount',
      dataAttribute: 'data-currency-value',
    },
  },
  {
    name: 'USD',
    icon: {
      className: 'fas fa-dollar-sign',
    },
    li: {
      className: 'currency-name',
      dataAttribute: 'data-currency-name',
    },
    input: {
      className: 'currency-amount',
      dataAttribute: 'data-currency-value',
    },
  },
  {
    name: 'GBP',
    icon: {
      className: 'fas fa-pound-sign',
    },
    li: {
      className: 'currency-name',
      dataAttribute: 'data-currency-name',
    },
    input: {
      className: 'currency-amount',
      dataAttribute: 'data-currency-value',
    },
  },
  {
    name: 'JPY',
    icon: {
      className: 'fas fa-yen-sign',
    },
    li: {
      className: 'currency-name',
      dataAttribute: 'data-currency-name',
    },
    input: {
      className: 'currency-amount',
      dataAttribute: 'data-currency-value',
    },
  },
  {
    name: 'INR',
    icon: {
      className: 'fas fa-rupee-sign',
    },
    li: {
      className: 'currency-name',
      dataAttribute: 'data-currency-name',
    },
    input: {
      className: 'currency-amount',
      dataAttribute: 'data-currency-value',
    },
  },
];

class Converter {
  constructor(currencies) {
    // this.base = base;
    this.currencies = currencies;
  }

  // addCurrency(currName) {
  //   this.currList = document.createElement('ul');
  //   this.currList.id = 'curr-converter';
  //   this.currList.setAttribute('data-currency-converter', '');
  //   this.currRow = `<li data-currency-name class="currency-name">${currName}</li><input type="text" data-currency-value class="currency-amount" />`;
  //   this.currList.innerHTML = this.currRow;
  // }

  setAttributes(element, attrObj) {
    // console.log(attrObj);
    switch (element.outerHTML) {
      case '<li></li>':
        // debugger;
        element.setAttribute('class', attrObj[0].li.className);
        element.setAttribute(`${attrObj[0].li.dataAttribute}`, '');

        break;
      case '<i></i>':
        element.setAttribute('class', attrObj[0].icon.className);
        break;
      case '<input>':
        element.setAttribute('class', attrObj[0].li.className);
        element.setAttribute(`${attrObj[0].input.dataAttribute}`, '');
        element.setAttribute(`type`, 'text');
        break;
      case '<label></label>':
        element.setAttribute('for', attrObj[0].name);
        element.innerText = attrObj[0].name;
      default:
        return element;
    }
    console.log('setAttribute func: ', element);
    console.log('setAttribute func (type): ', element.nodeType);
  }
  appendElements(tags) {
    let counter = tags.length - 1;
    console.log('tags.length: ', tags.length);
    console.log('counter: ', counter);
    console.log('type : ', typeof tags[counter - 1]);
    if (counter <= 0) {
      console.log(tags);
      return;
    }
    tags[counter - 1].appendChild(tags[counter]);
    console.log('tags[counter - 1]: ', tags[counter - 1]);
    console.log('tags.length: ', tags.length);
    tags.pop();
    this.appendElements(tags);
  }

  createNode(currency) {
    const currencyObj = this.currencies.filter((obj) => {
      return obj.name === currency;
    });
    const li = document.createElement(`li`);
    const label = document.createElement('label');
    const icon = document.createElement('i');
    const input = document.createElement('input');
    const attrTags = [li, label, icon, input];
    attrTags.forEach((el) => {
      this.setAttributes(el, currencyObj);
      console.log('createNode func: ', el);
      console.log('createNode func nodeType: ', el.nodeType);
      // console.log(el);
    });
    this.HTMLNode = this.appendElements(attrTags);
    console.log('HTMLNode:', this.HTMLNode);

    // this.HTMLNode.innerHTML = `class="${currencyObj[0].className[0]}" ${currencyObj[0].dataAttribute[0]} ><label for="${currency}">${currency} </label>${currencyObj[0].icon}<input type="text" ${currencyObj[0].dataAttribute[1]} class="${currencyObj[0].className[1]}" />`;
    // return this.HTMLNode;
  }
}

// const currencies = ['AUD', 'UAH', 'USD', 'GBP', 'JPY', 'INR'];

// converter
const converter = new Converter(currencies);

currencyExtensionBtn.addEventListener('click', (e) => {
  currencyExtension.classList.toggle('extension-active-right');
  currencyExtension.style.transition = 'all .5s ease-out';
});
cryptoExtension.addEventListener('click', (e) => {
  cryptoExtension.classList.toggle('extension-active-left');
  cryptoExtension.style.transition = 'all .5s ease-out';
});
currencyBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    console.log(e.target.innerText);
    console.log(typeof e.target.innerText);
    // console.log(converter.createNode(e.target.innerText));
    let HTMLNode = converter.createNode(e.target.innerText);
    console.log('HTMLNode:', HTMLNode);
    console.log('currencyList:', currencyList);
    currencyList.appendChild(HTMLNode);

    // debugger;
  });
});
