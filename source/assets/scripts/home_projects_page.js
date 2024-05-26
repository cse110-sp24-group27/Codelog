document.addEventListener('DOMContentLoaded', function () {
  let selectedTags = [];

  // Function to handle the new project form
  function newProject() {
    const form = document.querySelector('.new-project');
    form.style.display = (form.style.display === 'flex' ? 'none' : 'flex');
  }

  // Function to get a new project ID based on the number of projects in local storage
  function getNewProjectId(projects) {
    const maxId = projects.reduce((max, project) => Math.max(max, project.projectId), 0);
    return maxId + 1;
  }

  // Function to handle the addition of a new project
  function addProject() {
    const projectName = document.querySelector('#new-project-description').value;
    const projectDescription = document.querySelector('#new-entry').value;
    const selectedPrivacyOption = document.querySelector('.privacy-option.bold');

    // Ensure that a privacy option is selected
    if (!selectedPrivacyOption) {
      alert('Please select a privacy option.');
      return;
    }

    const status = selectedPrivacyOption.id === 'private' ? 'Private' : 'Public';

    const projects = getProjectsFromStorage();
    const projectId = getNewProjectId(projects);

    const newProject = {
      projectId: projectId,
      projectName: projectName,
      projectDescription: projectDescription,
      status: status,
      tags: selectedTags,
      journals: []
    };

    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));

    document.querySelector('.new-project').style.display = 'none';
    resetForm();
    addProjectsToDocument([newProject]);
  }

  // Function to handle adding more entry fields
  function addEntry() {
    const newEntry = document.createElement('input');
    newEntry.type = 'text';
    newEntry.placeholder = 'Enter Entry content.';
    newEntry.id = 'new-entry';
    const moreEntryButton = document.getElementById('more-entry');
    moreEntryButton.insertAdjacentElement('beforebegin', newEntry);
  }

  // Function to handle tag selection
  function toggleTag(tagElement) {
    const tag = tagElement.textContent;

    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(t => t !== tag);
      tagElement.style.fontWeight = 'normal';
    } else {
      selectedTags.push(tag);
      tagElement.style.fontWeight = 'bold';
    }
  }

  // Function to handle privacy selection
  function selectPrivacy(option) {
    document.getElementById('public').classList.remove('bold');
    document.getElementById('private').classList.remove('bold');
    document.getElementById(option).classList.add('bold');
  }

  // Function to reset the form
  function resetForm() {
    document.querySelector('#new-project-description').value = '';
    document.querySelectorAll('#new-entry').forEach(entry => { entry.value = ''; });
    selectedTags = [];
    document.querySelectorAll('.tag').forEach(tag => { tag.style.fontWeight = 'normal'; });
    document.getElementById('public').classList.remove('bold');
    document.getElementById('private').classList.remove('bold');
  }

  // Event listeners
  document.querySelector('#create-btn').addEventListener('click', newProject);
  document.querySelector('#done').addEventListener('click', addProject);
  document.querySelector('#more-entry').addEventListener('click', addEntry);

  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function () {
      if (!this.classList.contains('add-tag')) {
        toggleTag(this);
      }
    });
  });

  document.getElementById('public').addEventListener('click', function () {
    selectPrivacy('public');
  });
  document.getElementById('private').addEventListener('click', function () {
    selectPrivacy('private');
  });
});

// Ensure getProjectsFromStorage and addProjectsToDocument are available
function getProjectsFromStorage() {
  return JSON.parse(localStorage.getItem('projects')) || [];
}

function addProjectsToDocument(projects) {
  const mainElement = document.querySelector('.projects');
  projects.forEach(project => {
    const projectCard = document.createElement('project-card');
    projectCard.data = project;
    mainElement.appendChild(projectCard);
  });
}