import {
  tokenize,
  infixToPostfix,
  evaluatePostfix,
  handleDecimalPoint,
  handleOperator,
  isOperator,
  isDecimal,
} from "./calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");

  function appendToDisplay(input) {
    if (isDecimal(input)) {
      display.value = handleDecimalPoint(display.value);
    } else if (isOperator(input)) {
      display.value = handleOperator(display.value, input);
    } else {
      display.value += input;
    }
  }

  function clearDisplay() {
    display.value = "";
  }

  function calculate() {
    try {
      const tokens = tokenize(display.value);
      const postfix = infixToPostfix(tokens);
      const result = evaluatePostfix(postfix);
      display.value = result;
    } catch (error) {
      display.value = "Error";
    }
  }

  // event listeners for number buttons
  document.querySelectorAll(".number-btn").forEach((button) => {
    button.addEventListener("click", () => appendToDisplay(button.textContent));
  });

  //event listeners for operator buttons
  document.querySelectorAll(".operator-btn").forEach((button) => {
    button.addEventListener("click", () => appendToDisplay(button.textContent));
  });

  //event listeners for special buttons
  document
    .getElementById("decimal")
    .addEventListener("click", () => appendToDisplay("."));
  document.getElementById("equal").addEventListener("click", calculate);
  document.getElementById("clear").addEventListener("click", clearDisplay);
});
