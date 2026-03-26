class BlogElements {
  searchOpen = () => 'a.astra-search-icon[aria-label="Search button"]';
  searchField = () => '.search-field, input[type="search"]';
  
  archiveTitle = () => 'h1.page-title, .ast-archive-description .page-title';
  noResultsTitle = () => 'section.no-results h1.page-title, .nothing-found, .no-results-title';
  noResultsContent = () => 'section.no-results .page-content, .no-results';
  
  article = () => 'article';
  articleLink = () => 'article h2 a';
}
export default new BlogElements();
