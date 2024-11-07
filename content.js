/**
 * Salesforce Enhancement Script for bswift Client IDs
 * 
 * This script adds utility buttons next to bswift Client IDs in Salesforce:
 * 1. SharePoint Search: Directly search for client documents in SharePoint
 * 2. Role Search: Copy ID and open bswift role search page
 * 
 * Key Functions:
 * - findBswiftIdCells(): Locates valid bswift Client IDs in both list and detail views
 * - addButtonsToBswiftIds(): Creates and adds the utility buttons next to each ID
 * 
 * The script automatically handles dynamic page updates using a MutationObserver
 * to maintain functionality as new content loads.
 */

// Base URL for SharePoint document search - this URL template allows searching within the Audits folder
const SHAREPOINT_BASE_URL = "<Production Link Removed> - Example URL: https://CompanyDomain.sharepoint.com/sites/&q=";

// Locates all cells containing valid bswift Client IDs in the Salesforce interface
function findBswiftIdCells() {
  const idElements = Array.from(document.querySelectorAll('.slds-truncate.uiOutputTextArea, lightning-formatted-text'));
  
  return idElements.filter(el => {
    const isTableCell = el.closest('td.slds-cell-edit');
    const isFormField = el.closest('.slds-form-element')?.querySelector('.test-id__field-label')?.textContent === 'bswift Client Id';
    return (isTableCell || isFormField);
  }).map(el => el.closest('td.slds-cell-edit') || el.closest('.slds-form-element__control'));
}

// Adds SharePoint search and Role Search buttons next to each bswift ID
function addButtonsToBswiftIds() {
  const bswiftIdCells = findBswiftIdCells();
  
  bswiftIdCells.forEach(cell => {
    // Skip if buttons are already added to this cell
    if (cell.querySelector('.search-button')) return;
    
    // Get the bswift ID from the cell
    const idSpan = cell.querySelector('.slds-truncate.uiOutputTextArea, lightning-formatted-text');
    const fullId = idSpan.textContent.trim();
    const bswiftId = fullId.replace(/\D/g, '');
    
    // Create container for buttons with consistent spacing
    const buttonContainer = document.createElement('span');
    buttonContainer.style.marginLeft = '8px';
    
    // Create SharePoint search button - opens SharePoint document search in new tab
    const searchButton = document.createElement('button');
    searchButton.className = 'search-button slds-button slds-button_icon';
    searchButton.style.marginRight = '4px';
    searchButton.innerHTML = `
      <img src="<Removed>" 
           alt="SharePoint" 
           style="width: 16px; height: 16px; vertical-align: middle;"
      />
      <span class="slds-assistive-text">Search SharePoint</span>
    `;
    searchButton.onclick = (e) => {
      e.stopPropagation();
      window.open(`${SHAREPOINT_BASE_URL}${bswiftId}`, '_blank');
    };
    
    // Create Role Search button - only copies ID and shows tooltip
    const roleSearchButton = document.createElement('button');
    roleSearchButton.className = 'role-search-button slds-button';
    roleSearchButton.style.marginLeft = '4px';
    roleSearchButton.style.minWidth = '20px';
    roleSearchButton.style.padding = '0 4px';
    roleSearchButton.innerHTML = `
      <img src="<Removed>" 
           alt="b" 
           style="width: 16px; height: 16px; vertical-align: middle;"
      />
    `;
    roleSearchButton.onclick = async (e) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(bswiftId);
        alert('ID copied to clipboard!\nRedirecting to bswift welcome page.');
        window.open('<Removed>');

      } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy ID. Please copy manually.\nRedirecting to bswift welcome page.');
        window.open('<Removed>');

      }
    };
    
    // Add buttons to container and insert into the cell
    buttonContainer.appendChild(searchButton);
    buttonContainer.appendChild(roleSearchButton);
    idSpan.parentNode.appendChild(buttonContainer);
  });
}

// Initial run to add buttons to any existing bswift IDs
addButtonsToBswiftIds();

// Set up observer to watch for DOM changes (new rows/elements being added)
const observer = new MutationObserver(() => {
  addButtonsToBswiftIds();
});

// Start observing the entire document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});
