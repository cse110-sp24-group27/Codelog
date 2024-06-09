// Tests that cover basic User interactions
const puppeteer = require('puppeteer')
// Define the browser and page
let browser
let page

// Helper function to delay execution
function delay (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

// Function to click on the first project card and verify navigation
async function clickFirstProjectCard (page) {
  // Click on the first project card using shadow DOM traversal
  const projectCard = await page.$('project-card')
  const shadowRoot = await projectCard.evaluateHandle(card => card.shadowRoot)
  const projectLink = await shadowRoot.$('a.project-name')
  await projectLink.click()

  await delay(3000)

  // Verify that the navigation was successful
  const projectPageURL = await page.url()
  expect(projectPageURL).toContain('selected_project_page.html')
}

describe('Basic user flow for Website', () => {
  // Navigate to the journal webpage for initial setup
  beforeAll(async () => {
    browser = await puppeteer.launch(/* { headless: false, slowMo: 300 } */)
    delay(100)
    page = await browser.newPage()
    delay(100)
    await page.goto('https://cse110-sp24-group27.github.io/cse110-sp24-group27/home_projects_page.html')
  }, 20000)

  afterAll(async () => {
    // close browser
    await browser.close()
  })
  delay(500)
  // Test-1 Update and verify saved user profile information
  test('update and verify user profile information', async () => {
    delay(100)
    // Navigate to settings page
    await page.click('button#setting')

    await delay(100)

    // Clear and fill in profile details
    await page.evaluate(() => {
      document.querySelector('input#name').value = 'wayfarer'
      document.querySelector('input#pronoun').value = 'they'
      document.querySelector('input#description').value = 'SE'
      document.querySelector('input#link-email').value = 'email@em.em'
      document.querySelector('input#link-linkedin').value = 'lnk'
      document.querySelector('input#link-github').value = 'gh'
    })

    // Handle system dialog
    page.on('dialog', async dialog => {
      await dialog.accept()
    })

    // Save the profile information
    await page.click('button#save-bnt')

    // Verify that the changes are saved correctly
    const profile = await page.evaluate(() => {
      const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}')
      const socialLinks = userProfile.socialLinks

      return {
        username: userProfile.username,
        pronouns: userProfile.pronouns,
        bio: userProfile.bio,
        email: socialLinks.email,
        linkedin: socialLinks.linkedin,
        github: socialLinks.github
      }
    })

    expect(profile).toEqual({
      username: 'wayfarer',
      pronouns: 'they',
      bio: 'SE',
      email: 'email@em.em',
      linkedin: 'https://www.lnk',
      github: 'https://gh'
    })
  }, 10000)

  // TEST-2 verify adding journal project 1 and add a tag
  test('verify adding journal project 1 and add a tag', async () => {
    delay(100)
    // Navigate to home page
    await page.click('button#home')

    await page.click('button#create-btn')

    await page.focus('input#new-project-name')
    await page.keyboard.type('p')

    await page.focus('input#new-project-description')
    await page.keyboard.type('d')
    await page.click('button#public')

    await page.click('.tag.add-tag')
    await page.focus('#new-tag-name')
    await page.keyboard.type('t1')
    await page.focus('#new-tag-color')
    // choose the color
    await page.evaluate(() => {
      document.getElementById('new-tag-color').value = '#ff0000'
    })

    await delay(100)

    // Click the add tag button
    await page.waitForSelector('#add-tag-btn', { visible: true })

    await page.click('#add-tag-btn')
    await delay(100)

    const tagItem = await page.$('.tag-item')
    await tagItem.click()

    await page.click('.close')

    await page.click('button#done')

    // Get the projects from local storage
    const projects = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('user_projects') || '[]')
    })
    // Check if the project is public
    expect(projects[0].privacy).toBe('Public')
    // Check if the tag is added
    expect(projects[0].tags).toContainEqual('t1')
    // Check if the project is still saved locally
    expect(projects.length).toBe(1)
  }, 3000)

  // TEST-3 Verify adding a second journal private project
  test('verify adding a second journal private project', async () => {
    delay(100)
    // Navigate to home page
    await page.click('button#home')

    await page.click('button#create-btn')

    await page.focus('input#new-project-name')
    await page.keyboard.type('P2')

    await page.focus('input#new-project-description')
    await page.keyboard.type('D2')
    await page.click('button#private')

    await page.click('button#done')

    // Get the projects from local storage
    const projects = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('user_projects') || '[]')
    })

    // Check if the second project is private
    expect(projects[1].privacy).toBe('Private')
    // Check if the project is still saved locally
    expect(projects.length).toBe(2)
  }, 10000)

  // TEST-4 create journal entry
  test('create journal entry', async () => {
    delay(100)
    // Navigate to home page
    await page.click('button#home')

    // Get the project entry 1 from local storage
    const projects = await page.evaluate(() => {
      const projects = JSON.parse(localStorage.getItem('user_projects') || '[]')
      return projects
    })
    delay(100)

    // Check if project 1 is public
    expect(projects[0].privacy).toBe('Public')

    // Click on the first project card using shadow DOM traversal
    await clickFirstProjectCard(page)

    // Create a new journal entry
    await page.click('button#create-btn') // Adjust the selector as necessary
    await page.focus('input#new-entry-name')
    await page.keyboard.type('je1')
    await page.focus('input#new-entry-description')
    await page.keyboard.type('de1')
    await page.click('button#done-btn') // Adjust the selector as necessary

    await delay(1000)

    // Verify the journal entry was created
    const updatedProjects = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('user_projects') || '[]')
    })

    expect(updatedProjects[0].selected_project_entries).toContainEqual(expect.objectContaining({
      titleName: 'je1',
      description: 'de1'
    }))
  }, 10000)

  // TEST-5 delete journal entry
  test('delete journal entry', async () => {
    delay(100)
    // Navigate to home page
    await page.click('button#home')

    // Click on the first project card using shadow DOM traversal
    await clickFirstProjectCard(page)

    // Access the journal entry delete button
    const deleteButton = await page.$('.entry-delete-btn') // Adjust the selector as necessary

    // Click the delete button
    await deleteButton.click()

    await delay(1000)

    // Verify the journal entry was deleted
    const updatedProjects = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('user_projects') || '[]')
    })

    expect(updatedProjects[0].selected_project_entries.length).toBe(0)

    expect(updatedProjects[0].selected_project_entries).not.toContainEqual(expect.objectContaining({
      titleName: 'je1',
      description: 'de1'
    }))
  }, 10000)

  // TEST-6 Delete journal project
  test('delete journal project', async () => {
    delay(100)
    // Access the shadow DOM and click the delete button
    // Navigate to the home page
    await page.click('button#home')
    const projectCard = await page.evaluateHandle(() => {
      return document.querySelector('project-card').shadowRoot
    })

    // Get the delete button inside the shadow DOM
    const deleteButton = await projectCard.evaluateHandle((shadowRoot) => {
      return shadowRoot.querySelector('.delete-btn')
    })
    await deleteButton.click()

    await delay(100)

    // Get the projects from local storage
    const projectsAfterDelete = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('user_projects') || '[]')
    })

    // Check if the project is removed
    expect(projectsAfterDelete.length).toBe(1)
  }, 10000)

  // TEST-7: Verify navigation bar links navigate correctly
  test('navigation bar functionality', async () => {
    delay(100)
    // Navigate to the settings page
    await page.click('button#setting')
    await delay(100)

    // Check if the URL is correct
    expect(page.url()).toBe('https://cse110-sp24-group27.github.io/cse110-sp24-group27/source/reference/project_setting.html')

    // Navigate to the home page
    await page.click('button#home')
    await delay(100)

    // Check if the URL is correct
    expect(page.url()).toBe('https://cse110-sp24-group27.github.io/cse110-sp24-group27/home_projects_page.html')

    // Navigate to the settings page
    await page.click('button#setting')
    await delay(100)

    // Navigate to the home page via the logo
    await page.click('img#codelog-pic')
    await delay(100)

    // Check if the URL is correct
    expect(page.url()).toBe('https://cse110-sp24-group27.github.io/cse110-sp24-group27/home_projects_page.html')
  }, 10000)
})
