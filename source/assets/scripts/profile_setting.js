// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init)

// Starts the program, all function calls trace back here
function init () {
  // Update this to asynchronous
  const prevProfile = localStorage.getItem('user_profile')
  if (prevProfile == null) {
    fetchExamplejsonToStorage()
  } else {
    // Get the projects from localStorage
    const profile = getProfileFromStorage()
    console.log(profile)
    updateProfileOnPage(profile)
  }
}

function fetchExamplejsonToStorage () {
  fetch('../reference/datastructure.json') // Parse the response as JSON
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
// function getProfileFromStorage () {
//   try {
//     return JSON.parse(localStorage.getItem('user_profile')) || []
//   }
//   catch (err) {
//     console.error(err)
//   }
// }
function getProfileFromStorage () {
  try {
    const profileString = localStorage.getItem('user_profile')
    if (profileString) {
      return JSON.parse(profileString)
    }
    return null // Or another appropriate value for error case
  } catch (err) {
    console.error('Error retrieving profile from storage:', err)
  }
}
// TODO: implement function to store localstorage to .JSON

// Update the HTML page with the profile data
function updateProfileOnPage (profile) {
  document.getElementById('profile-picture').src = profile.profilePicture || 'https://via.placeholder.com/150'
  document.getElementById('name').value = profile.username || 'Name'
  // document.getElementById('username').value = profile.username || 'Username'
  document.getElementById('pronoun').value = profile.pronouns
  document.getElementById('description').value = profile.bio
  // Update links if provided in the profile
  if (profile.socialLinks.email) {
    document.getElementById('link-email').href = `mailto:${profile.socialLinks.email}`
    document.getElementById('link-email').value = profile.socialLinks.email
  }
  if (profile.socialLinks.linkedin) {
    document.getElementById('link-linkedin').href = profile.socialLinks.linkedin
    document.getElementById('link-linkedin').value = profile.socialLinks.linkedin
  }
  if (profile.socialLinks.github) {
    document.getElementById('link-github').href = profile.socialLinks.github
    document.getElementById('link-github').value = profile.socialLinks.github
  }
}

// Handle image preview (Tim and fiona will manually merge from html + the code below)
function loadImage (event) {
  const output = document.getElementById('profile-picture')
  output.src = URL.createObjectURL(event.target.files[0])
}

// Save the profile data to localStorage
function save () {
  const profile = getProfileFromStorage()
  const newProfile = {
    username: document.getElementById('name').value,
    pronouns: document.getElementById('pronoun').value,
    bio: document.getElementById('description').value,
    socialLinks: {
      email: document.getElementById('link-email').value,
      linkedin: checkURL(document.getElementById('link-linkedin').value, 'linkedin'),
      github: checkURL(document.getElementById('link-github').value, 'github')
    },
    profilePicture: profile.profilePicture // Retain the old image if no new image is uploaded
  }
  const imageUpload = document.getElementById('profile-picture-upload')
  if (imageUpload.files && imageUpload.files[0]) {
    // A new image has been uploaded
    const reader = new FileReader()
    reader.onload = function (e) {
      newProfile.profilePicture = e.target.result
      localStorage.setItem('user_profile', JSON.stringify(newProfile))
      console.log('profile updated with new image:', newProfile)
    }
    reader.readAsDataURL(imageUpload.files[0])
  } else {
    // No new image uploaded, retain the existing image
    localStorage.setItem('user_profile', JSON.stringify(newProfile))
    console.log('profile updated without new image: ', newProfile)
  }
  alert('Profile was saved!')
}

// Reset the profile form to previous state
function cancel () {
  const profile = getProfileFromStorage()
  document.getElementById('profile-form').reset()
  document.getElementById('profile-picture').src = profile.profilePicture || 'https://via.placeholder.com/150'
  console.log('reset form')
}

// function to check if users github or linkedin url contains correct format
function checkURL (url, type) {
  if (url === '') {
    return ''
  }
  if (type === 'linkedin' && !url.startsWith('https://www.')) {
    // Remove 'http://www.' and add 'https://www.'
    if (url.startsWith('http://www.')) {
      return 'https://www.' + url.substring(11)
      // Remove 'http://' and add 'https://www.'
    } else if (url.startsWith('http://')) {
      return 'https://www.' + url.substring(7)
      // Remove 'http://' and add 'https://www.'
    } else if (url.startsWith('https://')) {
      // Remove 'https://' and add 'https://www.'
      return 'https://www.' + url.substring(8)
    } else {
      // add 'https://www.' if none of above is found
      return 'https://www.' + url
    }
  } else {
    if (!url.startsWith('https://')) {
      if (url.startsWith('http://')) {
        // Remove 'http://' and add 'https://'
        return 'https://' + url.substring(7)
      }
      // add 'https://' if none of above
      return 'https://' + url
    }
  }
  return url
}

window.loadImage = loadImage
window.save = save
window.cancel = cancel

// export functions for testing
module.exports = { getProfileFromStorage, updateProfileOnPage, loadImage, save, cancel, checkURL }
