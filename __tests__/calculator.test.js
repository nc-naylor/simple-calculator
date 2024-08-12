import {
  operatorPrecedence,
  tokenize,
  infixToPostfix,
  evaluatePostfix,
  handleDecimalPoint,
  handleOperator,
  isOperator,
  isDecimal,
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

describe("infixToPostfix", () => {
  test("converts a simple expression from infix to postfix", () => {
    expect(infixToPostfix(["2", "+", "3"])).toEqual([2, 3, "+"]);
  });

  test("handles multiple operators respecting operator precedece", () => {
    expect(infixToPostfix(["2", "+", "3", "*", "4"])).toEqual([
      2,
      3,
      4,
      "*",
      "+",
    ]);
  });

  test("handles all supported operators", () => {
    expect(
      infixToPostfix([
        "2",
        "+",
        "3",
        "-",
        "4",
        "*",
        "5",
        "/",
        "6",
        "x",
        "7",
        "÷",
        "8",
      ])
    ).toEqual([2, 3, "+", 4, 5, "*", 6, "/", 7, "x", 8, "÷", "-"]);
  });

  test("handles a single number", () => {
    expect(infixToPostfix(["42"])).toEqual([42]);
  });

  test("handles expressions with decimals", () => {
    expect(infixToPostfix(["1.23", "+", "3.45"])).toEqual([1.23, 3.45, "+"]);
  });

  test("handles empty input", () => {
    expect(infixToPostfix([])).toEqual([]);
  });
});

describe("evaluatePostfix", () => {
  test("evaluates simple addition in postfix notation", () => {
    expect(evaluatePostfix([2, 3, "+"])).toBe(5);
  });

  test("evaluates simple subtraction in postfix notation", () => {
    expect(evaluatePostfix([5, 4, "-"])).toBe(1);
  });

  test("evaluates simple multiplication in postfix notation with asterix (*)", () => {
    expect(evaluatePostfix([6, 7, "*"])).toBe(42);
  });

  test("evaluates simple multiplication in postfix notation with x symbol", () => {
    expect(evaluatePostfix([8, 9, "x"])).toBe(72);
  });

  test("evaluates simple division in postfix notation with /", () => {
    expect(evaluatePostfix([8, 2, "/"])).toBe(4);
  });

  test("evaluates simple division in postfix notation with ÷ symbol", () => {
    expect(evaluatePostfix([8, 2, "÷"])).toBe(4);
  });

  test("evaluates a complex expression in postfix notation", () => {
    expect(evaluatePostfix([5, 1, 2, "+", 4, "*", "+", 3, "-"])).toBe(14);
  });

  test("evaluates expression with decimal numbers in postfix notation", () => {
    expect(evaluatePostfix([1.23, 4.56, "+"])).toBeCloseTo(5.79, 2);
  });

  test("handles division by zero in postfix notation", () => {
    expect(evaluatePostfix([5, 0, "/"])).toBe(Infinity);
  });

  test("handles a single number in postfix notation", () => {
    expect(evaluatePostfix([42])).toBe(42);
  });

  test("evaluates multiple operations in postfix notation", () => {
    expect(evaluatePostfix([3, 4, "+", 2, "*", 7, "/"])).toBe(2);
  });

  test("evaluates expression with a negative result in postfix notation", () => {
    expect(evaluatePostfix([5, 10, "-"])).toBe(-5);
  });
});

describe("handleDecimalPoint", () => {
  test("appends a decimal point to a number without a decimal", () => {
    expect(handleDecimalPoint("123")).toBe("123.");
  });

  test("prevents appending a second decimal point to the current operand", () => {
    expect(handleDecimalPoint("123.")).toBe("123.");
    expect(handleDecimalPoint("123.45")).toBe("123.45");
  });

  test("appends a decimal point after an operator", () => {
    expect(handleDecimalPoint("123+")).toBe("123+0.");
    expect(handleDecimalPoint("123-")).toBe("123-0.");
  });

  test("appends a decimal point after multiple operators", () => {
    expect(handleDecimalPoint("123+45*")).toBe("123+45*0.");
  });

  test("returns the display value unchanged if it already ends with a decimal point", () => {
    expect(handleDecimalPoint("123.")).toBe("123.");
  });

  test("appends a decimal point to the last number after various operators", () => {
    expect(handleDecimalPoint("12+34-56*78/90")).toBe("12+34-56*78/90.");
  });

  test("appends a decimal point to a single-digit number", () => {
    expect(handleDecimalPoint("5")).toBe("5.");
  });

  test("appends a decimal point to empty display value", () => {
    expect(handleDecimalPoint("")).toBe("0.");
  });

  test("returns the display value unchanged if it ends with an operator followed by a decimal point", () => {
    expect(handleDecimalPoint("5+")).toBe("5+0.");
    expect(handleDecimalPoint("5+0.")).toBe("5+0.");
  });
});

describe("handleOperator", () => {
  test("replaces the last operator with a new operators", () => {
    expect(handleOperator("5+", "-")).toBe("5-");
    expect(handleOperator("5+", "+")).toBe("5+");
  });

  test("appends an operator when there is no existing operator at the end", () => {
    expect(handleOperator("2", "-")).toBe("2-");
  });

  test("does not append an operator if the display value is empty", () => {
    expect(handleOperator("", "/")).toBe("");
  });
});

describe("isOperator", () => {
  test("returns true for all valid operators", () => {
    expect(isOperator("+")).toBe(true);
    expect(isOperator("-")).toBe(true);
    expect(isOperator("*")).toBe(true);
    expect(isOperator("/")).toBe(true);
    expect(isOperator("x")).toBe(true);
    expect(isOperator("÷")).toBe(true);
  });

  test("returns false for invalid operators", () => {
    expect(isOperator("a")).toBe(false);
    expect(isOperator("1")).toBe(false);
    expect(isOperator("^")).toBe(false);
    expect(isOperator(".")).toBe(false);
    expect(isOperator(" ")).toBe(false);
    expect(isOperator("")).toBe(false);
  });
});

describe("isDecimal", () => {
  test("returns true for a decimal point", () => {
    expect(isDecimal(".")).toBe(true);
  });

  test("returns false for non-decimal points", () => {
    expect(isDecimal("+")).toBe(false);
    expect(isDecimal("-")).toBe(false);
    expect(isDecimal("*")).toBe(false);
    expect(isDecimal("/")).toBe(false);
    expect(isDecimal("x")).toBe(false);
    expect(isDecimal("÷")).toBe(false);
    expect(isDecimal("1")).toBe(false);
    expect(isDecimal("")).toBe(false);
  });
});
