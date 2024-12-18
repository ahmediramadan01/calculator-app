"use script";

/* Element selectors */

const btnToggle = document.querySelector(".btn--toggle");

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
