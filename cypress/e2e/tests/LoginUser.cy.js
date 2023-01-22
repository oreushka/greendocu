describe("Login User Test", () => {
  const EMAIL = "www@mail.ru";
  const PASSWORD = "123456";

  const BASEURL = Cypress.config().baseUrl;
  const URLMAIN = BASEURL + "/";
  const URLPROFILE = BASEURL + "/profile";
  const URLLOGIN = BASEURL + "/login";

  it("Checking login function", () => {
    cy.visit("/login");
    cy.login(EMAIL, PASSWORD);
    cy.url().should("eq", URLPROFILE);
  });

  it("Checking logout function", () => {
    cy.visit("/login");
    cy.login(EMAIL, PASSWORD);
    cy.get(".header > div > a").then((theElement) => {
      const selectedNum = theElement.text();
      expect("Выйти").to.equal(selectedNum);
    });
    cy.get(".header > div > a").click();
    cy.url().should("eq", URLLOGIN);
    cy.get("form > button").click();
    cy.url().should("eq", URLLOGIN);
  });

  it("Checking button Play", () => {
    cy.visit("/login");
    cy.login(EMAIL, PASSWORD);
    cy.get(".greenHeader").click();
    cy.url().should("eq", URLMAIN);
  });

  it("Checking User's Statistics", () => {
    cy.visit("/login");
    cy.login(EMAIL, PASSWORD);

    let gamesNum;
    let victoriesNum;
    cy.get(".results > p > b")
      .eq("1")
      .then((theElement) => {
        gamesNum = theElement.text();
      });
    cy.get(".results > p > b")
      .eq("0")
      .then((theElement) => {
        victoriesNum = theElement.text();
      });
    cy.get(".greenHeader").click();
    cy.get(".edit").first().click();
    cy.get(".select > div").first().click();

    cy.get(".header > div > a").click();
    cy.get(".results > p > b")
      .eq("1")
      .then((theElement) => {
        expect(String(Number(gamesNum) + 1)).to.equal(theElement.text());
      });
    cy.get(".results > p > b")
      .eq("0")
      .then((theElement) => {
        expect(victoriesNum).to.equal(theElement.text());
      });
  });
});
