# Salesforce bswift Enhancement Extension

A Chrome/Edge browser extension that enhances the Salesforce experience by adding convenient utility buttons next to bswift Client IDs. This extension streamlines the workflow for accessing client documents in SharePoint and performing role searches in bswift.

## Features

- 🔍 **Quick SharePoint Search**: Direct access to client documents in SharePoint from Salesforce
- 📋 **One-Click Role Search**: Automatically copies client ID and opens bswift role search page
- 📱 **Flexible Display**: Works in both list and detail views in Salesforce
- 🔄 **Dynamic Updates**: Automatically handles page updates and new content loading

## How It Works

The extension adds two utility buttons next to each bswift Client ID in Salesforce:

1. **SharePoint Search Button** (SharePoint icon)
   - Opens SharePoint document search in a new tab
   - Automatically filters results by the client ID
   - Works with the Audits folder structure

2. **Role Search Button** (bswift icon)
   - Copies the client ID to clipboard
   - Opens bswift welcome page in a new tab
   - Streamlines the role search workflow

## Installation

1. Download the latest release from this repository
2. Extract the ZIP file to a folder on your computer
3. Open Chrome/Edge and navigate to the extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the folder containing the extension files

## Technical Details

### Architecture

- Built using Manifest V3
- Uses MutationObserver for dynamic content handling
- Implements Salesforce Lightning Design System (SLDS) styling

### Files

- `manifest.json`: Extension configuration and permissions
- `content.js`: Main script that implements the functionality
  - Finds bswift Client ID cells
  - Adds utility buttons
  - Handles button click events
  - Manages clipboard operations

### Permissions

- `activeTab`: For accessing the current tab's content
- Host permissions limited to `*.lightning.force.com`

## Development

### Prerequisites

- Chrome or Edge browser
- Basic understanding of JavaScript and browser extensions

### Local Development

1. Clone this repository
2. Make changes to the source files
3. Load the extension in developer mode to test
4. Refresh the extension after making changes

### Building

No build process is required. The extension runs directly from the source files.

