import BlogPage from '../support/pages/BlogPage';
import BlogElements from '../support/elements/BlogElements';

describe('Blog do Agi - Navegação de Artigos', () => {

  beforeEach(() => {
    BlogPage.visitBlog();
    BlogPage.verifyPageLoaded();
  });

 it('Cenário 1: Deve validar a estrutura e o conteúdo da página inicial', () => {
    BlogPage.verifyArticlesDisplayed();
    cy.get('body').should('contain', 'Agi');
  });

  it('Cenário 2: Deve validar se os artigos possuem links válidos', () => {
    BlogPage.getArticleCount().then((count) => {
      expect(count).to.be.greaterThan(0);
      cy.log(`Encontrados ${count} links de artigos`);
    });
  });

  it('Cenário 3: Deve clicar no primeiro artigo e validar a navegação', () => {
    BlogPage.clickFirstArticle();
    cy.url().should('not.equal', 'https://blogdoagi.com.br/' );
  });

  it('Cenário 4: Deve validar se a página do artigo possui conteúdo', () => {
    BlogPage.clickFirstArticle();
    cy.url().should('not.eq', 'https://blogdoagi.com.br/' );
    cy.get('body').should('be.visible');
    cy.get('h1, .entry-title', { timeout: 15000 }).should('be.visible');
    cy.go('back');
    cy.url().should((url) => {
      expect(url).to.match(/blogdoagi\.com\.br|agibank\.com\.br/);
    });
  });

  it('Cenário 5: Deve validar se múltiplos artigos estão acessíveis', () => {
    BlogPage.verifyArticlesDisplayed();
    BlogPage.getArticleCount().then((count) => {
      expect(count).to.be.greaterThan(0);
    });
  });

  it('Cenário 6: Deve validar se os links dos artigos contêm URLs válidas', () => {
    cy.get(BlogElements.articleLink()).each(($link, index) => {
      if (index < 5) {
        const href = $link.attr('href');
        expect(href).to.not.be.empty;
        expect(href).to.match(/^https?:\/\// );
        cy.log(`Link ${index + 1} verificado: ${href}`);
      }
    });
  });

  it('Cenário 7: Deve validar a responsividade da página', () => {
    cy.viewport('iphone-x');
    cy.reload();
    BlogPage.verifyArticlesDisplayed();
    
    cy.viewport('ipad-2');
    cy.reload();
    BlogPage.verifyArticlesDisplayed();
    
    cy.viewport(1280, 720);
  });
});