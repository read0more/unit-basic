import HabitPresenter from "./habit_presenter";

describe("habit presenter", () => {
  /**
   * @type HabitPresenter
   */
  let habitPresenter;
  let habits = [
    { id: 1, name: "Reading", count: 1 },
    { id: 2, name: "Running", count: 0 },
  ];

  const update = jest.fn();
  const maxHabits = 3;

  beforeEach(() => {
    habitPresenter = new HabitPresenter(habits, maxHabits);
  });

  it("inits with habits", () => {
    expect(habitPresenter.getHabits()).toEqual(habits);
  });

  it("increments habit count", () => {
    habitPresenter.increment(habitPresenter.getHabits()[0], update);
    expect(habitPresenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled();
  });

  describe("decrement", () => {
    it("does not set the count value below 0 when decrements", () => {
      habitPresenter.decrement(habitPresenter.getHabits()[0], update);
      habitPresenter.decrement(habitPresenter.getHabits()[0], update);
      expect(habitPresenter.getHabits()[0].count).toBe(0);
    });

    it("decrements habit count", () => {
      habitPresenter.decrement(habitPresenter.getHabits()[0], update);
      expect(habitPresenter.getHabits()[0].count).toBe(0);
      checkUpdateIsCalled();
    });
  });

  it("delete habit from the list", () => {
    const toBeDeletedHabit = habitPresenter.getHabits()[1];
    habitPresenter.delete(toBeDeletedHabit, update);
    expect(habitPresenter.getHabits()).not.toContain(toBeDeletedHabit);
    checkUpdateIsCalled();
  });

  it("add new habit to the list", () => {
    const newName = "new one";
    habitPresenter.add(newName, update);
    expect(habitPresenter.getHabits().pop()["name"]).toBe(newName);
    checkUpdateIsCalled();
  });

  it("throws an error when the max habitx limit is exceeded", () => {
    habitPresenter.add("new", update);
    expect(() => {
      habitPresenter.add("new", update);
    }).toThrow(`습관의 갯수는 ${maxHabits}이상이 될 수 없습니다.`);
  });

  describe("reset", () => {
    it("reset all habit count to 0", () => {
      habitPresenter.reset(update);

      for (const habit of habitPresenter.getHabits()) {
        expect(habit.count).toBe(0);
      }
      checkUpdateIsCalled();
    });

    it("does not create new object when count is 0", () => {
      const habits = habitPresenter.getHabits();
      habitPresenter.reset(update);
      const updatedHabits = habitPresenter.getHabits();

      expect(habits[1]).toBe(updatedHabits[1]);
    });
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(habitPresenter.getHabits());
  }
});
