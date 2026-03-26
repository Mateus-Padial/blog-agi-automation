
Cypress.on('uncaught:exception', (err, runnable) => {
  
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});


Cypress.Commands.add('searchArticle', (searchTerm) => {
  cy.get('input[type="search"], input[placeholder*="search" i], input[placeholder*="pesquisa" i]')
    .first()
    .type(searchTerm)
    .should('have.value', searchTerm);
});


Cypress.Commands.add('waitForArticles', () => {
  cy.get('article, .post, .article-card, [class*="post"], [class*="article"]')
    .should('have.length.greaterThan', 0);
});


Cypress.Commands.add('getArticleCount', () => {
  return cy.get('article, .post, .article-card, [class*="post"], [class*="article"]')
    .its('length');
});
