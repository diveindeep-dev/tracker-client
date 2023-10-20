describe('Auth Test', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('url'));
  });

  it('can visit the index page and go to sign in page', () => {
    cy.contains('Sign In').click();
  });

  it('can sign in by the id and have token in local Storage and get signed user name', () => {
    cy.contains('Sign In').click();
    cy.get('[placeholder="ID"]').type(Cypress.env('id'));
    cy.get('[placeholder="Password"]').type(Cypress.env('password'));
    cy.get('button')
      .contains('Sign In')
      .click()
      .should(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(localStorage.getItem('token')).to.exist;
      });
    cy.get('header').should(($div) => expect($div).to.contain('e2e'));
  });

  it('can sign out', () => {
    cy.contains('Sign In').click();
    cy.get('[placeholder="ID"]').type(Cypress.env('id'));
    cy.get('[placeholder="Password"]').type(Cypress.env('password'));
    cy.get('button').contains('Sign In').click();
    cy.contains('Log Out').click();
    cy.get('header').should(($a) => {
      expect($a.first()).to.contain('Sign Up');
      expect($a.last()).to.contain('Sign In');
    });
  });
});