/// <reference types="Cypress" />
import NewsletterPage from '../support/pageObjects/newsletterPage'
describe('Delete emails from the list', () => {

    const newsletterPage = new NewsletterPage();
    const rowNumber = 16;

    // Verify that the delete button is only enabled for drafts
    it('Check the delete button for various statuses', () => {
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows().each((row, index, $list) => {
                let status = row.children().eq(2);
                if(status.text() === 'Draft') {
                    expect(row.children()
                        .eq(5)
                        .children())
                        .to.be.enabled;     
                }
                else if (status.text() === 'Sent') {
                    expect(row.children()
                        .eq(5)
                        .children())
                        .to.be.disabled;
                }
            });
        });
    });

    // Verify that user can delete entries in draft state
    it('Delete emails in draft status', () => {
        let nameOfRow;
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows().each((row, index, $list) => {
                let status = row.children().eq(2); 
                if(status.text() === 'Draft') {
                    nameOfRow = row.children().eq(0).text();
                    row.children()
                        .eq(5)
                        .children()
                        .click();
                    newsletterPage.getTableRows()
                        .should('not.contain.text', nameOfRow);
                    return false;
                }  
            });
        }); 
        newsletterPage.getLoadMoreButton()
            .should('be.visible')
            .click();
        newsletterPage.getTableContents().within(() => {
            newsletterPage.getTableRows()
                .should('have.length', rowNumber-1);
        });
    });
});