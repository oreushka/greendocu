describe("Component screenshot", () => {
  const WIDTH = 1536;
  const HEIGHT = 754;
  it("Game screenshot", () => {
    cy.takeScreen(WIDTH, HEIGHT, "/", 500, "gamePage", true);
  });

  it("Login screenshot", () => {
    cy.takeScreen(WIDTH, HEIGHT, "/login", 500, "login", true);
  });

  it("Registration screenshot", () => {
    cy.takeScreen(WIDTH, HEIGHT, "/sign-up", 500, "registration", true);
  });
});
