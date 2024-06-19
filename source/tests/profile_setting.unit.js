/**
 * @jest-environment jsdom
 */

const { getProfileFromStorage, updateProfileOnPage, save, checkURL } = require('../assets/scripts/profile_setting.js')

// Setting up Dom for testing
const image = document.createElement('img')
const name = document.createElement('div')
const pronoun = document.createElement('div')
const description = document.createElement('div')
const email = document.createElement('a')
const linkedin = document.createElement('a')
const github = document.createElement('a')
const pfp = document.createElement('div')
image.setAttribute('id', 'profile-picture')
name.setAttribute('id', 'name')
pronoun.setAttribute('id', 'pronoun')
description.setAttribute('id', 'description')
email.setAttribute('id', 'link-email')
linkedin.setAttribute('id', 'link-linkedin')
github.setAttribute('id', 'link-github')
pfp.setAttribute('id', 'profile-picture-upload')
document.body.appendChild(image)
document.body.appendChild(name)
document.body.appendChild(pronoun)
document.body.appendChild(description)
document.body.appendChild(email)
document.body.appendChild(linkedin)
document.body.appendChild(github)
document.body.appendChild(pfp)
const userProfile = {
  profilePicture: 'https://via.placeholder.com/150',
  username: 'David',
  pronouns: 'He/Him',
  bio: 'desc',
  socialLinks: {
    email: 'https://via.placeholder.com/1140',
    linkedin: 'https://www.via.placeholder.com/1160',
    github: 'https://via.placeholder.com/1170'
  }
}

describe('Testing getProfileFromStorage...', () => {
  const profileArr = getProfileFromStorage()
  test('Testing get projects when no projects...', () => {
    expect(profileArr).toEqual(null)
  })
})

describe('Testing updateProfileOnPage...', () => {
  updateProfileOnPage(userProfile)
  test('Testing pfp source...', () => {
    expect(image.src).toEqual('https://via.placeholder.com/150')
  })
  test('Testing username...', () => {
    expect(name.value).toEqual('David')
  })
  test('Testing pronouns...', () => {
    expect(pronoun.value).toEqual('He/Him')
  })
  test('Testing description...', () => {
    expect(description.value).toEqual('desc')
  })
  test('Testing email link...', () => {
    expect(email.href).toEqual('mailto:https://via.placeholder.com/1140')
  })
  test('Testing linkedin link...', () => {
    expect(linkedin.href).toEqual('https://www.via.placeholder.com/1160')
  })
  test('Testing github link...', () => {
    expect(github.href).toEqual('https://via.placeholder.com/1170')
  })
  window.localStorage.setItem('user_profile', JSON.stringify({ profilePicture: 'https://via.placeholder.com/150' }))
  window.alert = () => {}
  save()
  const storage = JSON.parse(window.localStorage.getItem('user_profile'))
  test('Testing if profile is saved to localStorage...', () => {
    expect(storage).toEqual(userProfile)
  })
})

describe('Testing checkURL...', () => {
  test('Testing with empty url...', () => {
    expect(checkURL('', '')).toEqual('')
  })
  test('Testing with linkedin url...', () => {
    expect(checkURL('https://www.linkedin.com/in/david-liu-ruipeng/', 'linkedin')).toEqual('https://www.linkedin.com/in/david-liu-ruipeng/')
  })
  test('Testing with insecure url...', () => {
    expect(checkURL('http://www.linkedin.com/in/david-liu-ruipeng/', 'linkedin')).toEqual('https://www.linkedin.com/in/david-liu-ruipeng/')
  })
  test('Testing with other types of url...', () => {
    expect(checkURL('http://via.placeholder.com/1170', 'placeholder')).toEqual('https://via.placeholder.com/1170')
  })
})
