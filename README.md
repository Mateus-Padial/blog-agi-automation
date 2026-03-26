# Blog do Agi - Automação de Testes com Cypress

## Visão Geral

Este projeto implementa uma **suite de automação de testes web** para o **Blog do Agi** (https://blogdoagi.com.br/) utilizando **Cypress**.

## Objetivo

Automatizar os cenários mais relevantes para testes do Blog do Agi, focando em:

1. **Pesquisa de Artigos**: Validar a funcionalidade de busca por palavras-chave
2. **Navegação de Artigos**: Verificar a navegação entre artigos e estrutura da página

## Requisitos

- **Node.js** 14.0.0 ou superior
- **npm** 6.0.0 ou superior
- **Navegador**: Chrome, Firefox, Edge ou Safari (Cypress suporta todos)

## Instalação

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd blog-agi-automation
```

### 2. Instalar dependências

```bash
npm install
```

Isso instalará o Cypress e todas as dependências necessárias.

## Estrutura do Projeto

```
blog-agi-automation/
├── cypress/
│   ├── e2e/                          # Testes end-to-end
│   │   ├── search_articles.cy.js      # Testes de pesquisa de artigos
│   │   └── article_navigation.cy.js   # Testes de navegação de artigos
│   ├── support/
│   │   ├── e2e.js                     # Configurações e comandos customizados
│   │   └── pages/
│   │       └── BlogPage.js            # Page Object para o Blog
│   └── fixtures/                      # Dados de teste (se necessário)
├── cypress.config.js                  # Configuração do Cypress
├── package.json                       # Dependências do projeto
├── .gitignore                         # Arquivos a ignorar no Git
└── README.md                          # Este arquivo
```

## Configuração

### Arquivo de Configuração: `cypress.config.js`

O arquivo `cypress.config.js` contém as configurações principais:

```javascript
{
  baseUrl: 'https://blogdoagi.com.br/',
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  specPattern: 'cypress/e2e/**/*.cy.js'
}
```

Para modificar configurações, edite o arquivo `cypress.config.js`.

## Executando os Testes

### Executar todos os testes (modo headless)

```bash
npm test
```

Ou:

```bash
npm run test:all
```

### Executar testes com interface gráfica

```bash
npm run test:open
```

Isso abrirá o Cypress Test Runner, permitindo visualizar os testes em tempo real.

### Executar testes com navegador visível

```bash
npm run test:headed
```

### Executar testes em navegadores específicos

```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Edge
npm run test:edge
```

### Executar suite específica

```bash
# Testes de pesquisa
npm run test:search

# Testes de navegação
npm run test:navigation
```

### Executar teste específico

```bash
npm run test:spec 'cypress/e2e/search_articles.cy.js'
```

## Cenários de Teste

### Suite 1: Pesquisa de Artigos (`search_articles.cy.js`)

Valida a funcionalidade de busca do blog:

| Cenário | Descrição |
| :--- | :--- |
| **Cenário 1** | Verifica se artigos são exibidos na página inicial |
| **Cenário 2** | Pesquisa por "empréstimo" e valida resultados |
| **Cenário 3** | Pesquisa por "cartão" e valida resultados |
| **Cenário 4** | Verifica se múltiplos artigos são exibidos e clicáveis |
| **Cenário 5** | Navega pela pesquisa e retorna à página inicial |

**Objetivos Validados:**
- ✅ Artigos são carregados corretamente
- ✅ Funcionalidade de pesquisa funciona
- ✅ Resultados contêm a palavra-chave pesquisada
- ✅ Navegação entre pesquisa e homepage funciona

### Suite 2: Navegação de Artigos (`article_navigation.cy.js`)

Valida a navegação e estrutura dos artigos:

| Cenário | Descrição |
| :--- | :--- |
| **Cenário 1** | Verifica estrutura e conteúdo da página inicial |
| **Cenário 2** | Valida estrutura de cada artigo |
| **Cenário 3** | Clica em artigo e verifica navegação |
| **Cenário 4** | Verifica conteúdo da página do artigo |
| **Cenário 5** | Valida acessibilidade de múltiplos artigos |
| **Cenário 6** | Verifica validade dos links dos artigos |
| **Cenário 7** | Testa responsividade em diferentes viewports |

**Objetivos Validados:**
- ✅ Estrutura HTML dos artigos é correta
- ✅ Links são válidos e acessíveis
- ✅ Navegação entre artigos funciona
- ✅ Página é responsiva em diferentes tamanhos

## Page Object Model

O projeto utiliza o padrão **Page Object Model** para melhor manutenibilidade:

### BlogPage.js

Encapsula todas as interações com o Blog do Agi:

```javascript
// Exemplo de uso
import BlogPage from '../support/pages/BlogPage';

BlogPage.visitBlog();
BlogPage.searchFor('empréstimo');
BlogPage.verifyArticlesDisplayed();
```

**Métodos Disponíveis:**

| Método | Descrição |
| :--- | :--- |
| `visitBlog()` | Navega para a página inicial do blog |
| `verifyPageLoaded()` | Verifica se a página foi carregada |
| `openSearch()` | Abre a funcionalidade de pesquisa |
| `searchFor(term)` | Realiza uma pesquisa com o termo fornecido |
| `getArticleCount()` | Retorna a quantidade de artigos |
| `verifyArticlesDisplayed()` | Verifica se artigos estão visíveis |
| `getFirstArticleTitle()` | Retorna o título do primeiro artigo |
| `clickFirstArticle()` | Clica no primeiro artigo |
| `clearSearch()` | Limpa o campo de pesquisa |

## Comandos Customizados

O arquivo `cypress/support/e2e.js` define comandos customizados:

```javascript
// Pesquisar artigo
cy.searchArticle('empréstimo');

// Aguardar carregamento de artigos
cy.waitForArticles();

// Obter contagem de artigos
cy.getArticleCount();
```

## Relatório de Execução

Após executar os testes, o Cypress gera:

- **Videos**: `cypress/videos/` - Gravações dos testes
- **Screenshots**: `cypress/screenshots/` - Capturas de tela em caso de falha

Para visualizar os relatórios:

```bash
# Abrir pasta de videos
open cypress/videos/

# Abrir pasta de screenshots
open cypress/screenshots/
```

## Integração Contínua (CI/CD)

### GitHub Actions

Para executar os testes automaticamente em cada push, crie o arquivo `.github/workflows/cypress.yml`:

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
```

