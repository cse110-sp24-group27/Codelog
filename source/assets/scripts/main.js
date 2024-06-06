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

  // Update the projects
  const prevProjects = localStorage.getItem('user_projects')
  // Check if the localStorage is already created for projects
  if (prevProjects === null) {
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
}

// export functions for testing
module.exports = getProjectsFromStorage
