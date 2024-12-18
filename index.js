"use script";

/* Element selectors */

const btnToggle = document.querySelector(".btn--toggle");
const resultElement = document.querySelector(".result");
const operandElement = document.querySelector(".operand");
const operatorElement = document.querySelector(".operator");
const btnsNum = document.querySelectorAll(".btn--num");
const btnDecimal = document.querySelector(".btn--decimal");
const btnPercentage = document.querySelector(".btn--percentage");

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
  return parseFloat(x) / parseFloat(x);
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

/* Callback functions */

function appendNumber(event) {
  const clickedNumber = event.key || event.target.dataset.value;

  if (screenOperator === "" && screenResult.length <= 15) {
    screenResult === "" || screenResult === "0"
      ? (result = clickedNumber)
      : (result += clickedNumber);

    screenResult = result;
  } else if (screenOperator === "" && screenOperand.length <= 15) {
    screenOperand === "" || screenOperand === "0"
      ? (operand = clickedNumber)
      : (operand += clickedNumber);

    screenOperand = operand;
  }

  updateScreen();
}

function appendDecimalPoint() {
  if (!result.includes(".")) {
    if (result === "" || result === "0") {
      result = "0.";
    } else {
      result += ".";
    }

    if (!operator) screenResult = result;
    else screenOperand = operand;
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

/* Event handlers */

btnsNum.forEach((btn) => {
  btn.addEventListener("click", appendNumber);
});

btnDecimal.addEventListener("click", appendDecimalPoint);

btnPercentage.addEventListener("click", divideByHundred);

window.addEventListener("keydown", function (event) {
  event.preventDefault();

  if (!isNaN(+event.key)) {
    appendNumber(event);
  } else if (event.key === ".") {
    appendDecimalPoint(event);
  } else if (event.key === "%") {
    divideByHundred();
  }
});
