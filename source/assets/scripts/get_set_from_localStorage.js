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
 *      "id": int starts with "current_max_project_id" + 1
 *      "projectName": "string"
 *      "description": "string"
 *      "privacy": "string"
 *      "tags": {
 *          "tag1": "colorString"
 *          "tag2": "colorString"
 *          "tag3": "colorString"
 *      }
 *      "selected_project_entries": {
 *          // contains all the entries shown below (!!) //
 *      }
*/
function addProject(project_to_add) {
    // TODO: Add given project to the "user_projects" array in localStorage
}

/**
 * Retrieve all user projects
 * @return the array "user_projects"
*/
function getAllUserProjects() {
    // TODO: return "user_projects" array object from localStorage
}

// (2) selected_project_page functions //
/**
 * Add entry_to_add object to the "selected_project_entries" array of selected_project
 * @param selected_project - selected project to add the entry to
 * @param entry_to_add - entry object to be added
 * (!!) Entry object has the following elements:
 * 
 *      "id": int that starts with ("current_max_entry_id" + 1) -> don't forget to update current_max_entry_id
 *      "titleName": "string"
 *      "tags": {
 *          "tag1": "colorString"
 *          "tag2": "colorString"
 *          "tag3": "colorString"
 *      }
 *      "publicity": "string"
 *      "content": "string"
*/
function addEntry(selected_project, entry_to_add) {
    // TODO: Add given entry to the "selected_project_entries" array of corresponding project in localStorage
}

/**
 * Retrieve all entries of the selected project given the project id
 * @return the "selected_project_entries" array of that selected project
*/
function getAllSelectedProjectEntries(project_id) {
    // TODO: return "selected_project_entries" array of the given project from localStorage
}

// (3) selected_journal_page functions //
/**
 * @param selected_project - selected project to grab the entry from
 * @param entry_id - the id of the entry we want to display in selected_journal_page.js
 * @return entry given an id
*/
function getSelectedEntry(selected_project, entry_id) {
    // TODO: return the specific entry of the given project from localStorage
}