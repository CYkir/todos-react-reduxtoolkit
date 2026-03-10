describe("Todo App E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("menampilkan todo dari API", () => {
    cy.contains("Belum Selesai");
  });

  it("menambahkan todo baru", () => {
    cy.get("input").type("Testing Cypress");
    cy.get("button[type=submit]").click();

    cy.contains("Testing Cypress");
  });

  it("toggle todo", () => {
    cy.get("article").first().click();
  });

  it("hapus todo", () => {
    cy.get("article").first().find("button").last().click();
  });
});
