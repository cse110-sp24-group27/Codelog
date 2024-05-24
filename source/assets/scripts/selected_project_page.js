// Js for the functionality of the Selected Project Page // (Back button functionality is not here)
// Table of Contents By Kristhian Ortiz //
const dynamicContentList = document.getElementById('dynamic-content-list')  // Get table of contents' list
function load_table_of_contents () {
    dynamicContentList.innerHTML = "";  // clear contents

    // Get all entries from local Storage (we receive a string representing an object)
    const entriesForListAsString = localStorage.getItem('entries')
    // Convert the string back into an object using JSON.parse
    const entriesForList = JSON.parse(entriesForListAsString);

    /**
     * Each Entry Object in 'entries' will have:
     * Entry Name (Journal Title)
     * id (unique identifier for this entry)
     * Entry Template
     * Tags
     * Markdown File
     * 
     * We only want the Entry Name (can be accessed using .)
     */
    entriesForList.forEach(entry => {
        // Fetch Project Entries' data
        const entryTitleName = entry.titleName;
        const entryId = entry.id;

        // Create list item to be included in table of contents.
        const listContent = document.createElement('ul')
        // Create an anchor so that it can be linked
        const anchor = document.createElement('a')

        // Link entry in table of contents to actual entry in webpage
        anchor.href = `#${entryId}`  // Link by id
        anchor.textContent = entryTitleName; // String holding the link will be the title

        // Add anchor to listContent
        listContent.appendChild(anchor)
        // Add listContent to table of content list.
        dynamicContentList.appendChild(listContent)
    })
}

// On load of script, load table of contents
load_table_of_contents();



// Drag Button //
function drag_project() {
    console.log('drag a project');
}


// Add Entry Button //
function new_journal_entry() {
    console.log('add new journal entry');
}


// Fetch Entries corresponding to the project for display //


    // On each entry, add an event listener to take you to its selected_journal_(entry)_page




// Temporary JS just to outline behaviors we might want

    // Attach event listeners to each journal entry (replace with actual selector)
    // This code is temporary, just to see how hovering, single click, and doubleclick might function
    const journalEntries = document.querySelectorAll('.journal-entry');
    journalEntries.forEach(entry => {
        entry.addEventListener("mouseover", () => console.log('show preview'));  //handleJournalEntryHover(entry)
        entry.addEventListener("click", () => console.log('expand journal entry'));  //handleJournalEntryClick(entry)
        entry.addEventListener("dblclick", () => console.log('edit journal')); //handleJournalEntryDoubleClick(entry)
    });
    
    
