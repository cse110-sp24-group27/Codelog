/**
 * @jest-environment jsdom
 */

// Set up localStorage
const projects = [{
  projectName: 'current',
  selected_project_entries: [{ titleName: 'one' }, { titleName: 'two' }]
},
{
  projectName: 'later',
  selected_project_entries: [
    {
      titleName: 'three',
      entryId: 3,
      description: 'entry three',
      content: [
        {
          type: 'header',
          content: 'Render this text with white background and bigger black font'
        },
        {
          type: 'code',
          content: 'Render this text with a dark gray background and light gray font'
        },
        {
          type: 'text',
          content: 'render this text with white background and black font'
        }
      ]
    },
    {
      titleName: 'four',
      entryId: 4,
      description: 'entry four'
    }]
}]
window.localStorage.setItem('user_projects', JSON.stringify(projects))
window.localStorage.setItem('currDisplayedProject', 'later')
window.localStorage.setItem('currDisplayedEntry', 'three')

// Set up Dom
const journal = document.createElement('div')
const projectName = document.createElement('div')
const projectDescription = document.createElement('div')
const journalEntries = document.createElement('div')
const toc = document.createElement('div')
const doneButton = document.createElement('button')
journal.setAttribute('id', 'j-main')
projectName.setAttribute('id', 'project-name')
projectDescription.setAttribute('id', 'project-description')
journalEntries.setAttribute('id', 'journal-entries')
journalEntries.setAttribute('class', 'entry-delete-btn')
toc.setAttribute('id', 'dynamic-content-list')
doneButton.setAttribute('id', 'done-btn')

document.body.appendChild(journal)
document.body.appendChild(projectName)
document.body.appendChild(projectDescription)
document.body.appendChild(journalEntries)
document.body.appendChild(toc)
document.body.appendChild(doneButton)

const {
  getCurrProjectObject,
  projectPageInit,
  populateEntries,
  getAllSelectedProjectEntries,
  loadTableOfContents,
  getAllItems,
  getIdleItems,
  isItemAbove,
  isItemToggled,
  unsetItemState,
  updatelocalStorage
} = require('../assets/scripts/selected_project_page.js')

describe('Testing getCurrProjectObject...', () => {
  const project = getCurrProjectObject()
  test('Testing if the correct project is retrived...', () => {
    expect(project.projectName).toEqual('later')
    expect(project.selected_project_entries.length).toEqual(2)
  })
})

describe('Testing getAllSelectedProjectEntries...', () => {
  const entries = getAllSelectedProjectEntries(projects, 'current')
  test('Testing if the correct project entries are retrived...', () => {
    expect(entries.length).toEqual(2)
    expect(entries[0].titleName).toEqual('one')
    expect(entries[1].titleName).toEqual('two')
  })
})

describe('Testing populateEntries...', () => {
  populateEntries()
  test('Testing if journalEntryContainer is populated...', () => {
    expect(journalEntries.hasChildNodes()).toEqual(true)
    expect(journalEntries.childNodes.length).toEqual(2)
  })
})

describe('Testing loadTableOfContents...', () => {
  loadTableOfContents()
  test('Testing if table of content is populated...', () => {
    expect(toc.childNodes.length).toEqual(2)
  })
  test('Testing if entry list is populated...', () => {
    expect(toc.childNodes[0].hasChildNodes()).toEqual(true)
    expect(toc.childNodes[0].childNodes[0].innerHTML).toEqual('three')
    expect(toc.childNodes[1].childNodes[0].innerHTML).toEqual('four')
  })
})

describe('Testing projectPageInit...', () => {
  projectPageInit()
  test('Testing if journalEntryContainer is populated...', () => {
    expect(journalEntries.hasChildNodes()).toEqual(true)
    expect(journalEntries.childNodes.length).toEqual(2)
  })
  test('Testing if table of content is populated...', () => {
    expect(toc.hasChildNodes()).toEqual(true)
  })
  const entries = toc.childNodes
  test('Testing if entry list is populated...', () => {
    expect(entries[0].hasChildNodes()).toEqual(true)
    expect(entries[0].childNodes[0].innerHTML).toEqual('three')
    expect(entries[1].childNodes[0].innerHTML).toEqual('four')
  })
})

describe('Testing getAllItems...', () => {
  const items = getAllItems()
  test('Testing if all entries are retrieved...', () => {
    expect(items.length).toEqual(2)
  })
})

describe('Testing getIdleItems...', () => {
  const items = getIdleItems()
  test('Testing when all items are idle...', () => {
    expect(items.length).toEqual(2)
  })
})

describe('Testing isItemAbove...', () => {
  const items = getIdleItems()
  const item = isItemAbove(items[0])
  test('Testing when items are idle...', () => {
    expect(item).toEqual(false)
  })
})

describe('Testing isItemToggled...', () => {
  const items = getIdleItems()
  const item = isItemToggled(items[0])
  test('Testing when all items are idle...', () => {
    expect(item).toEqual(false)
  })
})

describe('Testing unsetItemState...', () => {
  unsetItemState()
  const items = getIdleItems()
  test('Testing item should not have isToggled attribute...', () => {
    expect(isItemToggled(items[0])).toEqual(false)
  })
  test('Testing item should not have isAbove attribute...', () => {
    expect(isItemAbove(items[0])).toEqual(false)
  })
})

describe('Testing updatelocalStorage...', () => {
  updatelocalStorage('four', false)
  const updatedProject = JSON.parse(window.localStorage.getItem('user_projects'))
  test('Testing if localStorage is updated after deleting entry...', () => {
    expect(updatedProject[1].selected_project_entries.length).toEqual(1)
    expect(updatedProject[0].selected_project_entries.length).toEqual(2)
    expect(updatedProject[1].selected_project_entries[0].titleName).toEqual('three')
  })
})
