export default class NewsletterPage {
    constructor() {
        this.tableHeaders = '[data-cy="headers"]';
        this.icon = '.App-header';
        this.pageTitle = "#titleText";
        this.searchBar = '[placeholder="Search…"]';
        this.tableContents = 'tbody';
        this.tableRows = 'tr';
        this.loadMoreButton = '[data-cy="more"]';
    }

    getTableHeaders() {
        return cy.get(this.tableHeaders);
    }
    getPageIcon() {
        return cy.get(this.icon).children();
    }
    getPageTitle() {
        return cy.get(this.pageTitle);
    }
    getSearchBar() {
        return cy.get(this.searchBar);
    }
    getTableContents() {
        return cy.get(this.tableContents);
    }
    getTableRows() {
        return cy.get(this.tableRows);
    }
    getLoadMoreButton() {
        return cy.get(this.loadMoreButton);
    }
}