// Js for the functionality of the Selected Project Page // (Back button functionality is not here)
// Table of Contents By Kristhian Ortiz //
const dynamicContentList = document.getElementById('dynamic-content-list') // Get table of contents' list
/**
 * Generates a dynamic table of contents.
 */
function loadTableOfContents () {
  dynamicContentList.innerHTML = '' // clear contents

  // Get all entries from local Storage (we receive a string representing an object)
  const entriesForListAsString = localStorage.getItem('entries')
  // Convert the string back into an object using JSON.parse
  const entriesForList = JSON.parse(entriesForListAsString)

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
    const entryTitleName = entry.titleName
    const entryId = entry.id

    // Create list item to be included in table of contents.
    const listContent = document.createElement('ul')
    // Create an anchor so that it can be linked
    const anchor = document.createElement('a')

    // Link entry in table of contents to actual entry in webpage
    anchor.href = `#${entryId}` // Link by id
    anchor.textContent = entryTitleName // String holding the link will be the title

    // Add anchor to listContent
    listContent.appendChild(anchor)
    // Add listContent to table of content list.
    dynamicContentList.appendChild(listContent)
  })
}

// On load of script, load table of contents
loadTableOfContents()

// Drag Button By Devan //
// TODO: change to only drag and drop if using the button
/**
 * @param event reference to the entry being grabbed.
 */
function dragProject (event) {
  event.dataTransfer.setData('text', event.target.id)
}

/**
 * @param event reference to the entry to be dragged and dropped.
 */
function allowDrop (event) {
  event.preventDefault()
}

// TODO: add comments for JSDoc
// Swap Projects
function dropProject (event) {
  event.preventDefault()
  let dragIndex = 0
  const clone = event.target.cloneNode(true)
  const data = event.dataTransfer.getData('text')
  if (clone.id !== data) {
    const nodeList = document.getElementById('journal-entries').childNodes
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].id === data) {
        dragIndex = i
      }
    }
    document.getElementById('journal-entries').replaceChild(document.getElementById(data), event.target)
    document.getElementById('journal-entries').insertBefore(clone, document.getElementById('journal-entries').childNodes[dragIndex])
  }
}

// Show Popup Button //
const showButton = document.getElementById('create-btn')
const popup = document.getElementById('hidden-popup')
showButton.addEventListener('click', function () {
  popup.id = 'shown-popup'
})

// Fetch data from user input in pop-up after clicking "Create Entry" and put the data in localStorage
window.addEventListener('load', () => {
  if (localStorage.getItem('entries') == null) {
    localStorage.setItem('entries', [])
  }
})

// Add an event listener to the Create Entry button
// TODO: createEntryButton is not defined in DevTools when testing; however, create_entry() function has been tested and works
const createEntryButton = document.getElementById('done-btn')
createEntryButton.addEventListener('click', createEntry)

// TODO: add comments for JSDoc
// On click, execute the create entry function
function createEntry () {
  // Get the current array of entries from the local storage
  const entries = localStorage.getItem('entries') || []

  // Fetch data from user input
  const entryTitle = document.getElementById('new-project-name').value
  const entryContent = document.getElementById('new-project-content').value
  const entryPublicity = document.getElementById('publicity-select').value
  const entryTemplate = document.getElementById('template-select').value
  // TODO: Fetch Tags after its implemented

  /* Create an entry object
    * titleName
    * id
    * template
    * tags
    * publicity
    * content
    */
  const entry = {
    titleName: entryTitle,
    id: '10000',
    template: entryTemplate,
    tags: '',
    publicity: entryPublicity,
    content: entryContent
  }

  // Add entry to the entries of this project
  entries.push(entry)

  // Add the updated entries array to the localStorage
  localStorage.setItem('entries', JSON.stringify(entries))
}

// Fetch Entries corresponding to the project for display //

// On each entry, add an event listener to take you to its selected_journal_(entry)_page

// Temporary JS just to outline behaviors we might want

// Attach event listeners to each journal entry (replace with actual selector)
// This code is temporary, just to see how hovering, single click, and doubleclick might function
const journalEntries = document.querySelectorAll('.journal-entry')
journalEntries.forEach(entry => {
  entry.addEventListener('mouseover', () => console.log('show preview')) // handleJournalEntryHover(entry)
  entry.addEventListener('click', () => console.log('expand journal entry')) // handleJournalEntryClick(entry)
  entry.addEventListener('dblclick', () => console.log('edit journal')) // handleJournalEntryDoubleClick(entry)
})
