/**
 * @jest-environment jsdom
 */

const { getProjectsFromStorage, getProfileFromStorage, updateProfileOnPage } = require('../assets/scripts/main.js')

// Setting up Dom for testing
const image = document.createElement('img')
const name = document.createElement('div')
const pronoun = document.createElement('div')
const description = document.createElement('div')
const email = document.createElement('a')
const linkedin = document.createElement('a')
const github = document.createElement('a')
image.setAttribute('id', 'profile-picture')
name.setAttribute('id', 'name')
pronoun.setAttribute('id', 'pronoun')
description.setAttribute('id', 'description')
email.setAttribute('id', 'link-email')
linkedin.setAttribute('id', 'link-linkedin')
github.setAttribute('id', 'link-github')
document.body.appendChild(image)
document.body.appendChild(name)
document.body.appendChild(pronoun)
document.body.appendChild(description)
document.body.appendChild(email)
document.body.appendChild(linkedin)
document.body.appendChild(github)

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

describe('Testing updateProfileOnPage...', () => {
  const userProfile = {
    username: 'David',
    pronouns: 'He/Him',
    bio: 'desc',
    socialLinks: {
      email: 'https://via.placeholder.com/1140',
      linkedin: 'https://via.placeholder.com/1160',
      github: 'https://via.placeholder.com/1170'
    }
  }
  updateProfileOnPage(userProfile)
  test('Testing pfp source...', () => {
    expect(image.src).toEqual('https://via.placeholder.com/150')
  })
  test('Testing username...', () => {
    expect(name.textContent).toEqual('David')
  })
  test('Testing pronouns...', () => {
    expect(pronoun.textContent).toEqual('He/Him')
  })
  test('Testing description...', () => {
    expect(description.textContent).toEqual('desc')
  })
  test('Testing email link...', () => {
    expect(email.href).toEqual('mailto:https://via.placeholder.com/1140')
  })
  test('Testing linkedin link...', () => {
    expect(linkedin.href).toEqual('https://via.placeholder.com/1160')
  })
  test('Testing github link...', () => {
    expect(github.href).toEqual('https://via.placeholder.com/1170')
  })
})
