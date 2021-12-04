const Calculator = require("../../calculator.js");

describe("Calculator", () => {
  let calculator;
  beforeEach(() => {
    calculator = new Calculator();
  });

  it("inits with 0", () => {
    expect(calculator.value).toBe(0);
  });

  it("sets", () => {
    calculator.set(12);
    expect(calculator.value).toBe(12);
  });

  it("clear", () => {
    calculator.set(12);
    calculator.clear();
    expect(calculator.value).toBe(0);
  });

  test("add", () => {
    calculator.add(2);
    expect(calculator.value).toBe(2);
  });

  test("add should throw an error if value is greater than 100", () => {
    expect(() => {
      calculator.add(101);
    }).toThrow("Value can not be greater than 100");
  });

  test("subtract", () => {
    calculator.subtract(3);
    expect(calculator.value).toBe(-3);
  });

  test("multiply", () => {
    calculator.set(3);
    calculator.multiply(3);
    expect(calculator.value).toBe(9);
  });

  describe("divides", () => {
    it("0 / 0 === NaN", () => {
      calculator.divide(0);
      expect(calculator.value).toBe(NaN);
    });

    it("1 / 0 === Infinity", () => {
      calculator.set(1);
      calculator.divide(0);
      expect(calculator.value).toBe(Infinity);
    });

    it("5 / 5 === 1", () => {
      calculator.set(5);
      calculator.divide(5);
      expect(calculator.value).toBe(1);
    });
  });
});
