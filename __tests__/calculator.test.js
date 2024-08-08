import {
  operatorPrecedence,
  tokenize,
  infixToPostfix,
  evaluatePostfix,
} from "../calculator.js";

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

describe("tokenize", () => {
  test("tokenizes a simple expression", () => {
    expect(tokenize("2 + 3 * 4")).toEqual(["2", "+", "3", "*", "4"]);
  });

  test("tokenizes a single number", () => {
    expect(tokenize("23")).toEqual(["23"]);
  });

  test("tokenizes an expression with different operators", () => {
    expect(tokenize("1 + 2 - 3 * 4 / 5")).toEqual([
      "1",
      "+",
      "2",
      "-",
      "3",
      "*",
      "4",
      "/",
      "5",
    ]);
  });

  test("tokenizes an empty string", () => {
    expect(tokenize("")).toEqual(null);
  });

  test("tokenizes large numbers", () => {
    expect(tokenize("1234567890 + 9876543210")).toEqual([
      "1234567890",
      "+",
      "9876543210",
    ]);
  });

  test("tokenizes consecutive operators", () => {
    expect(tokenize("2 ++ 3")).toEqual(["2", "+", "+", "3"]);
  });

  test("tokenizes float numbers", () => {
    expect(tokenize("1.23 + 4.56")).toEqual(["1.23", "+", "4.56"]);
  });
});
