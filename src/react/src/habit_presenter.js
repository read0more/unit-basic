export default class HabitPresenter {
  #habits;
  constructor(habits, maxHabits) {
    this.#habits = habits;
    this.maxHabits = maxHabits;
  }

  getHabits() {
    return this.#habits;
  }

  increment(habit, update) {
    this.#habits = this.#habits.map((item) => {
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item;
    });
    typeof update === "function" && update(this.#habits);
  }

  decrement(habit, update) {
    this.#habits = this.#habits.map((item) => {
      if (item.id === habit.id) {
        const count = item.count - 1;
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return item;
    });
    typeof update === "function" && update(this.#habits);
  }

  delete(habit, update) {
    this.#habits = this.#habits.filter((item) => item.id !== habit.id);
    typeof update === "function" && update(this.#habits);
  }

  add(name, update) {
    if (this.#habits.length === this.maxHabits) {
      throw new Error(`습관의 갯수는 ${this.maxHabits}이상이 될 수 없습니다.`);
    }
    this.#habits = [...this.#habits, { id: Date.now(), name, count: 0 }];
    typeof update === "function" && update(this.#habits);
  }

  reset(update) {
    this.#habits = this.#habits.map((habit) => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }
      return habit;
    });
    typeof update === "function" && update(this.#habits);
  }
}
