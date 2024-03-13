const desktopWidth = 1366;
const desktopHeight = 768;
const mobileWidth = 360;
const mobileHeight = 640;

describe('login test', () => {
  beforeEach (() => {
    cy.viewport(desktopHeight, desktopWidth, mobileHeight, mobileWidth);
    cy.visit("/");
  });

  it('should login successfully', () => {    
    cy.login("test@test.com", "test");
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
  });
  
  it('should test wrong mail', () => {    
    cy.login(null, "test");
    cy.get('#mail').then( (elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.equal('Заполните это поле.');
    });
  });

  it('should test wrong password', () => {    
    cy.login("test@test.com", null); 
    cy.get('#pass').then( (elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.equal('Заполните это поле.');
    });
  });  
});