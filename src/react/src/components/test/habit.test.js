import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Habit from "../habit";
import renderer from "react-test-renderer";

describe("habit", () => {
  let habit;
  let onIncrement;
  let onDecrement;
  let onDelete;
  let HabitComponent;

  beforeEach(() => {
    habit = { id: 1, name: "Habit", count: 3 };
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    HabitComponent = (
      <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    );
  });

  it("renders", () => {
    const component = renderer.create(HabitComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Button Click", () => {
    beforeEach(() => {
      render(HabitComponent);
    });

    it("calls onIncrement when clicking 'increase' button", () => {
      const button = screen.getByTitle("increase");
      userEvent.click(button);
      expect(onIncrement).toHaveBeenCalledWith(habit);
    });

    it("calls onDecrement when clicking 'decrease' button", () => {
      const button = screen.getByTitle("decrease");
      userEvent.click(button);
      expect(onDecrement).toHaveBeenCalledWith(habit);
    });

    it("calls onDelete when clicking 'delete' button", () => {
      const button = screen.getByTitle("delete");
      userEvent.click(button);
      expect(onDelete).toHaveBeenCalledWith(habit);
    });
  });
});
