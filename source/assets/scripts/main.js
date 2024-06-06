// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init)

// Starts the program, all function calls trace back here
function init () {
  // Initialize global variables from localStorage
  if (localStorage.getItem('currentMaxProjectId') === null) {
    localStorage.setItem('currentMaxProjectId', 0)
  }
  if (localStorage.getItem('currentMaxEntryId') === null) {
    localStorage.setItem('currentMaxEntryId', 2000)
  }
  if (localStorage.getItem('currentMaxTagId') === null) {
    localStorage.setItem('currentMaxTagId', 30000)
  }

  if (localStorage.getItem('user_profile') == null) {
    localStorage.setItem('user_profile')
  }
  
  // Check for errors if passed the limit
  if (parseInt(localStorage.getItem('currentMaxProjectId')) === 1999) {
    alert('Reached Max Project Limit')
  }
  if (parseInt(localStorage.getItem('currentMaxEntryId')) === 29999) {
    alert('Reached Max Entry Limit')
  }
  if (parseInt(localStorage.getItem('currentMaxTagId')) === 30101) {
    alert('Reached Max Entry Limit')
  }

  // Update the profile
  // Get the profile from localStorage
  const profile = getProfileFromStorage()
  updateProfileOnPage(profile)

  // Update the profile
  const prevProfile = localStorage.getItem('user_profile')
  // Check if the localStorage is already created for projects
  if (prevProfile == null) {
    fetchProfileExamplejsonToStorage()
  } else {
    // Get the profile from localStorage
    const user_profile = getProfileFromStorage()
    updateProfileOnPage(user_profile)
  }

  // Update the projects
  const projects = getProjectsFromStorage()
  addProjectsToDocument(projects)
  // Add the event listeners to the form elements
  // initFormHandler()
}

/**
* Fetches user_profile from .JSON file to localstorage.
* Store the profile in localstorage as variable projects.
* TODO: delete this function once everything is done
*       since we don't actually need this function when we
*       are fetching data from localstorage.
*/
function fetchProfileExamplejsonToStorage () {
  fetch('source/reference/datastructure.json') // Parse the response as JSON
    .then(response => response.json())
    .then(data => {
      const profileData = JSON.stringify(data.user_profile)
      localStorage.setItem('user_profile', profileData)
    }) // Store the parsed data
    .catch(error => {
      console.error('Failed to fetch profile data:', error) // More specific error message
    })
}

/**
* Reads 'profile' from localStorage and returns an array of
* user profile info. found (parsed, not in string form). If
* nothing is found in localStorage for 'profile', an empty array
* is returned.
* @returns {Array<Object>} An array of projects found in localStorage
*/
function getProfileFromStorage () {
 return JSON.parse(localStorage.getItem('user_profile')) || []
}

// Update the HTML page with the profile data
function updateProfileOnPage (user_profile) {
 document.getElementById('profile-picture').src = user_profile.profilePicture || 'https://via.placeholder.com/150'
 document.getElementById('name').textContent = user_profile.username || 'Developer\'s Name'
 document.getElementById('pronoun').textContent = user_profile.pronouns
 document.getElementById('description').textContent = user_profile.bio || 'User description'
 // Update links if provided in the profile
 console.log(user_profile)
 if (user_profile.socialLinks.email) {
   document.getElementById('link-email').href = `mailto:${user_profile.socialLinks.email}`
 }
 if (user_profile.socialLinks.linkedin) {
   document.getElementById('link-linkedin').href = user_profile.socialLinks.linkedin
 }
 if (user_profile.socialLinks.github) {
   document.getElementById('link-github').href = user_profile.socialLinks.github
 }
}


/**
* Fetches user_projects from .JSON file to localstorage.
* Store the projects in localstorage as variable projects.
*/
function fetchExamplejsonToStorage () {
 fetch('source/reference/datastructure.json') // Parse the response as JSON
   .then(response => response.json())
   .then(data => {
     const projectsData = JSON.stringify(data.user_projects)
     localStorage.setItem('user_projects', projectsData)
     console.log('Projects successfully stored in localStorage')
   }) // Store the parsed data
   .catch(error => {
     console.error('Failed to fetch project data:', error) // More specific error message
   })
}

/**
* Reads 'user_projects' from localStorage and returns an array of
* all of the projects found (parsed, not in string form). If
* nothing is found in localStorage for 'user_projects', an empty array
* is returned.
* @returns {Array<Object>} An array of projects found in localStorage
*/
function getProjectsFromStorage () {
 return JSON.parse(localStorage.getItem('user_projects')) || []
}

/**
* Takes in an array of projects and for each project creates a
* new <project-card> element, adds the project data to that card
* using element.data = {...}, and then appends that new project
* to '.project-collection'
* @param {Array<Object>} projects An array of projects
*/
function addProjectsToDocument (projects) {
  // Get a reference to the <main> element
  const mainElement = document.querySelector('.projects')
  for (const project of projects) {
    const projectCard = document.createElement('project-card') // Set project data on the card
    projectCard.data = project
    mainElement.appendChild(projectCard)
  }
  dragAndDropSetUp()
}

// Variables used in dragging and dropping functions
let projectsContainer
let draggableItem
let pointerStartX
let pointerStartY
let items = []

/**
 * Sets up the project boxes for dragging and dropping.
 */
function dragAndDropSetUp () {
  projectsContainer = document.querySelector('.projects')
  const projectCards = projectsContainer.querySelectorAll('project-card')
  projectCards.forEach(project => {
    if (!project) return
    project.addEventListener('mousedown', dragStart)
    document.addEventListener('mouseup', dragEnd)
    // const article = project.shadowRoot.querySelector('.project')
    // if (!article) return
    // article.addEventListener('mousedown', dragStart)
    // document.addEventListener('mouseup', dragEnd)
  })
}

/**
 * Initializes everything needed for dragging and dropping
 * @param e Reference to the mouse click event for dragging
 */
function dragStart (e) {
  draggableItem = e.target.closest('project-card')
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
 * Helper function for dragging and dropping. Gets all project-cards in projects class.
 */
function getAllItems () {
  if (!items?.length) {
    items = Array.from(projectsContainer.querySelectorAll('project-card'))
  }
  return items
}

/**
 * Helper function for dragging and dropping. Gets all projects in the projects container
 * that are not being dragged
 */
function getIdleItems () {
  let filteredItem = []
  const items = getAllItems()
  items.forEach (item => {
    const article = item.shadowRoot.querySelector('.project')
    if (article.classList.contains('is-idle')) {
      filteredItem.push(item)
    }
  })
  return filteredItem
}

/**
 * Helper function for dragging and dropping. Checks whether a project was above the
 * project currently being dragged in their original positions
 * @param item Entry to check (not the project being dragged)
 * @return Whether the project was above the project being dragged
 */
function isItemAbove (item) {
  return item.hasAttribute('data-is-above')
}

/**
 * Helper function for dragging and dropping. Checks whether a project that was
 * originally above the project currently being dragged is now below that project as a
 * result of the dragging
 * @param item Entry to check (not the project being dragged)
 * @returns Whether the project's relative position to the project being dragged has changed
 */
function isItemToggled (item) {
  return item.hasAttribute('data-is-toggled')
}

/**
 * Helper function for dragStart(). Updates class of the project being dragged
 */
function initDraggableItem () {
  draggableItem.classList.remove('is-idle')
  draggableItem.classList.add('is-draggable')
}

/**
 * Helper function for dragStart(). Categorizes projects based on whether they are above
 * the project currently being dragged
 */
function initItemsState () {
  getIdleItems().forEach((item, i) => {
    if (getAllItems().indexOf(draggableItem) > i) {
      item.dataset.isAbove = ''
    }
  })
}

/**
 * Helper function for drag(). Continuously updates the projects not being dragged
 * while an project is being dragged
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
 * Helper function for dragEnd(). Reorders and reassembles the projects after the
 * project being dragged has been dropped
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
  let oldProjectLocalstorage = localStorage.getItem('user_projects')
  oldProjectLocalstorage = JSON.parse(oldProjectLocalstorage)
  let newProjectLocalstorage = []
  console.log(oldProjectLocalstorage)
  reorderedItems.forEach((item) => {
    projectsContainer.appendChild(item)

    const article = item.shadowRoot.querySelector('.project')
    console.log(article.querySelector('.project-name').textContent)
    const projectName = article.querySelector('.project-name').textContent
    const matchingProject = oldProjectLocalstorage.find(project => project.projectName === projectName);
    console.log(matchingProject)
    newProjectLocalstorage.push(matchingProject)
  })
  newProjectLocalstorage = JSON.stringify(newProjectLocalstorage)
  localStorage.removeItem('user_projects')
  localStorage.setItem('user_projects', newProjectLocalstorage)
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
  draggableItem.style.transform = ''
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

// export functions for testing
module.exports = getProjectsFromStorage
