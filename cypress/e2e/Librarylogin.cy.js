const desktopWidth = 1024;
const desktopHeight = 768;
const mobileWidth = 360;
const mobileHeight = 640;

describe('Login tests', () => {
  beforeEach(()=> {
    cy.viewport(desktopHeight, desktopWidth, mobileHeight, mobileWidth);
  
    cy.visit('/');
  })

  it('should login successfully', () =>{ 
    
    
    cy.contains('Log in').click();
    cy.login ("test@test.com","test");
    cy.get('form > .ml-2').click();
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
  })

  it('should test wrong mail', ()=> {
    cy.contains('Log in').click();
    cy.login(" ", "test")
    cy.get('#mail').then($el => cy.log($el));
    cy.get('#mail').then($el => $el[0].checkValidity()).should('be.false');
    cy.get('#mail').then(($el) => $el[0].validationMessage)
    .should('be.equal', 'Заполните это поле.');
  });
 it('should test wrong password', ()=> {
    cy.contains('Log in').click();
    cy.login("test@test.com", "")
    cy.get('#pass').then($el => cy.log($el));
    cy.get('#pass').then($el => $el[0].checkValidity()).should('be.false');
    cy.get('#pass').then(($el) => $el[0].validationMessage)
    .should('be.equal', 'Заполните это поле.');
  });
})