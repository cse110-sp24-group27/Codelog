// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init)

// Starts the program, all function calls trace back here
function init () {
  // Update the profile
  const prevProfile = localStorage.getItem('profile')
  // Check if the localStorage is already created for projects
  if (isNaN(prevProfile)) {
    fetchProfileExamplejsonToStorage()
  }

  // Get the profile from localStorage
  const profile = getProfileFromStorage()
  updateProfileOnPage(profile)

  // Update the projects
  const prevProjects = localStorage.getItem('projects')
  // Check if the localStorage is already created for projects
  if (prevProjects == null) {
    // Get projects from .JSON to localstorage
    fetchExamplejsonToStorage()
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
      localStorage.setItem('profile', profileData)
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
  return JSON.parse(localStorage.getItem('profile')) || []
}

// Update the HTML page with the profile data
function updateProfileOnPage (profile) {
  document.getElementById('profile-picture').src = profile.profilePicture || 'https://via.placeholder.com/150'
  document.getElementById('name').textContent = profile.username || 'Developer\'s Name'
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

/**
 * Fetches user_projects from .JSON file to localstorage.
 * Store the projects in localstorage as variable projects.
 */
function fetchExamplejsonToStorage () {
  console.log('hi')
  fetch('source/reference/datastructure.json') // Parse the response as JSON
    .then(response => response.json())
    .then(data => {
      const projectsData = JSON.stringify(data.user_projects)
      localStorage.setItem('projects', projectsData)
      console.log('Projects successfully stored in localStorage');
    }) // Store the parsed data
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
  return JSON.parse(localStorage.getItem('projects')) || []
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
}

// export functions for testing
module.exports = { getProjectsFromStorage }
