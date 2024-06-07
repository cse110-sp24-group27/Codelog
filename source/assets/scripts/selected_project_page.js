// Js for the functionality of the Selected Project Page //

/**
 * Returns the current project object stored in localStorage
 * @returns Current project object
 */
function getCurrProjectObject () {
  const currProjectName = localStorage.getItem('currDisplayedProject')
  const projects = JSON.parse(localStorage.getItem('user_projects'))
  let currProject
  projects.forEach(project => {
    if (project.projectName === currProjectName) {
      currProject = project
    }
  })
  return currProject
}

/**
 * Initializes the title, description, and entries of the project page
 */
function projectPageInit () {
  // Get the current project object
  const currProject = getCurrProjectObject()

  // Update the project name
  const projectName = document.getElementById('project-name')
  projectName.innerHTML = currProject.projectName

  // Update the project description
  const projectDescription = document.getElementById('project-description')
  projectDescription.innerHTML = currProject.description

  // On load, populate the selected project's entries
  populateEntries()

  // On load, populate the table of contents
  loadTableOfContents()
}

// On load, populate all necessary parts of the page
window.addEventListener('load', projectPageInit)

/**
 * Retrieve all entries of the selected project given the project id
 * @param projects - object `user_projects`
 * @param projectName - string, name of the project
 * @return the "selected_project_entries" array of that selected project
 */
function getAllSelectedProjectEntries (projects, projectName) {
  // TODO: return "selected_project_entries" array of the given project from localStorage

  // Iterate through projects, find the project with matching project_id, then return that project's entries
  let currProjectEntries
  projects.forEach(project => {
    if (project.projectName === projectName) {
      currProjectEntries = project.selected_project_entries
    }
  })
  // If no project with the correct project_id found from above loop, console.log
  if (currProjectEntries) {
    return currProjectEntries
  } else {
    console.log(`There's no project found with ${projectName}`)
  }
}

/**
 * Adds the entries for the selected project onto the page
 */
function populateEntries () {
  // Get the current project and its entries
  const currProjectName = localStorage.getItem('currDisplayedProject')
  const projects = JSON.parse(localStorage.getItem('user_projects'))
  const entries = getAllSelectedProjectEntries(projects, currProjectName)
  // Empty the journal entry container
  const journalEntryContainer = document.getElementById('journal-entries')
  journalEntryContainer.innerHTML = ''

  // If there are no entries, end the function
  if (!entries) {
    return
  }

  // For each entry, add its parts from localStorage
  entries.forEach(entry => {
    const entryElement = document.createElement('div')
    entryElement.classList.add('journal-entry')
    entryElement.classList.add('is-idle')

    entryElement.innerHTML = `
      <a href="selected_journal_page.html" onclick="loadEntryNameToLocalStorage(this)"><h2 class="entry-name" id=${entry.entryId}>${entry.titleName}</h2></a>
      <p class="entry-text">${entry.description}</p>
      <div class="drag-btn-container">
        <button class="drag-btn">
          <img src="../assets/images/drag-button.png" alt="drag-btn" class="drag-btn-img"/>
        </button>
      </div>
      <div class="entry-delete-btn-container">
        <button class="entry-delete-btn">
          <img src="../assets/images/delete-btn.png" alt="delete-btn" class="delete-btn-img"/>
        </button>
      </div>

    `

    // Append all the entries to the entry container
    journalEntryContainer.appendChild(entryElement)

    // Assuming entryElement is already appended to the DOM
    const entryDeleteButton = entryElement.querySelector('.entry-delete-btn')
    entryDeleteButton.addEventListener('click', deleteEntry)
  })
}

const dynamicContentList = document.getElementById('dynamic-content-list') // Get table of contents' list
/**
 * Generates a dynamic table of contents.
 */
function loadTableOfContents () {
  dynamicContentList.innerHTML = '' // clear contents

  // Get an array of all entry names for the current project
  const currProject = getCurrProjectObject()
  const entries = currProject.selected_project_entries
  const entryNames = []
  for (let i = 0; i < entries.length; i++) {
    const entryName = entries[i].titleName
    entryNames.push(entryName)
  }

  // Add necessary HTML elements to the table of contents
  for (let i = 0; i < entryNames.length; i++) {
    const entryListItem = document.createElement('li')
    const entryTitle = document.createElement('h3')
    entryTitle.innerHTML = entryNames[i]
    entryListItem.appendChild(entryTitle)
    dynamicContentList.appendChild(entryListItem)
  }
}

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

// Upon clicking the "add" button in the pop-up, create the new entry
const createEntryButton = document.getElementById('done-btn')
createEntryButton.addEventListener('click', createEntry)

/**
 * Creates a journal entry and adds it to localStorage and the current project page
 */
function createEntry () {
  // Get the values within the pop-up to use in the new entry
  const entryTitle = document.getElementById('new-entry-name').value
  const entryDescription = document.getElementById('new-entry-description').value
  const entryPublicity = document.getElementById('publicity-select').value

  // Calculate the new entry ID and increment the current max entry ID
  const newEntryId = (parseInt(localStorage.getItem('currentMaxEntryId'))) + 1
  localStorage.setItem('currentMaxEntryId', newEntryId)

  // Retrieve the content sections
  const contentElements = document.querySelectorAll('#inputcontainer .input-group')
  const allContent = Array.from(contentElements).map((inputGroup) => {
    const input = inputGroup.querySelector('input')
    const type = input.classList.contains('input-1') ? 'header' : input.classList.contains('input-2') ? 'code' : 'text'
    return {
      type,
      content: input.value
    }
  })

  // Create the new entry object
  const entry = {
    entryId: newEntryId,
    titleName: entryTitle,
    description: entryDescription,
    tags: [],
    publicity: entryPublicity,
    content: allContent
  }

  // Update localStorage, repopulate entries, and reload table of contents
  updatelocalStorage(entry, true)
  populateEntries()
  loadTableOfContents()
}

/**
 * Update localStorage with the given entry.
 *
 * @param {Object|string} targetEntry - The entry to add or delete. If adding, it should be an object. If deleting, it should be a string (the entry name).
 * @param {boolean} ops - True to add the entry, False to delete the entry.
 */
function updatelocalStorage (targetEntry, ops) {
  // Get the project array and the current project object
  const projects = JSON.parse(localStorage.getItem('user_projects'))

  // Get the current project object
  const currProject = getCurrProjectObject()

  // Get the current project's entries
  let entries = currProject.selected_project_entries

  // Depending on the value of ops, add or delete the entry
  if (ops) {
    entries.push(targetEntry)
  } else {
    // Delete the entry if ops is false by filtering out the entry with the matching titleName
    entries = entries.filter(entry => entry.titleName !== targetEntry)
  }
  // Update the current project's entries
  currProject.selected_project_entries = entries

  // Find the current project in the projects array and update it
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].projectName === currProject.projectName) {
      projects[i] = currProject
    }
  }

  // update localStorage and the page
  localStorage.setItem('user_projects', JSON.stringify(projects))
}

/**
 * Delete an entry from the journal.
 *
 * @param {Event} event - The event object from the click event listener.
 */
function deleteEntry (event) {
  if (confirm('Are you sure you want to delete this entry?')) {
    // Get the entry element that the delete button belongs to
    const entryElement = event.target.closest('.journal-entry')

    // Get the entry name from the h2 element with the class 'entry-name'
    const entryNameElement = entryElement.querySelector('.entry-name')
    const entryName = entryNameElement.textContent || entryNameElement.innerText

    // Call updateLocalStorage to remove the entry with the specified name from localStorage
    updatelocalStorage(entryName, false)

    // Refresh the list of entries displayed on the page to reflect the deletion
    populateEntries()

    // Repopulate the table of contents
    loadTableOfContents()
  }
}

// export functions for testing
module.exports = {
  getCurrProjectObject,
  projectPageInit,
  populateEntries,
  getAllSelectedProjectEntries,
  loadTableOfContents,
  getAllItems,
  getIdleItems,
  isItemAbove,
  isItemToggled,
  unsetItemState,
  updatelocalStorage
}
