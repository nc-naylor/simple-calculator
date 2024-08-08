import { tokenize, infixToPostfix, evaluatePostfix } from "./calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");

  function appendToDisplay(input) {
    if (input === ".") {
      let currentValue = display.value;
      display.value = handleDecimalPoint(currentValue, input);
    } else {
      display.value += input;
    }
  }

  function handleDecimalPoint(displayValue, input) {
    const lastChar = displayValue.slice(-1);
    const lastOperand = displayValue.split(/[\+\-\*x\/÷]/).pop();
    const containsDecimal = lastOperand.includes(".");

    if (containsDecimal || lastChar === "." || !lastOperand) {
      return displayValue;
    }
    return displayValue + ".";
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
