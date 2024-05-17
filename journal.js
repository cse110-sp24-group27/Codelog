// When clicked the arrow button, go back to last page
function goBack () {
  window.history.back()
}

// Wait for the DOM content to be loaded before attaching the event listener to the back button
document.addEventListener('DOMContentLoaded', function () {
  // Attach an event listener to the go back button to execute the function go_back
  document.getElementById('back-btn').addEventListener('click', goBack)
})
