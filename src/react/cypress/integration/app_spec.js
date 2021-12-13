/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

describe("habit tracker tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("renders", () => {
    cy.findByText("Habit Tracker");
  });

  it("increases the counter", () => {
    cy.findAllByTitle("increase").first().click();
    // cy.get(".habit-increase").eq(0).click();
    cy.findAllByTestId("habit-count").first().should("have.text", 1);
    // cy.get(".habit-count").eq(0).should("have.text", 1);
  });

  it("increases and decreases the counter", () => {
    cy.findAllByTitle("increase").first().click();
    // cy.get(".habit-increase").eq(0).click();
    cy.findAllByTestId("habit-count").first().should("have.text", 1);
    // cy.get(".habit-count").eq(0).should("have.text", 1);
    cy.findAllByTitle("decrease").first().click();
    // cy.get(".habit-decrease").eq(0).click();
    cy.findAllByTestId("habit-count").first().should("have.text", 0);
    // cy.get(".habit-count").eq(0).should("have.text", 0);
  });

  it("does not decreases below 0", () => {
    cy.findAllByTitle("decrease").first().click();
    cy.findAllByTestId("habit-count").first().should("have.text", 0);
  });

  it("adds new habit", () => {
    const newHabit = "fake habit";
    cy.findByPlaceholderText("Habit").type(newHabit);
    // cy.get(".add-input").type(newHabit);
    cy.findByText("Add").click();
    // cy.get(".add-button").click();
    cy.findAllByTestId("habit-name").last().should("have.text", newHabit);
    cy.findAllByTestId("habit-count").last().should("have.text", 0);
    // cy.get(".habit").last().find(".habit-name").should("have.text", newHabit);
  });

  it("counts only active habits", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("increase").last().click();
    // cy.get(".habit-increase").eq(0).click();
    // cy.get(".habit-increase").eq(1).click();
    cy.findAllByTestId("total-count").should("have.text", 2);
    // cy.get(".navbar-count").should("have.text", 2);
  });

  it("delete habit", () => {
    cy.findAllByTitle("delete").first().click();
    // cy.get(".habit-delete").eq(0).click();
    cy.findAllByTestId("habit-name").findByText("Reading").should("not.exist");
    cy.findAllByTestId("habit-name").should("have.length", 2);
  });

  it("resets all counters", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("increase").last().click();
    // cy.get(".habit-increase").eq(0).click();
    // cy.get(".habit-increase").eq(1).click();
    // cy.get(".habit-increase").eq(2).click();
    cy.findByText("Reset All").click();
    // cy.get(".habits-reset").click();
    cy.findAllByTestId("habit-count").each(($count) => {
      cy.wrap($count).should("have.text", 0);
      //   expect($count).to.have.text(0);
    });
  });
});
