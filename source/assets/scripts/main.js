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
  const prevProfile = localStorage.getItem('user_profile')
  // Check if the localStorage is already created for projects
  if (prevProfile == null) {
    fetchProfileExamplejsonToStorage()
  } else {
    // Get the profile from localStorage
    const userProfile = getProfileFromStorage()
    updateProfileOnPage(userProfile)
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
function updateProfileOnPage (userProfile) {
  document.getElementById('profile-picture').src = userProfile.profilePicture || 'https://via.placeholder.com/150'
  document.getElementById('name').textContent = userProfile.username || 'Developer\'s Name'
  document.getElementById('pronoun').textContent = userProfile.pronouns
  document.getElementById('description').textContent = userProfile.bio || 'User description'
  // Update links if provided in the profile
  console.log(userProfile)
  if (userProfile.socialLinks.email) {
    document.getElementById('link-email').href = `mailto:${userProfile.socialLinks.email}`
  }
  if (userProfile.socialLinks.linkedin) {
    document.getElementById('link-linkedin').href = userProfile.socialLinks.linkedin
  }
  if (userProfile.socialLinks.github) {
    document.getElementById('link-github').href = userProfile.socialLinks.github
  }
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
}

// export functions for testing
module.exports = { getProjectsFromStorage, getProfileFromStorage, updateProfileOnPage }
