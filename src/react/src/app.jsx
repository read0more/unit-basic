import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import "./app.css";
import Habits from "./components/habits";
import Navbar from "./components/navbar";
import HabitPresenter from "./habit_presenter";

/**
 * @param {object} props
 * @param {HabitPresenter} props.habitPresenter
 */
const App = ({ habitPresenter }) => {
  const [habits, setHabits] = useState(habitPresenter.getHabits());

  const handleIncrement = useCallback((habit) => {
    habitPresenter.increment(habit, setHabits);
  }, []);

  const handleDecrement = useCallback((habit) => {
    habitPresenter.decrement(habit, setHabits);
  }, []);

  const handleDelete = useCallback((habit) => {
    habitPresenter.delete(habit, setHabits);
  }, []);

  const handleAdd = useCallback((name) => {
    habitPresenter.add(name, setHabits);
  }, []);

  const handleReset = useCallback(() => {
    habitPresenter.reset(setHabits);
  }, []);

  return (
    <>
      <Navbar totalCount={habits.filter((item) => item.count > 0).length} />
      <Habits
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onReset={handleReset}
      />
    </>
  );
};

export default App;
