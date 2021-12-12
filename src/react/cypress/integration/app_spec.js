describe("habit tracker tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("increases the counter", () => {
    cy.get(".habit-increase").eq(0).click();
    cy.get(".habit-count").eq(0).should("have.text", 1);
  });

  it("increases and decreases the counter", () => {
    cy.get(".habit-increase").eq(0).click();
    cy.get(".habit-count").eq(0).should("have.text", 1);
    cy.get(".habit-decrease").eq(0).click();
    cy.get(".habit-count").eq(0).should("have.text", 0);
  });

  it("adds new habit", () => {
    const newHabit = "fake habit";
    cy.get(".add-input").type(newHabit);
    cy.get(".add-button").click();
    cy.get(".habit").last().find(".habit-name").should("have.text", newHabit);
  });

  it("counts only active habits", () => {
    cy.get(".habit-increase").eq(0).click();
    cy.get(".habit-increase").eq(1).click();
    cy.get(".navbar-count").should("have.text", 2);
  });

  it("counts only active habits", () => {
    cy.get(".habit-delete").eq(0).click();
    cy.get(".habit").should("have.length", 2);
  });

  it("resets all counters", () => {
    cy.get(".habit-increase").eq(0).click();
    cy.get(".habit-increase").eq(1).click();
    cy.get(".habit-increase").eq(2).click();
    cy.get(".habits-reset").click();
    cy.get(".habit-count").each(($count) => {
      expect($count).to.have.text(0);
    });
  });
});
