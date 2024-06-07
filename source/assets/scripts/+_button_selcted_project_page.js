// Function to show pop-up forms
function openPopup (id) {
  document.getElementById(id).style.display = 'block'
}

// Function to close pop-up forms
function closePopup (id) {
  document.getElementById(id).style.display = 'none'
}

// Function to add a new input field and delete button
function addInput (columnNumber) {
  // Get the container where the new input group will be added
  const container = document.getElementById('inputcontainer')
  // Create a new div element to act as the input group
  const inputGroup = document.createElement('div')
  inputGroup.classList.add('input-group')
  // Create a new input element
  const newInput = document.createElement('input')
  newInput.type = 'text'
  newInput.placeholder = `${columnNumber === 1 ? 'Header' : columnNumber === 2 ? 'Code' : 'Text'} input`
  newInput.classList.add(`input-${columnNumber}`)
  // Create a new button element for deletion
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-btn')
  deleteButton.innerText = 'Delete'
  // Add an onclick event to the delete button to remove the input group
  deleteButton.onclick = function () {
    deleteInput(deleteButton)
  }
  // Add an onclick event to the delete button to remove the input group
  inputGroup.appendChild(newInput)
  inputGroup.appendChild(deleteButton)
  container.appendChild(inputGroup)
}
// Function to delete an input group
function deleteInput (button) {
  const inputGroup = button.parentElement
  inputGroup.remove()
}

/**
 * Create a new entry object from the form data
 * @param: none, assuming that we have current_max_id and selected_project_id
* @return  {object} in format: {"entry_id": 2003,
            "titleName": "Entry 1 Name",
            "description": "Project description here",
            "tags": [
                {
                    "tagId": 30013,
                    "tagName": "HTML",
                    "color": "red"
                },
                {
                    "tagId": 30014,
                    "tagName": "CSS",
                    "color": "blue"
                }
            ],
            "publicity": "Private",
            "content": [
                {
                    "type": "header",
                    "content": "white background and bigger black font"
                },
                {
                    "type": "code",
                    "content": "dark gray background and light gray font"
                },
                {
                    "type": "text",
                    "content":"white background and black font"
                }
            ]}
 */
function createNewEntryObject () {
  // Retrieve the title, description, and publicity
  const titleName = document.getElementById('new-entry-name').value
  const description = document.getElementById('new-entry-description').value
  const publicity = document.getElementById('publicity-select').value

  // Retrieve the tags (assuming tags are dynamically added and have a specific class)
  const tags = Array.from(document.querySelectorAll('#tag-editor-popup .tag'))
    .map(tagElement => {
      return {
        tagId: tagElement.getAttribute('data-tag-id'),
        tagName: tagElement.textContent, // or a specific element within the tag element for the name
        color: tagElement.getAttribute('data-tag-color') // using data-* attribute for color
      }
    })

  // Retrieve the content sections
  const contentElements = document.querySelectorAll('#inputcontainer .input-group')
  const content = Array.from(contentElements).map((inputGroup) => {
    const input = inputGroup.querySelector('input')
    const type = input.classList.contains('input-1') ? 'header' : input.classList.contains('input-2') ? 'code' : 'text'
    return {
      type,
      content: input.value
    }
  })
  // Create the new entry object
  const newEntryObject = {
    entryId: 2000, // TODO
    titleName,
    description,
    tags,
    publicity,
    content
  }
  // console.log(newEntryObject)
  // saveNewEntryToLocalStorage(100, newEntryObject)  // testing for now, will move this out
  return newEntryObject
}

// TODO: get current_max_entry_id

// TODO: get current selected_project

/**
 * Save a new entry to the localStorage under a specific project.
 * @param {number} selectedProjectId - The ID of the project to which the new entry should be added.
 * @param {object} newEntry - The new entry object to be added to the selected project.
 */
function saveNewEntryToLocalStorage (selectedProjectId, newEntry) {
  try {
    // Retrieve the user projects from localStorage and parse it into an array
    const projects = JSON.parse(localStorage.getItem('user_projects')) || []

    // Find the project with the matching ID and add the new entry to its entries array
    let projectFound = false
    projects.forEach(project => {
      if (project.project_id === selectedProjectId) {
        project.selected_project_entries = project.selected_project_entries || []
        project.selected_project_entries.push(newEntry)
        projectFound = true
      }
    })

    // Update the localStorage with the modified projects array
    if (projectFound) {
      localStorage.setItem('user_projects', JSON.stringify(projects))
    } else {
      console.warn(`Project with ID ${selectedProjectId} not found.`)
    }
  } catch (error) {
    console.error('Error saving new entry to localStorage:', error)
  }
}
window.openPopup = openPopup
window.closePopup = closePopup
window.addInput = addInput
window.deleteInput = deleteInput

// export functions for testing
module.exports = { openPopup, closePopup, addInput, deleteInput, createNewEntryObject, saveNewEntryToLocalStorage }
