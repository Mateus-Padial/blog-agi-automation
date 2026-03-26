import BlogPage from '../support/pages/BlogPage';

describe('Blog do Agi - Pesquisa de Artigos', () => {
  
  beforeEach(() => {
    BlogPage.visitBlog();
    BlogPage.verifyPageLoaded();
  });

  it('Cenário 1: Deve realizar uma pesquisa com sucesso e encontrar artigos', () => {
    const termoBusca = 'empréstimo';
    BlogPage.searchFor(termoBusca);
    BlogPage.verifySearchResults(termoBusca);
  });

  it('Cenário 2: Deve exibir mensagem de erro ao pesquisar termo inexistente', () => {
    const termoInexistente = 'termoinexistente123456';
    BlogPage.searchFor(termoInexistente);
    BlogPage.verifyNoResults();
  });

  it('Cenário 3: Deve clicar no primeiro artigo e validar navegação', () => {
    BlogPage.clickFirstArticle();
    cy.url().should('not.equal', 'https://blogdoagi.com.br/' );
  });
});
