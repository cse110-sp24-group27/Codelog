// +_button.js

// Function to show pop-up forms
function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

// Function to close pop-up forms
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}


// For new entry+
function addEntry() {
    var container = document.getElementById('entry-container');
    var newEntry = document.createElement('div');
    newEntry.className = 'entry';
    newEntry.innerHTML = `
        <input type="text" placeholder="Enter Entry content." oninput="toggleRemoveButton(this)">
        <button type="button" class="remove-entry-btn" onclick="askRemoveConfirmation(this)" style="display: none;">Remove</button>
    `;
    container.appendChild(newEntry);
}


function askRemoveConfirmation(button) {
    var inputField = button.previousElementSibling;
    if (inputField.value.trim() !== "" && !confirm("Are you sure you want to remove this entry with content?")) {
        return; // If user cancels the confirmation, do nothing
    }
    removeEntry(button);
}

function removeEntry(button) {
    var entryToRemove = button.parentNode;
    entryToRemove.parentNode.removeChild(entryToRemove);
}


function toggleRemoveButton(input) {
    const removeButton = input.nextElementSibling;
    if (input.value.trim() !== "") {
        removeButton.style.display = 'inline-block';  // Ensure consistent display style with the button visible.
    } else {
        removeButton.style.display = 'none';
    }
}


function add_project() {
    // place holder to save
}

