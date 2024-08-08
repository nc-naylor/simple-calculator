const {
  tokenize,
  infixToPostfix,
  evaluatePostfix,
} = require("./calculator.js");

const display = document.getElementById("display");

function appendToDisplay(input) {
  display.value += input;
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
