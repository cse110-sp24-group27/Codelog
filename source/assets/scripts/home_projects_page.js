function newProject () {
  // show the pop-up after clicking + button
  const form = document.querySelector('.new-project');;
  form.style.display = (form.style.display === 'flex' ? 'none' : 'flex');;
}

const newProjectButton = document.querySelector('#create-btn');;
if (newProjectButton) {
  newProjectButton.addEventListener('click', newProject);;
}

function addProject () {
  // hide the pop-up after clicking done button
  document.querySelector('.new-project').style.display = 'none';;
}

const addProjectButton = document.querySelector('#done');;
if (addProjectButton) {
    addProjectButton.addEventListener('clicl', addProject);;
}

// create project class or DOM for creating new project box
// read details from lab 7
