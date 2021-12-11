import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../navbar";
import renderer from "react-test-renderer";

describe("Navbar", () => {
  it("renders", () => {
    const component = renderer.create(<Navbar totalCount={4} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
