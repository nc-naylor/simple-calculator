const {
  operatorPrecedence,
  tokenize,
  infixToPostfix,
  evaluatePostfix,
} = require("../calculator");

describe("operatorPrecedence", () => {
  test("should have correct precedence for addition", () => {
    expect(operatorPrecedence["+"]).toBe(1);
  });

  test("should have correct precedence for subtraction", () => {
    expect(operatorPrecedence["-"]).toBe(1);
  });

  test("should have correct precedence for multiplication (asterix)", () => {
    expect(operatorPrecedence["*"]).toBe(2);
  });

  test("should have correct precedence for multiplication (x)", () => {
    expect(operatorPrecedence["x"]).toBe(2);
  });

  test("should have correct precedence for division (slash)", () => {
    expect(operatorPrecedence["/"]).toBe(2);
  });

  test("should have correct precedence for division (division symbol", () => {
    expect(operatorPrecedence["÷"]).toBe(2);
  });

  test("should not have precedence for undefined operators", () => {
    expect(operatorPrecedence["^"]).toBeUndefined();
  });
});
