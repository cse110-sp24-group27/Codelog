// Function to show pop-up forms
function openPopup (id) {
  document.getElementById(id).style.display = 'block'
}

// Function to close pop-up forms
function closePopup (id) {
  document.getElementById(id).style.display = 'none'
}

// Function to add a new input field and delete button
function addInput(columnNumber) {
  // Get the container where the new input group will be added
  const container = document.getElementById('inputContainer')
  // Create a new div element to act as the input group
  const inputGroup = document.createElement('div')
  inputGroup.classList.add('input-group')
  // Create a new input element
  const newInput = document.createElement('input')
  newInput.type = 'text'
  newInput.placeholder = `Input for ${columnNumber}`
  newInput.classList.add(`input-${columnNumber}`)
  // Create a new button element for deletion
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-btn')
  deleteButton.innerText = 'Delete'
  // Add an onclick event to the delete button to remove the input group
  deleteButton.onclick = function() {
    deleteInput(deleteButton)
  }
  // Add an onclick event to the delete button to remove the input group
  inputGroup.appendChild(newInput)
  inputGroup.appendChild(deleteButton)
  container.appendChild(inputGroup)
}
// Function to delete an input group
function deleteInput(button) {
  const inputGroup = button.parentElement
  inputGroup.remove()
}

window.openPopup = openPopup
window.closePopup = closePopup
window.addInput = addInput
window.deleteInput = deleteInput
