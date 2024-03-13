const desktopWidth = 1366;
const desktopHeight = 768;
const mobileWidth = 360;
const mobileHeight = 640;

describe ("checking books", () => {
    beforeEach (() => {
        cy.viewport(desktopHeight, desktopWidth, mobileHeight, mobileWidth);
        cy.visit("/");
        cy.login("test@test.com", "test");
    });

    it("should to add a book to favorites", () => {
        cy.addBook("Война и мир",
        "В романе рассказывается о союзах и войнах между Россией и Францией в начале XIX века, а также о жизни персонажей, увлекаемых историческими событиями.",
        "Толстой Лев Николаевич");
        cy.get('h4').click();
        cy.contains("Война и мир");
    });
            
    it("should not add book without title on page", () => {
        cy.addBook(
          "",
          "В романе рассказывается о союзах и войнах между Россией и Францией в начале XIX века, а также о жизни персонажей, увлекаемых историческими событиями.",
        "Толстой Лев Николаевич");
        cy.get('#title').then($el => cy.log($el));
        cy.get('#title').then($el => $el[0].checkValidity()).should('be.false'); 
        cy.get('#title').then(($el) => $el[0].validationMessage)
        .should('be.equal', 'Заполните это поле.');
    });

    it("Should to remove a book from favorites", () => {
        cy.addBook("Война и мир",
        "В романе рассказывается о союзах и войнах между Россией и Францией в начале XIX века, а также о жизни персонажей, увлекаемых историческими событиями.",
        "Толстой Лев Николаевич");
        cy.contains('Favorites').click(); 
        cy.contains('Delete from favorite').click(); 
        cy.contains("Please add some book to favorit on home page!").should("be.visible");
    });
});