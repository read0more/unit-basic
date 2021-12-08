import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import HabitAddForm from "../habitAddForm";

describe("habit add form", () => {
  it("add habit", () => {
    const onAdd = jest.fn();
    render(<HabitAddForm onAdd={onAdd} />);
    const input = screen.getByPlaceholderText("Habit");
    const button = screen.getByText("Add");
    fireEvent.change(input, {
      target: { value: "test" },
    });
    fireEvent.click(button);
    expect(onAdd).toBeCalled();
  });
});
