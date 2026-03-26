import BlogElements from '../elements/BlogElements';

class BlogPage {
  visitBlog() {
    cy.visit('https://blogdoagi.com.br/', { failOnStatusCode: false });
    Cypress.on('uncaught:exception', () => false);
  }

  verifyPageLoaded() {
    cy.get('body').should('be.visible');
  }

  openSearch() {
    cy.get(BlogElements.searchOpen(), { timeout: 15000 })
      .should('exist')
      .filter(':visible')
      .first()
      .then($el => { if ($el.length) { $el[0].click(); } }).click();
  }

  searchFor(searchTerm) {
    this.openSearch();
    cy.get(BlogElements.searchField(), { timeout: 15000 })
      .first()
      .invoke('val', searchTerm)
      .trigger('input', { force: true })
      .trigger('change', { force: true });

    cy.wait(1000);
  }

  verifyNoResults() {
    cy.wait(5000)
    cy.get(BlogElements.searchOpen(), { timeout: 10000 }).click()
    cy.get(BlogElements.searchField(), { timeout: 10000 }).first().type('{enter}')
    cy.contains('termoinexistente123456', { timeout: 10000 })
      .should('be.visible');
  }

  verifySearchResults(searchTerm) {
    cy.get('body').should('be.visible');
    cy.get(BlogElements.searchField()).first().type('{enter}', { force: true });
    cy.get('h1', { timeout: 15000 }).should('contain', searchTerm);
  }

  verifyArticlesDisplayed() {
    cy.get(BlogElements.article(), { timeout: 10000 }).should('have.length.greaterThan', 0);
  }

  clickFirstArticle() {
    cy.get(BlogElements.articleLink()).first().click({ force: true });
  }

  getArticleCount() {
    return cy.get(BlogElements.article()).its('length');
  }
}

export default new BlogPage();
