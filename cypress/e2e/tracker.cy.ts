describe('Auth Test', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('url'));
  });

  it('can visit the index page and can not make tracker', () => {
    cy.contains('HOME').click();
    cy.get('button[type=submit]').contains('MAKE TRACKER').should('be.disabled');
  });

  it('can add and delete tracker when singed in', () => {
    cy.contains('Sign In').click();
    cy.get('[placeholder="ID"]').type(Cypress.env('id'));
    cy.get('[placeholder="Password"]').type(Cypress.env('password'));
    cy.get('button')
      .contains('Sign In')
      .click();
    cy.get('header').should(($div) => expect($div).to.contain('e2e'));
    cy.get('[placeholder="What is TRACKED?"]').type('E2E TEST');
    cy.get('label[order=0]').click();
    cy.get('button[type=submit]').contains('MAKE TRACKER').should('be.not.disabled').click();
    cy.contains('E2E TEST').parent().prev().prev().click();
    cy.get('a').next('div').click().get('button').contains('DELETE').click();
    cy.url().should('include', '/home')
  });

});
