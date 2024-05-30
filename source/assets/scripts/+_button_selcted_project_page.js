// Function to show pop-up forms
function openPopup (id) {
  document.getElementById(id).style.display = 'block'
}

// Function to close pop-up forms
function closePopup (id) {
  document.getElementById(id).style.display = 'none'
}

window.openPopup = openPopup
window.closePopup = closePopup
