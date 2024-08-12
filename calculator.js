export const operatorPrecedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  x: 2,
  "/": 2,
  "÷": 2,
};

export function tokenize(expression) {
  // \d+(\.\d+)? : matches integers and floats
  // | : logical OR
  // [+\-*/x÷] : match any allowed operator
  // g : global, find all matches
  return expression.match(/\d+(\.\d+)?|[+\-*/x÷]/g);
}

// Converts infix array of tokens ['2', '+', '3', '*', '4'] to postfix ([2, 3, 4, '*', '+'])
export function infixToPostfix(tokens) {
  const output = [];
  const operators = [];

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      output.push(Number(token));
    } else {
      while (
        operators.length &&
        operatorPrecedence[operators[operators.length - 1]] >=
          operatorPrecedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    }
  });

  while (operators.length) {
    output.push(operators.pop());
  }

  return output;
}

export function evaluatePostfix(postfix) {
  const stack = [];

  postfix.forEach((token) => {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
        case "x":
          stack.push(a * b);
          break;
        case "/":
        case "÷":
          stack.push(a / b);
          break;
      }
    }
  });
  return stack[0];
}

export function handleDecimalPoint(displayValue) {
  const lastChar = displayValue.slice(-1);
  const lastOperand = displayValue.split(/[\+\-\*x\/÷]/).pop();
  const containsDecimal = lastOperand.includes(".");

  if (isOperator(lastChar)) {
    return displayValue + "0.";
  }

  if (containsDecimal || lastChar === "." || !lastOperand) {
    return displayValue;
  }
  return displayValue + ".";
}

export function handleOperator(displayValue, input) {
  const lastChar = displayValue.slice(-1);

  if (isOperator(lastChar)) {
    return displayValue.slice(0, -1) + input;
  }

  return displayValue + input;
}

export function isOperator(input) {
  return ["+", "-", "*", "x", "/", "÷"].includes(input);
}

export function isDecimal(input) {
  return input === ".";
}
