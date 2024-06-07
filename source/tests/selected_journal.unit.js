/**
 * @jest-environment jsdom
 */

// Set up localStorage
window.localStorage.setItem('user_projects', JSON.stringify([{
  projectName: 'current',
  selected_project_entries: [{ titleName: 'one' }, { titleName: 'two' }]
}, {
  projectName: 'later',
  selected_project_entries: [
    {
      titleName: 'three',
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
    }, { titleName: 'four' }]
}
]))
window.localStorage.setItem('currDisplayedProject', 'later')
window.localStorage.setItem('currDisplayedEntry', 'three')

// Set up Dom
const journal = document.createElement('div')
journal.setAttribute('id', 'j-main')
document.body.appendChild(journal)

const { getCurrJournal, displayEntry } = require('../assets/scripts/selected_journal.js')

describe('Testing getCurrJournal...', () => {
  const entry = getCurrJournal()
  test('Testing if the correct entry is retrived...', () => {
    expect(entry.titleName).toEqual('three')
  })
})

describe('Testing displayEntry...', () => {
  displayEntry()
  test('Testing if journal page contains the entry...', () => {
    expect(journal.hasChildNodes()).toEqual(true)
    expect(journal.childNodes.length).toEqual(4)
  })
})
