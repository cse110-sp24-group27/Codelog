/**
 * @jest-environment jsdom
 */

const { getProjectsFromStorage, getProfileFromStorage } = require('../assets/scripts/main.js')

describe('Testing getProjectsFromStorage...', () => {
  const projectArr = getProjectsFromStorage()
  test('Testing get projects when no project...', () => {
    expect(projectArr.length).toEqual(0)
  })
})

describe('Testing getProfileFromStorage...', () => {
  const profileArr = getProfileFromStorage()
  test('Testing get projects when no project...', () => {
    expect(profileArr.length).toEqual(0)
  })
})
