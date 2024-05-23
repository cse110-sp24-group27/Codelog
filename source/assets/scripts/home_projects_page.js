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
  