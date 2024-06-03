// When clicked the arrow button, go back to last page
function goBack () {
  window.history.back()
}

// UNCOMMENT WHEN LOCAL STORAGE GETS IMPLEMENTED
// Fetch Journal Data from localStorage (onLoad) & Display it in The Selected Journal Page //
/*
//Fetch journal title
function getTitleToDisplay () {
  // Fetch title from localStorage
  var textTitle = localStorage.getItem("journal-title");
  // Assign it to the selected journal page for display
  document.getElementById("journal-title").innerHTML = "put the title here using textTitle"
}

// Fetch tags
function getTagsToDisplay () {
  // Fetch tags from localStorage
  var tags = localStorage.getItem("tags");
  // Assign it to the selected journal page for display
  document.getElementById("tags").innerHTML = tags
}

// Fetch journal template
function getTitleToDisplay () {
  // Fetch template from localStorage
  var textTemplate = localStorage.getItem("template");
  // Assign it to the selected journal page for display
  document.getElementById("template").innerHTML = textTemplate
}

// Fetch entry content
function getEntryTextToDisplay () {
  // Fetch entry text from localStorage
  var entryText = localStorage.getItem("markdown");
  // Assign it to the selected journal page for display
  document.getElementById("text").innerHTML = entryText
}
*/
// Wait for the DOM content to be loaded before attaching the event listener to the back button
document.addEventListener('DOMContentLoaded', function () {
  // Attach an event listener to the go back button to execute the function go_back
  document.getElementById('back-btn').addEventListener('click', goBack)
})
