/**
 * @jest-environment jsdom
 */

const { getProjectsFromStorage } = require('../assets/scripts/main')
// const project1 = ``

describe('Testing getProjectsFromStorage...', () => {
  // window.localStorage.setItem('projects', JSON.stringify([project1]))
  const projectArr = getProjectsFromStorage()
  test('Testing get projects when no project...', () => {
    expect(projectArr.length).toEqual(0)
  })
  /*
  test('Testing get projects when one project was added...', () => {
    expect(projectArr.length).toEqual(1)
  })
  test('Testing output array content...', () => {
    expect(projectArr[0]).toEqual(project1)
  })
  */
})
