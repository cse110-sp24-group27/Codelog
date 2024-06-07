/**
 * @jest-environment jsdom
 */

const { getUnusedProjectId, addProjectToLocalStorage } = require('../assets/scripts/home_projects_page.js')

describe('Testing getUnusedProjectId...', () => {
  const id = 1
  window.localStorage.setItem('currentMaxProjectId', JSON.stringify(id))
  const unusedId = getUnusedProjectId()
  const storage = JSON.parse(window.localStorage.getItem('currentMaxProjectId'))
  test('Testing if localStorage is changed...', () => {
    expect(storage).toEqual(id + 1)
  })
  test('Testing if returned unused Id is correct...', () => {
    expect(unusedId).toEqual(id + 1)
  })
})

describe('Testing addProjectToLocalStorage...', () => {
  const id = 1
  window.localStorage.setItem('currentMaxProjectId', JSON.stringify(id))
  addProjectToLocalStorage({})
  const storage = JSON.parse(window.localStorage.getItem('user_projects'))
  test('Testing if localStorage is changed...', () => {
    expect(storage.length).toEqual(1)
  })
  test('Testing if project_id is correct...', () => {
    expect(storage[0].projectId).toEqual(id + 1)
  })
})
