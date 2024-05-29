// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init)

// Starts the program, all function calls trace back here
function init () {
  // Update this to asynchronous
  fetchExamplejsonToStorage()
  // Get the projects from localStorage
  const profile = getProfileFromStorage()
  console.log(profile)
  // Call function to store profile to .JSON
}

// fetch datastructure.json to localstorage
function fetchExamplejsonToStorage () {
  fetch('../reference/datastructure.json') // Parse the response as JSON
    .then(response => response.json())
    .then(data => {
      const profileData = JSON.stringify(data.profile)
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

// TODO: implement function to store localstorage to .JSON
