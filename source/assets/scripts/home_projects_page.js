function new_project() {
    // show the pop-up after clicking + button
    const form = document.querySelector('.new-project');
    form.style.display = (form.style.display === 'flex' ? 'none' : 'flex');
}

function add_project() {
    // hide the pop-up after clicking done button
    document.querySelector('.new-project').style.display = 'none';
}

// create project class or DOM for creating new project box
// read details from lab 7