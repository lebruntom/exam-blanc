describe("Search Test", () => {
  it("should visit localhost and verify login button text", () => {
    // Visiter l'URL localhost:5173
    cy.visit("http://localhost:5173/");

    // Sélectionner le bouton avec la classe 'login-button' et vérifier son texte
    cy.get(".login-button").should("have.text", "Connexion");
  });
});
