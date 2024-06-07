/**
 * Centralized file to communicate to the local storage
 * home_projects_page, selected_project_page, and selected_journal_page will leverage this file
*/

// Helper Functions //
/**
 * Get an unused Project Id
 */
function getUnusedProjectId () {
  // Get the current max entry id
  const retrievedCurrMaxProjectId = localStorage.getItem('current_max_project_id')

  // Make it an int
  const currMaxProjectId = parseInt(retrievedCurrMaxProjectId)

  // set the "current_max_entry_id" to "entry_to_add.entry_id"
  localStorage.setItem('current_max_project_id', (currMaxProjectId + 1))

  return (currMaxProjectId + 1)
}

// (1) home_projects_page functions //
/**
 * Add given project object to the "user_projects" array
 * @param projectToAdd - project object to be added.
 * @description Project object has the following elements:
 *      "project_id": int starts with "current_max_project_id" + 1
 *      "projectName": "string"
 *      "description": "string"
 *      "privacy": "string"
 *      "tags": [
 *          {
 *              "tag_id": int that starts with ("current_max_tag_id" + 1),
 *              "tag_name": "HTML",
 *              "color": "red"
 *          }]
 *      "selected_project_entries": {
 *          // contains all the entries shown below (!!) //
 *      }
*/
function addProjectToLocalStorage (projectToAdd) {
  // TODO: Add given project to the "user_projects" array in localStorage
  const unusedProjectId = getUnusedProjectId()

  // Set the entry id to current_max_entry_id + 1
  projectToAdd.project_id = unusedProjectId

  // Get the current "user_projects" array, or return an empty array if there is empty.
  const projectInArray = JSON.parse(localStorage.getItem('user_projects') || '[]')

  // Add the user additions to the "user_projects" array.
  projectInArray.push(projectToAdd)

  // Update to laocalStorage
  localStorage.setItem('user_projects', JSON.stringify(projectInArray))
}

/**
 * Retrieve all user projects
 * @return {Array<Object>} the array "user_projects"
*/
function getAllUserProjects () {
  // TODO: return "user_projects" array object from localStorage

  // Get "user_projects" array object from localStorage
  const projects = JSON.parse(localStorage.getItem('user_projects') || '[]')

  // Retrun "user_projects" array object
  return projects
}

// (2) selected_project_page functions //
/**
 * Add entry_to_add object to the "selected_project_entries" array of selected_project
 * @param selectedProject - selected project to add the entry to
 * @param entryToAdd - entry object to be added
 * @description Entry object has the following elements:
 *      "entry_id": int that starts with ("current_max_entry_id" + 1) -> don't forget to update current_max_entry_id
 *      "titleName": "string"
 *      "description": "string"
 *      "tags": [
 *          {
 *              "tag_id": 30001,
 *              "tag_name": "HTML",
 *              "color": "red"
 *          },
 *          {
 *              "tag_id": 30002,
 *              "tag_name": "HTML",
 *              "color": "red"
 *          }]
 *      "publicity": "string"
 *      "content": [
 *          {
 *              "type": "header"
 *              "content": "Render this text with white background and bigger black font"
 *          }
 *          {
 *              "type": "code"
 *              "content": "text content for a code block"
 *          },
 *          {
 *              "type": "text"
 *              "content": "text content"
 *          }]
*/
function addEntry (selectedProject, entryToAdd) {
  // TODO: Add given entry to the "selected_project_entries" array of corresponding project in localStorage
  // get the max entry id
  const retrievedCurrMaxEntryId = localStorage.getItem('current_max_entry_id')
  const currMaxEntryId = parseInt(retrievedCurrMaxEntryId)

  // set the entry id to current_max_entry_id + 1
  entryToAdd.entry_id = currMaxEntryId + 1

  // set the "current_max_entry_id" to "entry_to_add.entry_id"
  localStorage.setItem('current_max_entry_id', (currMaxEntryId + 1))

  // push the given entry to "selected_project_entries" array
  selectedProject.selected_project_entries.push(entryToAdd)

  // update to localStorage
  localStorage.setItem('selected_project', JSON.stringify(selectedProject))
}

/**
 * Retrieve all entries of the selected project given the project id
 * @param projects - object `user_projects`
 * @param projectId - int, id of the project
 * @return the "selected_project_entries" array of that selected project
*/
function getAllSelectedProjectEntries (projects, projectId) {
  // TODO: return "selected_project_entries" array of the given project from localStorage

  // Iterate through projects, find the project with matching project_id, then return that project's entries
  projects.forEach(project => {
    if (project.projectId === projectId) {
      return project.selected_project_entries
    }
  })

  // If no project with the correct project_id found from above loop, console.log
  console.log(`There's no project found with ${projectId}`)
}

// (3) selected_journal_page functions //
/**
 * @param selectedProject - selected project to grab the entry from
 * @param entryId - the id of the entry we want to display in selected_journal_page.js
 * @return entry given an id
*/
function getSelectedEntry (selectedProject, entryId) {
  // TODO: return the specific entry of the given project from localStorage
  const entries = selectedProject.selected_project_entries
  entries.forEach(entry => {
    if (entry.entryId === entryId) {
      return entry
    }
  })
  console.log(`No entry with entry_id ${entryId} found in selected_project`)
}

// export functions to module for testing
module.exports = { getUnusedProjectId, addProjectToLocalStorage, getAllUserProjects, addEntry, getAllSelectedProjectEntries, getSelectedEntry }
