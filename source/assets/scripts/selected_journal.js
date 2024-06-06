function getCurrJournal () {
  const currProjectName = localStorage.getItem('currDisplayedProject')
  const currEntryName = localStorage.getItem('currDisplayedEntry')
  const userProjectsAsString = localStorage.getItem('user_projects')

  const userProjects = JSON.parse(userProjectsAsString)
  
  // Iterate through projects, find the project with matching projectName
  let currProjectEntries
  userProjects.forEach(project => {
    if (project.projectName === currProjectName) {
      currProjectEntries = project.selected_project_entries
    }
  })

  // Iterate through project's entries and find the entry you want to display
  let entryToDisplay
  currProjectEntries.forEach(entry => {
    if(entry.titleName === currEntryName) {
      entryToDisplay = entry
    }
  })

  return entryToDisplay
}

function displayEntry () {
  const entryToDisplay = getCurrJournal()

  // TODO: use the elements inside entryToDisplay to display the necessary data in the selected_journal_page

  const journalPage = document.getElementById('journal-page')
  journalPage.innerHTML = ''

  let textTitle = entryToDisplay.getItem('titleName')
  document.querySelector('.titleName').innerHTML = textTitle


  entryToDisplay.content.forEach(element => {
    if (element.type === 'header') {
      document.querySelector('.header').innerHTML = element
    } else if (element.type === 'code') {
      document.querySelector('.code').innerHTML = element
    }else if (element.type === "text") {
      document.querySelector('.text').innerHTML = element
    }
  })
}
