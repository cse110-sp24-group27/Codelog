/**
 * @jest-environment jsdom
 */

const { getProjectsFromStorage } = require('../assets/scripts/main')
const project1 = `{
    "projectId": 1,
    "projectName": "Project Awesome",
    "projectDescription": "This is a description for an awesome project. It's a long description to fill up some space and make the project card look more interesting.",
    "status": "Public",
    "tags": ["Awesome", "Web Dev", "JavaScript"],
    "journals": [
      {
        "journalId": 1,
        "journalTitle": "Journal Entry 1 for Project Awesome",
        "tags": ["Planning", "Initial Research"],
        "template": "This is some content using a template",
        "markdown": "This is some markdown content for the journal entry."
      },
      {
        "journalId": 2,
        "journalTitle": "Journal Entry 2 for Project Awesome",
        "tags": ["Development", "Progress Update"],
        "template": "This is some other template content",
        "markdown": "Here's more markdown content for another journal entry."
      },
      {
        "journalId": 3,
        "journalTitle": "Journal Entry 3 for Project Awesome",
        "tags": ["Testing", "Bug Fixes"],
        "template": "Even more template content!",
        "markdown": "And some final markdown content for this project."
      }
    ]
  }`

describe('Testing getProjectsFromStorage...', () => {
  window.localStorage.setItem('projects', JSON.stringify([project1]))
  const projectArr = getProjectsFromStorage()
  test('Testing get projects when one project was added...', () => {
    expect(projectArr.length).toEqual(1)
  })
  test('Testing output array content...', () => {
    expect(projectArr[0]).toEqual(project1)
  })
})
