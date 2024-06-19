class ProjectCard extends HTMLElement {
  // Called once when document.createElement('project-card') is called, or
  // the element is written into the DOM directly as <project-card>
  constructor () {
    super() // inherit everything from HTMLElement

    // attach the shadow DOM to this Web Component (leave the mode open)
    this.attachShadow({ mode: 'open' })

    // create an <article> element - This will hold our markup once our data is set
    const article = document.createElement('article')

    // Create a style element - This will hold all of the styles for the Web Component
    const style = document.createElement('style')
    style.textContent = `
    article {
      margin-right: auto;
      margin-bottom: 20px;
      width: 350px;
      height: 150px;
      border: solid #434345;
      border-radius: 10px;
      position: relative;
      padding: 10px;
      }

       /* Style for project name */
      h3.project-name {
        margin-left: 5%;
        margin-right: 5px;
        font-size: 18px;
        color: #eaeaea;
        text-decoration: none;
      }

       /* Style for project status */
      p.status {
        position: absolute;
        top: 20px;
        right: 50px;
        color: #eaeaea;
        font-size: 10px;
        margin-left: 5%;
        margin-right: 5px;
      }

      /* Style for project description */
      p.project-description {
        font-size: 10px;
        margin: 0% 5% 10%;
      }

      /* Style the drag button container */
      .delete-btn-container {
        /* Use absolute position to place the button container correctly */
        position: absolute;
        top: 10px;
        right: 10px;
        width: 2vw;
        height: auto;
      }
 
      /* Style the drag buttons within each journal entry */
      .delete-btn {
        cursor: grab;
        background-color: inherit;
        appearance: none;
        border: none;
      }

      /* Style the drag button image */
      .delete-btn-img {
        position: relative;
        width: 10px;
        height: auto;
      }

      /* Style the tags of each project */
      div.tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      div.tags p {
        border-radius: 2px;
        padding: 5px 10px;
        color: #cbcbcb;
        font-size: 12px;
        display: flex;
        align-items: center;
        margin: 0;
      }

       p.dot {
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background-color: darkred; /* change this as needed */
        margin-right: 5px;
      }
    `

    // Append the <style> and <article> elements to the Shadow DOM
    this.shadowRoot.append(style, article)
  }

  /**
   * This function deletes the selected project from
   * the page and localstorage.
   * Clicking on the button shows a pop-up asking if
   * the user wants to delete the clicked project.
   * If yes, the project will be deleted.
   */
  deletePopUp () {
    if (confirm('Are you sure you want to delete this project?')) {
      console.log('Deleting project...')
      this.remove()
      const projectName = this.shadowRoot.querySelector('.project').querySelector('.project-name').textContent

      // Remove the project data from localStorage if projectId is valid
      if (projectName) {
        // Fetch existing projects from localStorage
        let projects = localStorage.getItem('user_projects')
        projects = projects ? JSON.parse(projects) : []
        // Filter out the project to be deleted
        projects = projects.filter(project => project.projectName !== projectName)
        // Update localStorage with the new projects array
        localStorage.setItem('user_projects', JSON.stringify(projects))
        projects = localStorage.getItem('user_projects')
      } else {
        console.error('Project invalid')
      }
    }
    // TODO: Delete this project from the .JSON file as well
    // (or maybe not if the .JSON file is always updating according to the localstorage)
  }

  /**
  * @param {Object} data - the data to pass into the <project-card> should be of the following format:
  {
  "project_id": 1, // Unique identifier for the project //number
  "projectName": "Project Name", //string
  "description": "A short description of the project.", //string
  "privacy": "Public" | "Private", // Visibility of the project //string
  "tags": ["Tag 1", "Tag 2", ...], // Array of project tags //array of strings
  "imageUrl": "URL of the project image" // Optional: URL for a project image //string
  },... //could use innerHTML like lab 7, but this seems to give less bugs, and easier to edit in future
  */
  set data (data) {
    if (!data || typeof data !== 'object') {
      console.error('Invalid project data provided to ProjectCard!')
      return
    }
    this.setAttribute('draggable', 'false')
    const article = this.shadowRoot.querySelector('article')
    article.setAttribute('draggable', 'false')
    article.classList.add('project', 'is-idle')
    const tagsHtml = data.tags.map(tag => `<p><span class="dot"></span>${tag}</p>`).join('')
    const maxWords = 30
    const words = data.description.split(' ')
    const truncatedDescription = words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : data.description
    article.innerHTML = `
    <div class="delete-btn-container" bis_skin_checked="1" draggable='false'>
      <button class="delete-btn" draggable='false'>
        <img src="source/assets/images/drag-button.png" alt="delete-btn" class="delete-btn-img" draggable="false">
      </button>
    </div>
    <a class="project-name" href="./source/reference/selected_project_page.html" draggable="false"><h3 class="project-name">${data.projectName}</h3></a>
    <p class="status" draggable="false">${data.privacy}</p>
    <p class="project-description" draggable="false">${truncatedDescription}</p>
    <div class="tags" draggable="false">${tagsHtml}</div>
    `

    const deleteButton = article.querySelector('.delete-btn')
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation()
      this.deletePopUp()
    })

    // Append or update the article (project) in shadow DOM
    if (!this.shadowRoot.contains(article)) {
      this.shadowRoot.appendChild(article)
    }

    // Optional: handle project impage if provided
    if (data.imageUrl) {
      const imageHtml = `<img src="${data.imageUrl}" alt="Project Image">`
      article.innerHTML += imageHtml
    }

    const projectNameLink = article.querySelector('.project-name')

    projectNameLink.addEventListener('click', loadProjectNameToLocalStorage)

    function loadProjectNameToLocalStorage (event) {
      const h3Element = event.target.closest('.project-name')
      // const h3Element = projectNameLink.querySelector('h3')
      const currDisplayedProject = h3Element.textContent.trim() // Get text content and remove any leading/trailing spaces
      localStorage.setItem('currDisplayedProject', currDisplayedProject)
    }
  }

  get data () {
    return this.data
  }
}

// Define the Class as a customElement so that you can create
//           'project-card' elements
customElements.define('project-card', ProjectCard)
