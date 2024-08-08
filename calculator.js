export const operatorPrecedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  x: 2,
  "/": 2,
  "÷": 2,
};

export function tokenize(expression) {
  // \d+ : match one or more digits (0-9)
  // | : logical OR
  // [+\-*/] : match any allowed operator
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
