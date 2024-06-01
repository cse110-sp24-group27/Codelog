/**
 * Centralized file to communicate to the local storage
 * home_projects_page, selected_project_page, and selected_journal_page will leverage this file
*/

// (1) home_projects_page functions //
/**
 * Add given project object to the "user_projects" array
 * @param project - project object to be added.
 * Project object has the following elements:
 * 
 *      "project_id": int starts with "current_max_project_id" + 1
 *      "projectName": "string"
 *      "description": "string"
 *      "privacy": "string"
 *      "tags": [
 *          {
 *              "tag_id": int that starts with ("current_max_tag_id" + 1),
 *              "tag_name": "HTML",
 *              "color": "red"
 *          }
 *      ] 
 *      "selected_project_entries": {
 *          // contains all the entries shown below (!!) //
 *      }
*/
function addProject(project_to_add) {
    // TODO: Add given project to the "user_projects" array in localStorage
    //Get the current "user_projects" array, or return an empty array if there is empty.
    var projectInArray = JSON.parse(localStorage.getItem('user_projects') || '[]')

    //Add the user additions to the "user_projects" array.
    projectInArray.push(project_to_add)

    //Update to laocalStorage
    localStorage.setItem('user_projects', JSON.stringify(projectInArray))

}

/**
 * Retrieve all user projects
 * @return the array "user_projects"
*/
function getAllUserProjects() {
    // TODO: return "user_projects" array object from localStorage

    //Get "user_projects" array object from localStorage
    const projects = JSON.parse(localStorage.getItem('user_projects') || '[]')

    //Retrun "user_projects" array object
    return projects;

}

// (2) selected_project_page functions //
/**
 * Add entry_to_add object to the "selected_project_entries" array of selected_project
 * @param selected_project - selected project to add the entry to
 * @param entry_to_add - entry object to be added
 * (!!) Entry object has the following elements:
 * 
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
 *          }
 *      ] 
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
 *          }
 *      ]
*/
function addEntry(selected_project, entry_to_add) {
    // TODO: Add given entry to the "selected_project_entries" array of corresponding project in localStorage
    selected_project = JSON.parse(localStorage.getItem('selected_project_entries') || '[]')

    selected_project.push(entry_to_add)

    //Update to laocalStorage
    // localStorage.setItem('user_projects', JSON.stringify(selected_project)); // Sang: we don't want to overwrite `user_projects` with a single selected project
}

/**
 * Retrieve all entries of the selected project given the project id
 * @param projects - object `user_projects`
 * @param project_id - int, id of the project
 * @return the "selected_project_entries" array of that selected project
*/
function getAllSelectedProjectEntries(projects, project_id) {
    // TODO: return "selected_project_entries" array of the given project from localStorage

    //Iterate through projects, find the project with matching project_id, then return that project's entries
    projects.forEach(project => {
        if (project.project_id == project_id) {
            return project.selected_project_entries
        }
    })

    //If no project with the correct project_id found from above loop, console.log
    console.log(`There's no project found with ${project_id}`)
}

// (3) selected_journal_page functions //
/**
 * @param selected_project - selected project to grab the entry from
 * @param entry_id - the id of the entry we want to display in selected_journal_page.js
 * @return entry given an id
*/
function getSelectedEntry(selected_project, entry_id) {
    // TODO: return the specific entry of the given project from localStorage
    let entries = selected_project.selected_project_entries
    entries.forEach(entry => {
        if (entry.entry_id == entry_id) {
            return entry
        }
    })
    console.log(`No entry with entry_id ${entry_id} found in selected_project`)
}