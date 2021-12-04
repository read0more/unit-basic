class Stack {
  data = [];

  push(el) {
    this.data.push(el);
  }

  pop() {
    if (!this.data.length) throw Error("Stack is empty");
    return this.data.pop();
  }

  getData() {
    return [...this.data];
  }

  getSize() {
    return this.data.length;
  }
}

module.exports = Stack;
