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

    // fetch style from source/styles/styles.css. copy everything inide the <style> tag
    // fetch('source/assets/styles/styles.css')
    //   .then(response => response.text())
    //   .then(cssText => {
    //     style.textContent = cssText
    //     console.log(cssText);
    //   })
    //   .catch(error => {
    //     console.error('Failed to fetch project card styles:', error)
    //   })

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
      .drag-btn-container {
        /* Use absolute position to place the button container correctly */
        position: absolute;
        top: 10px;
        right: 10px;
        width: 2vw;
        height: auto;
      }

      /* Style the drag buttons within each journal entry */
      .drag-btn {
        cursor: grab;
        background-color: inherit;
        appearance: none;
        border: none;
      }

      /* Style the drag button image */
      .drag-btn-img {
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
  * @param {Object} data - the data to pass into the <project-card> should be of the following format:
  {
  "projectId": 1, // Unique identifier for the project //number
  "projectName": "Project Name", //string
  "projectDescription": "A short description of the project.", //string
  "status": "Public" | "Private", // Visibility of the project //string
  "tags": ["Tag 1", "Tag 2", ...], // Array of project tags //array of strings
  "imageUrl": "URL of the project image" // Optional: URL for a project image //string
  },... //could use innerHTML like lab 7, but this seems to give less bugs, and easier to edit in future
  */
  set data (data) {
    if (!data || typeof data !== 'object') {
      console.error('Invalid project data provided to ProjectCard!')
      return
    }

    const article = this.shadowRoot.querySelector('article')
    const tagsHtml = data.tags.map(tag => `<p><span class="dot"></span>${tag.tag_name}</p>`).join('')
    const maxWords = 30
    const words = data.description.split(' ')
    const truncatedDescription = words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : data.description

    article.innerHTML = `
    <div class="drag-btn-container" bis_skin_checked="1">
      <button class="drag-btn" onclick="dragProject()">
        <img src="source/assets/images/drag-button.png" alt="drag-btn" class="drag-btn-img">
      </button>
    </div>

    <h3 class="project-name">${data.projectName}</h3>

    <p class="status">${data.privacy}</p>

    <p class="project-description">${truncatedDescription}</p>
    
    <div class="tags">${tagsHtml}</div>
    `

    // Optional: handle project impage if provided
    if (data.imageUrl) {
      const imageHtml = `<img src="${data.imageUrl}" alt="Project Image">`
      article.innerHTML += imageHtml
    }
    // //   Select the <article> we added to the Shadow DOM in the constructor
    // const article = this.shadowRoot.querySelector('article')
    // const projectName = document.createElement('h3')
    // projectName.id = 'project-name' // Set the ID as suggested in the template
    // projectName.textContent = data.projectName
    // article.appendChild(projectName)

    // // status
    // const projectStatus = document.createElement('p')
    // projectStatus.id = 'status'
    // projectStatus.textContent = data.status
    // article.appendChild(projectStatus)

    // // Project Description (truncate if too long)
    // const projectDescription = document.createElement('p')
    // projectDescription.id = 'project-description'
    // projectDescription.textContent = data.projectDescription.substring(0, 100) // Truncate to 100 characters
    // article.appendChild(projectDescription)

    // // Project Tags (Conditional)
    // if (data.tags && data.tags.length > 0) {
    //   const tagsContainer = document.createElement('div')
    //   tagsContainer.classList.add('tags')
    //   data.tags.forEach(tag => {
    //     const tagElement = document.createElement('p')
    //     tagElement.textContent = tag
    //     tagsContainer.appendChild(tagElement)
    //   })
    //   article.appendChild(tagsContainer)
    // }

    // // Optional: Project Image
    // if (data.imageUrl) {
    //   const projectImage = document.createElement('img')
    //   projectImage.src = data.imageUrl
    //   article.appendChild(projectImage)
    // }
  }

  get data () {
    return this.data
  }
}

// Define the Class as a customElement so that you can create
//           'project-card' elements
customElements.define('project-card', ProjectCard)
