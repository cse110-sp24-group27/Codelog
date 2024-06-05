// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init)

// Starts the program, all function calls trace back here
function init () {
  // Update the profile
  const prevProfile = localStorage.getItem('user_profile')
  // Check if the localStorage is already created for projects
  if (isNaN(prevProfile)) {
    fetchProfileExamplejsonToStorage()
  }

  // Get the profile from localStorage
  const profile = getProfileFromStorage()
  updateProfileOnPage(profile)

  // Update the projects
  const prevProjects = localStorage.getItem('user_projects')
  // Check if the localStorage is already created for projects
  if (prevProjects == null) {
    // Get projects from .JSON to localstorage
    fetchProjectsExamplejsonToStorage()
  }

  // Get the projects from localStorage
  const projects = getProjectsFromStorage()
  console.log(projects)
  // Add each project to the <main> element
  addProjectsToDocument(projects)
  // Add the event listeners to the form elements
  // initFormHandler()
}

/**
 * Fetches user_profile from .JSON file to localstorage.
 * Store the profile in localstorage as variable projects.
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
function updateProfileOnPage (profile) {
  document.getElementById('profile-picture').src = profile.profilePicture || 'source/assets/images/userPlaceholder.png'
  document.getElementById('name').textContent = profile.username || 'Developer\'s Name'
  // document.getElementById('username').textContent = profile.username || 'Username'
  document.getElementById('pronoun').textContent = profile.pronouns
  document.getElementById('description').textContent = profile.bio || 'User description'
  // Update links if provided in the profile
  if (profile.socialLinks.email) {
    document.getElementById('link-email').href = `mailto:${profile.socialLinks.email}`
  }
  if (profile.socialLinks.linkedin) {
    document.getElementById('link-linkedin').href = profile.socialLinks.linkedin
  }
  if (profile.socialLinks.github) {
    document.getElementById('link-github').href = profile.socialLinks.github
  }
}

// fetch datasturcture.json to localstorage
function fetchProjectsExamplejsonToStorage () {
  fetch('source/reference/datasturcture.json') // Parse the response as JSON
    .then(response => response.json())
    .then(data => localStorage.setItem('user_projects', JSON.stringify(data))) // Store the parsed data
    .catch(error => {
      console.error('Failed to fetch project data:', error) // More specific error message
    })
}

/**
 * Reads 'projects' from localStorage and returns an array of
 * all of the projects found (parsed, not in string form). If
 * nothing is found in localStorage for 'projects', an empty array
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
  dragProjects()
}

/**
 * Function that allows user to drag the project and reorder
 * projects.
 * Unfinished!
 */
function dragProjects () {
  const projects = document.querySelector('.projects')
  const projectCards = projects.querySelectorAll('project-card')
  projectCards.forEach(project => {
    const article = project.shadowRoot.querySelector('.project')
    project.addEventListener('dragstart', () => {
      // Adding dragging class to project after a delay
      setTimeout(() => article.classList.add('dragging'))
    })
    // Removing dragging-project class from project on dragend event
    project.addEventListener('dragend', () => article.classList.remove('dragging'))
  })

  let draggingItem = null
  const initProjects = (e) => {
    if (!draggingItem) {
      projectCards.forEach(project => {
        if (project.shadowRoot.querySelector('.project').classList.contains('dragging')) {
          draggingItem = project
        }
      })
    }
    if (!draggingItem) return
    projectCards.forEach(project => {
      if (project.shadowRoot.querySelector('.project').classList.contains('dragging')) {
        draggingItem = project
      }
    })
    console.log(draggingItem)
    // Getting all items except currently dragging and making array of them
    const siblings = []
    projectCards.forEach(project => {
      const article = project.shadowRoot.querySelector('.project')
      if (!article.classList.contains('dragging')) {
        siblings.push(project)
      }
    })

    console.log(siblings)
    // Finding the sibling after which teh dragging item should be placed
    const nextSibling = siblings.find(sibling => {
      console.log(sibling.offsetTop)
      console.log(sibling.offsetWidth)
      const rect = sibling.getBoundingClientRect()
      return e.clientY <= rect.top + rect.height / 2
    })
    console.log(nextSibling)
    // Inserting the dragging project before the found sibling
    if (nextSibling) {
      projects.insertBefore(draggingItem, nextSibling)
    } else if (e.clientY > siblings[siblings.length - 1].getBoundingClientRect().bottom) {
      projects.appendChild(draggingItem)
    }
  }
  projects.addEventListener('dragover', initProjects)
}

// export functions for testing
// module.exports = { getProjectsFromStorage }
