"use script";

/* Element selectors */

const btnToggle = document.querySelector(".btn--toggle");
const resultElement = document.querySelector(".result");
const operandElement = document.querySelector(".operand");
const operatorElement = document.querySelector(".operator");
const btnsNum = document.querySelectorAll(".btn--num");
const btnDecimal = document.querySelector(".btn--decimal");
const btnPercentage = document.querySelector(".btn--percentage");
const btnClear = document.querySelector(".btn--clear");
const btnAllClear = document.querySelector(".btn--all-clear");
const btnsOperator = document.querySelectorAll(".btn--operator");

/* Theme toggle */

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

btnToggle.addEventListener("click", function () {
  let theme;
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    theme = document.body.classList.contains("light-theme") ? "light" : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  }
  localStorage.setItem("theme", theme);
});

/* Initial variables */

let result = "0",
  operand = "",
  operator = "";

let screenResult = "0",
  screenOperand = "",
  screenOperator = "";

/* Helper functions */

function add(x, y) {
  return parseFloat(x) + parseFloat(y);
}

function subtract(x, y) {
  return parseFloat(x) - parseFloat(y);
}

function multiply(x, y) {
  return parseFloat(x) * parseFloat(y);
}

function divide(x, y) {
  if (parseFloat(y) === 0) return undefined;
  else return parseFloat(x) / parseFloat(y);
}

function operate(firstOperand, secondOperand, mathOperator) {
  switch (mathOperator) {
    case "+":
      return add(firstOperand, secondOperand);
    case "-":
      return subtract(firstOperand, secondOperand);
    case "*":
      return multiply(firstOperand, secondOperand);
    case "/":
      return divide(firstOperand, secondOperand);
    default:
      return "Invalid Operator";
  }
}

function updateScreen() {
  resultElement.textContent = screenResult;
  operandElement.textContent = screenOperand;
  operatorElement.innerHTML = screenOperator;
}
updateScreen();

/* Operators markup */

const addMarkup = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.929 19.5v-6.429H4.5V10.93h6.429V4.5h2.142v6.429H19.5v2.142h-6.429V19.5H10.93z"
      fill="#fff" />
  </svg>
`;

const subtractMarkup = `
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 21.6666V18.3333H32.5V21.6666H7.5Z" fill="#fff" />
  </svg>
`;

const multiplyMarkup = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 6 6 4.5l6 6 6-6L19.5 6l-6 6 6 6-1.5 1.5-6-6-6 6L4.5 18l6-6-6-6z" fill="#fff" />
  </svg>
`;

const divideMarkup = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.5 10.929h15v2.142h-15V10.93zM12 19.5a2.143 2.143 0 1 1 0-4.286 2.143 2.143 0 0 1 0 4.286zm0-10.714A2.143 2.143 0 1 1 12 4.5a2.143 2.143 0 0 1 0 4.286z"
      fill="#fff" />
  </svg>
`;

/* Callback functions */

function appendNumber(event) {
  const clickedNumber = event.key || event.target.dataset.value;

  result === "" || result === "0" ? (result = clickedNumber) : (result += clickedNumber);

  screenResult = result;

  updateScreen();
}

function appendDecimalPoint() {
  if (!result.includes(".")) {
    if (result === "" || result === "0") {
      result = "0.";
    } else {
      result += ".";
    }

    screenResult = result;
  }

  updateScreen();
}

function divideByHundred() {
  if (result === "" || result === "0" || result === "0.") {
    result = "0.00";
  } else if (result == 0) {
    result += "00";
  } else {
    result = result / 100;
  }

  screenResult = result;

  updateScreen();
}

function clear() {
  if (result === "0" || result === "" || result.length === 1) {
    result = "0";
  } else {
    result = result.slice(0, -1);
  }
  screenResult = result;

  updateScreen();
}

function clearScreen() {
  screenResult = result = "0";
  screenOperand = operand = "";
  screenOperator = operator = "";

  updateScreen();
}

function appendOperator(event) {
  if (!operand && !operator) {
    operand = result;
    screenOperand = operand;

    result = "0";
    screenResult = result;
  } else if (operand && operator) {
    operand = operate(operand, result, operator);
    screenOperand = operand;

    result = "0";
    screenResult = result;
  }

  operator = event.target?.closest(".btn--operator").dataset.value || event;
  switch (operator) {
    case "+":
      screenOperator = addMarkup;
      break;
    case "-":
      screenOperator = subtractMarkup;
      break;
    case "*":
      screenOperator = multiplyMarkup;
      break;
    case "/":
      screenOperator = divideMarkup;
      break;
  }

  updateScreen();
}

/* Event handlers */

btnsNum.forEach((btn) => {
  btn.addEventListener("click", appendNumber);
});

btnDecimal.addEventListener("click", appendDecimalPoint);

btnPercentage.addEventListener("click", divideByHundred);

btnClear.addEventListener("click", clear);

btnAllClear.addEventListener("click", clearScreen);

btnsOperator.forEach((btn) => {
  btn.addEventListener("click", appendOperator);
});

window.addEventListener("keydown", function (event) {
  event.preventDefault();

  if (!isNaN(+event.key)) {
    appendNumber(event);
  } else if (event.key === ".") {
    appendDecimalPoint(event);
  } else if (event.key === "%") {
    divideByHundred();
  } else if (event.key === "Backspace" || event.key === "Delete") {
    clear();
  } else if (event.key === "Escape") {
    clearScreen();
  } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
    if (event.key === "+") appendOperator("+");
    else if (event.key === "-") appendOperator("-");
    else if (event.key === "*") appendOperator("*");
    else if (event.key === "/") appendOperator("/");
  }
});
