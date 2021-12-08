import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import HabitAddForm from "../habitAddForm";

describe("habit add form", () => {
  it("add habit", () => {
    const onAdd = jest.fn();
    const { getByText, getAllByPlaceholderText } = render(
      <HabitAddForm onAdd={onAdd} />
    );
    fireEvent.change(getByLabelText(/Habit/i), { target: { value: "test" } });
    fireEvent.click(getByText(/Add/i));
    expect(onAdd).toBeCalled();
  });
});
