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
    if (entry.titleName === currEntryName) {
      entryToDisplay = entry
    }
  })
  return entryToDisplay
}
function displayEntry () {
  const entryToDisplay = getCurrJournal()
  const journalPage = document.getElementById('j-main')
  journalPage.innerHTML = ''

  console.log(entryToDisplay)
  const currEntryName = localStorage.getItem('currDisplayedEntry')
  const newTitle = document.createElement('h1')
  newTitle.classList.add('journal-title')
  newTitle.textContent = currEntryName
  journalPage.appendChild(newTitle)

  // document.querySelector('.titleName').innerHTML = textTitle
  entryToDisplay.content.forEach(item => {
    let newElement
    // Create elements based on the type
    switch (item.type) {
      case 'header': {
        newElement = document.createElement('h2')
        newElement.classList.add('header')
        newElement.textContent = item.content
        break
      }
      case 'code': {
        newElement = document.createElement('p')
        newElement.classList.add('code')
        newElement.textContent = item.content
        break
      }
      case 'text': {
        newElement = document.createElement('p')
        newElement.classList.add('text')
        newElement.textContent = item.content
        break
      }
      default: {
        console.warn('Unknown content type:', item.type)
        return
      }
    }
    journalPage.appendChild(newElement)
  })
  //   if (element.type === 'header') {
  //     document.querySelector('.header').innerHTML = element
  //   } else if (element.type === 'code') {
  //     document.querySelector('.code').innerHTML = element
  //   } else if (element.type === 'text') {
  //     document.querySelector('.text').innerHTML = element
  //   }
  // })
}
// displayEntry()
window.addEventListener('load', displayEntry())

// export functions for testing
module.exports = { getCurrJournal, displayEntry }
