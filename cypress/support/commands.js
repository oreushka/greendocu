Cypress.Commands.add("login", (email, password) => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.get("input[id=email]").click().type(email);
  cy.get("input[id=password]").click().type(password);
  cy.get("form > button").click();
});

Cypress.Commands.add(
  "takeScreen",
  (width, height, url, waitTime, fileName, overwrite) => {
    cy.viewport(width, height);
    cy.visit(url);
    cy.wait(waitTime);
    cy.screenshot(fileName, { overwrite: overwrite });
  }
);
