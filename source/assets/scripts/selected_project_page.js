// Js for the functionality of the Selected Project Page // (Back button functionality is not here)
// Table of Contents By Kristhian Ortiz //
// const dynamicContentList = document.getElementById('dynamic-content-list') // Get table of contents' list
// /**
//  * Generates a dynamic table of contents.
//  */
// function loadTableOfContents () {
//   dynamicContentList.innerHTML = '' // clear contents

//   // Get all entries from local Storage (we receive a string representing an object)
//   const entriesForListAsString = localStorage.getItem('entries')
//   // Convert the string back into an object using JSON.parse
//   const entriesForList = JSON.parse(entriesForListAsString)

//   /**
//    * Each Entry Object in 'entries' will have:
//    * Entry Name (Journal Title)
//    * id (unique identifier for this entry)
//    * Entry Template
//    * Tags
//    * Markdown File
//    *
//    * We only want the Entry Name (can be accessed using .)
//    */
//   entriesForList.forEach(entry => {
//     // Fetch Project Entries' data
//     const entryTitleName = entry.titleName
//     const entryId = entry.id

//     // Create list item to be included in table of contents.
//     const listContent = document.createElement('ul')
//     // Create an anchor so that it can be linked
//     const anchor = document.createElement('a')

//     // Link entry in table of contents to actual entry in webpage
//     anchor.href = `#${entryId}` // Link by id
//     anchor.textContent = entryTitleName // String holding the link will be the title

//     // Add anchor to listContent
//     listContent.appendChild(anchor)
//     // Add listContent to table of content list.
//     dynamicContentList.appendChild(listContent)
//   })
// }

// On load of script, load table of contents
// loadTableOfContents()

// Drag Button By Devan //
// Variables used in dragging and dropping functions
let listContainer
let draggableItem
let pointerStartX
let pointerStartY
let items = []

/**
 * Sets up the journal entries for dragging and dropping
 */
function dragAndDropSetup () {
  listContainer = document.getElementById('journal-entries')
  if (!listContainer) return
  listContainer.addEventListener('mousedown', dragStart)
  document.addEventListener('mouseup', dragEnd)
}

/**
 * Initializes everything needed for dragging and dropping
 * @param e Reference to the mouse click event for dragging
 */
function dragStart (e) {
  if (e.target.classList.contains('drag-btn-img')) {
    draggableItem = e.target.closest('.journal-entry')
  }
  if (!draggableItem) return

  pointerStartX = e.clientX
  pointerStartY = e.clientY
  initDraggableItem()
  initItemsState()
  document.addEventListener('mousemove', drag)
}

/**
 * Updates journal entry positions while dragging
 * @param e Reference to the mouse click event for dragging
 */
function drag (e) {
  if (!draggableItem) return

  const currentPositionX = e.clientX
  const currentPositionY = e.clientY
  const pointerOffsetX = currentPositionX - pointerStartX
  const pointerOffsetY = currentPositionY - pointerStartY
  draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`

  updateIdleItemsStateAndPosition()
}

/**
 * Finalizes and cleans up everything after dropping a journal entry
 */
function dragEnd () {
  if (!draggableItem) return

  applyNewItemsOrder()
  cleanup()
}

// Helper functions
/**
 * Helper function for dragging and dropping. Gets all entries in the journal entry section
 */
function getAllItems () {
  if (!items?.length) {
    items = Array.from(listContainer.querySelectorAll('.journal-entry'))
  }
  return items
}

/**
 * Helper function for dragging and dropping. Gets all entries in the journal entry section
 * that aren't being dragged
 */
function getIdleItems () {
  return getAllItems().filter((item) => item.classList.contains('is-idle'))
}

/**
 * Helper function for dragging and dropping. Checks whether an entry was above the
 * entry currently being dragged in their original positions
 * @param item Entry to check (not the entry being dragged)
 * @return Whether the entry was above the entry being dragged
 */
function isItemAbove (item) {
  return item.hasAttribute('data-is-above')
}

/**
 * Helper function for dragging and dropping. Checks whether an entry that was
 * originally above the entry currently being dragged is now below that entry as a
 * result of the dragging
 * @param item Entry to check (not the entry being dragged)
 * @returns Whether the entry's relative position to the entry being dragged has changed
 */
function isItemToggled (item) {
  return item.hasAttribute('data-is-toggled')
}

/**
 * Helper function for dragStart(). Updates class of the entry being dragged
 */
function initDraggableItem () {
  draggableItem.classList.remove('is-idle')
  draggableItem.classList.add('is-draggable')
}

/**
 * Helper function for dragStart(). Categorizes entries based on whether they are above
 * the entry currently being dragged
 */
function initItemsState () {
  getIdleItems().forEach((item, i) => {
    if (getAllItems().indexOf(draggableItem) > i) {
      item.dataset.isAbove = ''
    }
  })
}

/**
 * Helper function for drag(). Continuously updates the entries not being dragged
 * while an entry is being dragged
 */
function updateIdleItemsStateAndPosition () {
  const draggableItemRect = draggableItem.getBoundingClientRect()
  const draggableItemY = draggableItemRect.top + draggableItemRect.height / 2
  const ITEMS_GAP = 40 // This variable should be the same as the down arrow height

  getIdleItems().forEach((item) => {
    const itemRect = item.getBoundingClientRect()
    const itemY = itemRect.top + itemRect.height / 2
    if (isItemAbove(item)) {
      if (draggableItemY <= itemY) {
        item.dataset.isToggled = ''
      } else {
        delete item.dataset.isToggled
      }
    } else {
      if (draggableItemY >= itemY) {
        item.dataset.isToggled = ''
      } else {
        delete item.dataset.isToggled
      }
    }
  })

  getIdleItems().forEach((item) => {
    if (isItemToggled(item)) {
      const direction = isItemAbove(item) ? 1 : -1
      item.style.transform = `translateY(${
        direction * (draggableItemRect.height + ITEMS_GAP)
      }px)`
    } else {
      item.style.transform = ''
    }
  })
}

/**
 * Helper function for dragEnd(). Reorders and reassembles the entries after the
 * entry being dragged has been dropped
 */
function applyNewItemsOrder () {
  const reorderedItems = []
  getAllItems().forEach((item, index) => {
    if (item === draggableItem) {
      return
    }
    if (!isItemToggled(item)) {
      reorderedItems[index] = item
      return
    }
    const newIndex = isItemAbove(item) ? index + 1 : index - 1
    reorderedItems[newIndex] = item
  })

  for (let index = 0; index < getAllItems().length; index++) {
    const item = reorderedItems[index]
    if (typeof item === 'undefined') {
      reorderedItems[index] = draggableItem
    }
  }

  const downArrows = Array.from(document.querySelectorAll('.down-arrow'))
  reorderedItems.forEach((item) => {
    listContainer.appendChild(item)
    if (downArrows.length !== 0) {
      listContainer.appendChild(downArrows.pop())
    }
  })
}

/**
 * Helper function for dragEnd(). Resets all entry states after dropping an entry
 */
function unsetItemState () {
  getIdleItems().forEach((item, i) => {
    delete item.dataset.isAbove
    delete item.dataset.isToggled
    item.style.transform = ''
  })
}

/**
 * Helper function for dragEnd(). Resets a dragged entry after it is dropped
 */
function unsetDraggableItem () {
  draggableItem.style = null
  draggableItem.classList.remove('is-draggable')
  draggableItem.classList.add('is-idle')
  draggableItem = null
}

/**
 * Helper function for dragEnd(). Resets everything necessary after an entry is
 * dropped
 */
function cleanup () {
  items = []
  unsetDraggableItem()
  unsetItemState()
  document.removeEventListener('mousemove', drag)
}

// On load of script, set up dragging and dropping of journal entries
dragAndDropSetup()

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
// const journalEntries = document.querySelectorAll('.journal-entry')
// journalEntries.forEach(entry => {
//   entry.addEventListener('mouseover', () => console.log('show preview')) // handleJournalEntryHover(entry)
//   entry.addEventListener('click', () => console.log('expand journal entry')) // handleJournalEntryClick(entry)
//   entry.addEventListener('dblclick', () => console.log('edit journal')) // handleJournalEntryDoubleClick(entry)
// })
