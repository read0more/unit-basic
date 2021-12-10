import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HabitAddForm from "../habitAddForm";

describe("habit add form", () => {
  let onAdd;
  let input;
  let button;

  beforeEach(() => {
    onAdd = jest.fn();
    render(<HabitAddForm onAdd={onAdd} />);
    input = screen.getByPlaceholderText("Habit");
    button = screen.getByText("Add");
  });

  // 다르게 만들어 본 쪽
  // it("add habit", () => {
  //   render(<HabitAddForm onAdd={onAdd} />);
  //   const input = screen.getByPlaceholderText("Habit");
  //   const button = screen.getByText("Add");
  //   fireEvent.change(input, {
  //     target: { value: "test" },
  //   });
  //   fireEvent.click(button);
  //   expect(onAdd).toBeCalled();
  // });

  it("calls onAdd when button is clicked and valid habit is entered", () => {
    userEvent.type(input, "New Habit");
    userEvent.click(button);

    expect(onAdd).toHaveBeenCalledWith("New Habit");
  });

  it("does not calls onAdd when the habit is empty", () => {
    userEvent.type(input, "");
    userEvent.click(button);

    expect(onAdd).toHaveBeenCalledTimes(0);
  });
});
