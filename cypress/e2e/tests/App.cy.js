describe("My First Test", () => {
  const BASEURL = Cypress.config().baseUrl;
  const URLMAIN = BASEURL + "/";

  it("Number selection check", () => {
    cy.visit("/");
    cy.get(".edit").first().click();
    cy.get(".select > div")
      .first()
      .click()
      .then((theElement) => {
        const selectedNum = theElement.text();
        expect("1").to.equal(selectedNum);
      });
  });

  it("Checking restarting game button", () => {
    cy.visit("/");
    cy.contains("Начать сначала").click();
    cy.url().should("eq", URLMAIN);
  });
});
