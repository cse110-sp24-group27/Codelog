// import { addProjectToLocalStorage } from "./get_set_from_localStorage.js"

// (1) home_projects_page functions //

let selectedTags = []
let deleteMode = false

/**
 * Get an unused Project Id
 */
function getUnusedProjectId () {
  // Get the current max entry id
  const retrievedCurrMaxProjectId = localStorage.getItem('currentMaxProjectId')

  // Make it an int
  const currMaxProjectId = parseInt(retrievedCurrMaxProjectId)

  // set the "current_max_entry_id" to "entry_to_add.entry_id"
  localStorage.setItem('currentMaxProjectId', (currMaxProjectId + 1))

  return (currMaxProjectId + 1)
}

/**
 * Add given project object to the "user_projects" array
 * @param projectToAdd - project object to be added.
 * @description Project object has the following elements:
 *      "project_id": int starts with "current_max_project_id" + 1
 *      "projectName": "string"
 *      "description": "string"
 *      "privacy": "string"
 *      "tags": [
 *          {
 *              "tag_id": int that starts with ("current_max_tag_id" + 1),
 *              "tag_name": "HTML",
 *              "color": "red"
 *          }]
 *      "selected_project_entries": {
 *          // contains all the entries shown below (!!) //
 *      }
*/
function addProjectToLocalStorage (projectToAdd) {
  // TODO: Add given project to the "user_projects" array in localStorage
  const unusedProjectId = getUnusedProjectId()

  // Set the entry id to current_max_entry_id + 1
  projectToAdd.projectId = unusedProjectId

  // Get the current "user_projects" array, or return an empty array if there is empty.
  const projectInArray = JSON.parse(localStorage.getItem('user_projects') || '[]')

  // Add the user additions to the "user_projects" array.
  projectInArray.push(projectToAdd)

  // Update to localStorage
  localStorage.setItem('user_projects', JSON.stringify(projectInArray))
}

document.addEventListener('DOMContentLoaded', function () {
  // Function to handle the new project form
  function newProject () {
    const form = document.querySelector('.new-project')
    form.style.display = (form.style.display === 'flex' ? 'none' : 'flex')
  }

  // Function to handle the addition of a new project
  function addProject () {
    // Gather Project Data
    const projectName = document.querySelector('#new-project-name').value
    const description = document.querySelector('#new-project-description').value
    const selectedPrivacyOption = document.querySelector('.privacy-option.bold')

    // Ensure that a privacy option is selected
    if (!selectedPrivacyOption) {
      console.log(selectedPrivacyOption)
      alert('Please select a privacy option.')
      return
    }
    const privacy = selectedPrivacyOption.id === 'private' ? 'Private' : 'Public'
    const projectId = -1

    // Create Project
    const newProject = {
      projectId,
      projectName,
      description,
      privacy,
      tags: selectedTags,
      selected_project_entries: []
    }
    document.querySelector('.new-project').style.display = 'none'
    resetForm()

    // Add project to home page
    addProjectsToDocument([newProject])
    // Add project to localStorage
    addProjectToLocalStorage(newProject)
  }

  // Function to handle tag selection
  function toggleTag (tagElement, toDelete = false) {
    const tag = tagElement.textContent.trim()
    const selectedTagsContainer = document.getElementById('selected-tags')

    if (selectedTags.includes(tag)) {
    // Remove tag from the selectedTags array
      selectedTags = selectedTags.filter(t => t !== tag)
      tagElement.style.fontWeight = 'normal'

      // Remove tag from selected tags display
      const tagToRemove = Array.from(selectedTagsContainer.children).find(child => child.textContent.trim() === tag)
      if (tagToRemove) {
        selectedTagsContainer.removeChild(tagToRemove)
      }
    } else if (!toDelete) {
      // Add tag to the selectedTags array
      selectedTags.push(tag)
      tagElement.style.fontWeight = 'bold'

      // Add tag to selected tags display
      const newTag = document.createElement('div')
      newTag.textContent = tag
      newTag.classList.add('tag')
      selectedTagsContainer.appendChild(newTag)
    }
  }

  // Function to handle privacy selection
  function selectPrivacy (option) {
    document.getElementById('public').classList.remove('bold')
    document.getElementById('private').classList.remove('bold')
    document.getElementById(option).classList.add('bold')
  }

  // Function to reset the form
  function resetForm () {
    document.querySelector('#new-project-name').value = ''
    document.querySelector('#new-project-description').value = ''
    selectedTags = []
    document.querySelectorAll('.tag').forEach(tag => { tag.style.fontWeight = 'normal' })
    document.getElementById('public').classList.remove('bold')
    document.getElementById('private').classList.remove('bold')
    document.getElementById('selected-tags').innerHTML = ''
  }

  // Event listeners
  document.querySelector('#create-btn').addEventListener('click', newProject)
  document.querySelector('#done').addEventListener('click', addProject)

  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function () {
      if (!this.classList.contains('add-tag')) {
        toggleTag(this)
      }
    })
  })

  document.getElementById('public').addEventListener('click', function () {
    selectPrivacy('public')
  })
  document.getElementById('private').addEventListener('click', function () {
    selectPrivacy('private')
  })

  // Tag Editor Functionality
  const modal = document.getElementById('tag-editor')
  const span = document.getElementsByClassName('close')[0]
  const addTagButton = document.getElementById('add-tag-btn')
  const tagList = document.getElementById('tag-list')
  const newTagNameInput = document.getElementById('new-tag-name')
  console.log(`newTageNameInput: ${newTagNameInput} is not used!`)

  // Show the modal when the Add Tag button is clicked
  document.querySelector('.add-tag').addEventListener('click', function () {
    modal.style.display = 'block'
    loadTags()
  })

  // Hide the modal when the close button is clicked
  span.onclick = function () {
    modal.style.display = 'none'
  }

  // Hide the modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none'
    }
  }

  // Add new tag
  addTagButton.addEventListener('click', function () {
    const tagName = document.getElementById('new-tag-name').value
    const tagColor = document.getElementById('new-tag-color').value

    if (tagName) {
      const tags = getTagsFromStorage()
      tags.push({ name: tagName, color: tagColor })
      localStorage.setItem('user_tags', JSON.stringify(tags))
      loadTags()
      document.getElementById('new-tag-name').value = ''
      document.getElementById('new-tag-color').value = '#000000'
    } else {
      alert('Please enter a tag name')
    }
  })

  // Toggle Delete Mode
  document.getElementById('toggle-delete-mode').addEventListener('click', function () {
    deleteMode = !deleteMode
    this.textContent = `Delete Mode: ${deleteMode ? 'On' : 'Off'}`
  })

  // Load tags from localStorage
  function loadTags () {
    const tags = getTagsFromStorage()
    tagList.innerHTML = ''

    tags.forEach(tag => {
      const tagItem = document.createElement('div')
      tagItem.style.backgroundColor = 'gray'
      tagItem.textContent = tag.name
      tagItem.classList.add('tag-item')
      tagItem.style.setProperty('--tag-color', tag.color)
      tagItem.addEventListener('click', function () {
        if (deleteMode) {
          tagList.removeChild(tagItem)
          const updatedTags = tags.filter(t => t.name !== tag.name)
          localStorage.setItem('user_tags', JSON.stringify(updatedTags))
          toggleTag(this, true)
        } else {
          toggleTag(this)
        }
      })
      tagList.appendChild(tagItem)
    })
  }

  // Get tags from localStorage
  function getTagsFromStorage () {
    return JSON.parse(localStorage.getItem('user_tags')) || []
  }

  function addProjectsToDocument (projects) {
    const mainElement = document.querySelector('.projects')
    projects.forEach(project => {
      const projectCard = document.createElement('project-card')
      projectCard.data = project
      mainElement.appendChild(projectCard)
    })
  }
})

// export functions for testing
module.exports = { getUnusedProjectId, addProjectToLocalStorage }
