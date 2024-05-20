

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
    fetchExamplejsonToStorage();		//update this to asynchronous
	// Get the projects from localStorage
	let projects = getProjectsFromStorage();
	// Add each project to the <main> element
	addProjectsToDocument(projects);
	// Add the event listeners to the form elements
	// initFormHandler();
}

// fetch exampledata.json to localstorage
function fetchExamplejsonToStorage() {
    fetch('source/reference/exampledata.json')
      .then(response => response.json()) // Parse the response as JSON
      .then(data => localStorage.setItem('projects', JSON.stringify(data))) // Store the parsed data
      .catch(error => {
        console.error('Failed to fetch project data:', error); // More specific error message
      });
  }
/**
 * Reads 'projects' from localStorage and returns an array of
 * all of the projects found (parsed, not in string form). If
 * nothing is found in localStorage for 'projects', an empty array
 * is returned.
 * @returns {Array<Object>} An array of projects found in localStorage
 */
function getProjectsFromStorage() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}

/**
 * Takes in an array of projects and for each project creates a
 * new <project-card> element, adds the project data to that card
 * using element.data = {...}, and then appends that new project
 * to '.project-collection'
 * @param {Array<Object>} projects An array of projects
 */
function addProjectsToDocument(projects) {
    // Get a reference to the <main> element
	const mainElement = document.querySelector('.project-collection');

	for (const project of projects) {
		const projectCard = document.createElement('project-card');
		projectCard.data = project; // Set project data on the card
		mainElement.appendChild(projectCard);
	  }
}