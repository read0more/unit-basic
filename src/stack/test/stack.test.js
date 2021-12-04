const Stack = require("../stack");

describe("stack", () => {
  /**
   * @type {Stack}
   */
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  describe("getSize", () => {
    it("at first, size should be empty", () => {
      expect(stack.getSize()).toBe(0);
    });

    it("not empty", () => {
      stack.push(1);
      stack.push(1);
      expect(stack.getSize()).toBe(2);
    });
  });

  it("push", () => {
    stack.push(1);
    expect(stack.data).toEqual([1]);
  });

  describe("pop", () => {
    it("throw an error if stack is empty", () => {
      expect(() => stack.pop()).toThrow("Stack is empty");
    });

    it("pop item must be last pushed item", () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.push(4);
      const element = stack.pop();
      expect(element).toBe(4);
    });

    it("pop and get item", () => {
      stack.push(1);
      const element = stack.pop();
      expect(element).toBe(1);
    });
  });
});
