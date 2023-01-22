describe("Registration Test", () => {
  const FIRSTNAME = "NoName";
  const EMAIL = "NoName@mail.ru";
  const PASSWORD = "NoName";

  const URLSIGNUP = "http://127.0.0.1:5000/sign-up";
  const URLMAIN = "http://127.0.0.1:5000/";

  it("Checking login function", () => {
    cy.visit("/login");
    cy.get(".registration > a").click();
    cy.get("input[id=firstName]").click().type(FIRSTNAME);
    cy.get("input[id=email]").click().type(EMAIL);
    cy.get("input[id=password1]").click().type(PASSWORD);
    cy.get("input[id=password2]").click().type(PASSWORD);
    cy.get("form > button").click();
    cy.url().should("eq", URLSIGNUP); // if user is already exist
    // cy.url().should("eq", URLMAIN); // created new user
  });
});
