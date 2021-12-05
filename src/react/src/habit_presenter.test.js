import HabitPresenter from "./habit_presenter";

describe("habit presenter", () => {
  /**
   * @type HabitPresenter
   */
  let habitPresenter;

  beforeEach(() => {
    habitPresenter = new HabitPresenter([
      { id: 1, name: "Reading", count: 0 },
      { id: 2, name: "Running", count: 0 },
      { id: 3, name: "Coding", count: 0 },
    ]);
  });

  it("increment", () => {
    habitPresenter.increment(habitPresenter.getHabits()[1]);
    expect(habitPresenter.getHabits()[1].count).toBe(1);
  });

  describe("decrement", () => {
    it("when the count is 0, even if it decreases 0", () => {
      habitPresenter.decrement(habitPresenter.getHabits()[1]);
      expect(habitPresenter.getHabits()[1].count).toBe(0);
    });

    it("Check if the count goes down", () => {
      habitPresenter.increment(habitPresenter.getHabits()[1]);
      habitPresenter.increment(habitPresenter.getHabits()[1]);
      habitPresenter.decrement(habitPresenter.getHabits()[1]);
      expect(habitPresenter.getHabits()[1].count).toBe(1);
    });
  });

  it("delete", () => {
    const toBeDeletedHabit = habitPresenter.getHabits()[1];
    habitPresenter.delete(toBeDeletedHabit);
    expect(habitPresenter.getHabits()).not.toContain(toBeDeletedHabit);
  });

  it("add", () => {
    const newName = "new one";
    habitPresenter.add(newName);
    expect(habitPresenter.getHabits().pop()["name"]).toBe(newName);
  });

  it("reset", () => {
    habitPresenter.increment(habitPresenter.getHabits()[0]);
    habitPresenter.increment(habitPresenter.getHabits()[1]);
    habitPresenter.increment(habitPresenter.getHabits()[2]);
    habitPresenter.increment(habitPresenter.getHabits()[2]);
    habitPresenter.reset();

    for (const habit of habitPresenter.getHabits()) {
      expect(habit.count).toBe(0);
    }
  });
});
