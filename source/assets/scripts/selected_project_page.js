// Js for the functionality of the Selected Project Page // (Back button functionality is not here)
// Table of Contents //



// Drag Button //



// Add Entry Button ///



// Fetch Entries corresponding to the project for display //




// Temporary JS just to outline behaviors we might want

    // Attach event listeners to each journal entry (replace with actual selector)
    // This code is temporary, just to see how hovering, single click, and doubleclick might function
    const journalEntries = document.querySelectorAll(".journal-entry");
    journalEntries.forEach(entry => {
        entry.addEventListener("mouseover", () => console.log('show preview'));  //handleJournalEntryHover(entry)
        entry.addEventListener("click", () => console.log('expand journal entry'));  //handleJournalEntryClick(entry)
        entry.addEventListener("dblclick", () => console.log('edit journal')); //handleJournalEntryDoubleClick(entry)
    });
    function drag_project() {
        console.log('drag a project');
    }
    function new_journal_entry() {
        console.log('add new journal entry');
    }
