// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init)

// Starts the program, all function calls trace back here
function init () {
  // Update this to asynchronous
  fetchExamplejsonToStorage()
  // Get the projects from localStorage
  const projects = getProjectsFromStorage()
  // Add each project to the <main> element
  addProjectsToDocument(projects)
  // Add the event listeners to the form elements
  // initFormHandler()
}

// fetch exampledata.json to localstorage
function fetchExamplejsonToStorage () {
  fetch('source/reference/exampledata.json') // Parse the response as JSON
    .then(response => response.json())
    .then(data => localStorage.setItem('projects', JSON.stringify(data))) // Store the parsed data
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
  const mainElement = document.querySelector('.project-collection')
  for (const project of projects) {
    const projectCard = document.createElement('project-card') // Set project data on the card
    projectCard.data = project
    mainElement.appendChild(projectCard)
  }
}

/**
 * Event listener for + button.
 * When clicking on the + button, pops up the form for manually create new project.
 */
function newProject () {
  // show the pop-up after clicking + button
  const form = document.querySelector('.new-project')
  form.style.display = (form.style.display === 'flex' ? 'none' : 'flex')
  }
  
// add add event listener for + button
const newProjectButton = document.querySelector('#create-btn')
if (newProjectButton) {
  newProjectButton.addEventListener('click', newProject)
}

/**
 * Event listener for Done button in the input form.
 * When clicking on the Done button, submit the form and hide the form.
 */
function addProject () {
  // hide the pop-up after clicking done button
  document.querySelector('.new-project').style.display = 'none'
}

// add event listener for Done button
// modify this to submit the form later on
const addProjectButton = document.querySelector('#done')
if (addProjectButton) {
  addProjectButton.addEventListener('click', addProject)
}

// create project class or DOM for creating new project box
// read details from lab 7
