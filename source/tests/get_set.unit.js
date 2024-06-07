/**
 * @jest-environment jsdom
 */

const { getUnusedProjectId, addProjectToLocalStorage, getAllUserProjects, addEntry } = require('../assets/scripts/get_set_from_localStorage.js')

describe('Testing getUnusedProjectId...', () => {
  const id = 1
  window.localStorage.setItem('current_max_project_id', JSON.stringify(id))
  const unusedId = getUnusedProjectId()
  const storage = JSON.parse(window.localStorage.getItem('current_max_project_id'))
  test('Testing if localStorage is changed...', () => {
    expect(storage).toEqual(id + 1)
  })
  test('Testing if returned unused Id is correct...', () => {
    expect(unusedId).toEqual(id + 1)
  })
})

describe('Testing addProjectToLocalStorage and getAllUserProjects...', () => {
  const id = 1
  window.localStorage.setItem('current_max_project_id', JSON.stringify(id))
  addProjectToLocalStorage({})
  const storage = JSON.parse(window.localStorage.getItem('user_projects'))
  test('Testing if localStorage is changed...', () => {
    expect(storage.length).toEqual(1)
  })
  test('Testing if project_id is correct...', () => {
    expect(storage[0].project_id).toEqual(id + 1)
  })
  const array = getAllUserProjects()
  test('Testing if output array length is correct...', () => {
    expect(array.length).toEqual(1)
  })
  test('Testing if output array objects are correct...', () => {
    expect(array[0].project_id).toEqual(id + 1)
  })
})

describe('Testing addEntry...', () => {
  const id = 1
  window.localStorage.setItem('current_max_entry_id', JSON.stringify(id))
  addEntry({ selected_project_entries: [] }, {})
  const storage = JSON.parse(window.localStorage.getItem('selected_project'))
  const entryId = JSON.parse(window.localStorage.getItem('current_max_entry_id'))
  test('Testing if current_max_entry_id is increased...', () => {
    expect(entryId).toEqual(id + 1)
  })
  test('Testing if project is in localStorage...', () => {
    expect(storage).toEqual({ selected_project_entries: [{ entry_id: 2 }] })
  })
})
