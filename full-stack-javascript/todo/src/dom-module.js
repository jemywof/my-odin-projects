import {memoryModule} from './memory-module.js';

//this module handles any DOM manipulation
//this includes adding or removing tasks/projects from the page
//or displaying/clearing modals
class ProjectClass {
  title = 'Unnamed Project';
  desc = 'No description.';
  due = new Date();
  constructor(title, desc, due = new Date(), tasks) {
    title = title.trim();
    this.title = (title.length) ? title : 'Unnamed Project';
    desc = desc.trim();
    this.desc = (desc.length) ? desc : 'No description.';
    this.due = (due) ? due : '12/12/2022';
    this.tasks = tasks;
  }
}
class TaskClass {
  constructor(title, description, due) {
    this.title = title;
    this.desc = desc;
    this.due = due;
  }
}
class domModuleClass {
  constructor() {
  }

  //toggleModal = toggles display of a modal of the selected ID
  toggleModal(modalID) {
    const modal = document.getElementById(modalID);
    if (modal.style.display == 'none') {
      modal.style.display = 'block';
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      }
    }
    else {
      modal.style.display = 'none';
    }

  }
  //creates the modal form for adding a project
  createAddProjectForm() {

    const modalDiv = document.createElement('div');
    modalDiv.id = 'addProjectModal';
    modalDiv.classList.add('modal');

    const formDiv = document.createElement('div');
    formDiv.classList.add('create-fields');
    modalDiv.appendChild(formDiv);

    const titleP = document.createElement('p');
    titleP.textContent = 'Add Project:';
    formDiv.appendChild(titleP);

    const mainForm = document.createElement('form');
    formDiv.appendChild(mainForm);

    //this function, appendLabelInputPair,
    //appends two items to the mainForm HTML item:
    //the 'label' and 'input' of a particular field
    const appendLabelInputPair = function(name, inputType) {
      const label = document.createElement('label');
      label.setAttribute('for', name);
      const displayText = name[0].toUpperCase() + name.substring(1);
      label.textContent = `${displayText}:`;

      const input = document.createElement('input');
      input.setAttribute('type', inputType);
      input.setAttribute('name', name);
      input.id = name;

      mainForm.appendChild(label);
      mainForm.appendChild(input);
    }

    appendLabelInputPair('title', 'text');
    
    //Rather than convolute appendLabelInputPair() with too many args,
    //here's some code dedicated to the label/input for
    //the Description field
    const descLabel = document.createElement('label');
    descLabel.setAttribute('for', 'desc');
    descLabel.textContent = 'Description:'
    const descInput = document.createElement('textarea');
    descInput.setAttribute('name', 'desc');
    descInput.id = 'desc';
    mainForm.appendChild(descLabel);
    mainForm.appendChild(descInput);


    appendLabelInputPair('due', 'date');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('value', 'Submit');
    submitButton.id = 'addProjectSubmitButton';
    submitButton.textContent = 'Add';
    submitButton.onclick =  function() {
      const addProjectModal = document.getElementById('addProjectModal');
      const title = addProjectModal.querySelector('#title').value;
      const desc = addProjectModal.querySelector('#desc').value;
      const due = addProjectModal.querySelector('#due').value;
      const newProject = new ProjectClass (title, desc, due);
      memoryModule.saveMemory(newProject);
      //this.addProject(newProject);
      modalDiv.remove();
    }
    mainForm.appendChild(submitButton);

    document.body.appendChild(modalDiv);

  }

  //loadProjectElement helps addProject()
  //by creating a div, of a given class name,
  //and adding a given text content
  loadProjectElement(className, content) {
    const div = document.createElement('div');
    div.classList.add(className);
    if (content) div.textContent = content;
    return div;
  }

  //addProject loads a provided project-object into the DOM
  //as a new child to the main project-grid
  //and adds respective event listeners
  addProject(loadedObject) {
    const mainArea = document.querySelector('main');
    
    //addProject(): this section adds the main project's data elements:
    //title, description, and due-date
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    let projectTitle = this.loadProjectElement('project-title', loadedObject.title);
    projectDiv.appendChild(projectTitle);

    let projectDesc = this.loadProjectElement('project-desc', loadedObject.desc);
    projectDiv.appendChild(projectDesc);

    let projectDue = this.loadProjectElement('project-due', `Due: ${loadedObject.due}`);
    projectDiv.appendChild(projectDue);


    //addProject(): this section adds the task grid to the project
    let taskGrid = document.createElement('div');
    taskGrid.classList.add('task-grid');

    let taskArray = loadedObject.tasks;
    if (taskArray) {
      for (const task of taskArray) {
        //addProject(): this section adds a task's main data elements
        //to the task grid:
        //checkbox, title, due-date, and 'more' button
        let div = document.createElement('div');
        div.classList.add('task');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        div.appendChild(checkbox);

        let taskTitle = document.createElement('p');
        taskTitle.textContent = task.title;
        div.appendChild(taskTitle);
        
        let taskDesc = document.createElement('p');
        taskDesc.textContent= task.desc;

        let taskDue = document.createElement('p');
        taskDue.textContent = task.due;
        div.appendChild(taskDue);

        //
        //TODO: add 'more info' button, add event listeners
        //

        taskGrid.appendChild(div);
      }
    }
    //addProject(): a final empty task, the 'taskAdder', enables task addition:
    const taskAdder = this.loadProjectElement('task', '+');
    taskAdder.classList.add('task-adder');
    //TODO: add eventListener for each taskAdder, to open a 'new task' modal
    taskGrid.appendChild(taskAdder);

    projectDiv.appendChild(taskGrid);


    //addProject(): the utilityItems for each project:
    //holds the editProject and deleteProject buttons!   
    const utilityItems = document.createElement('div');
    utilityItems.classList.add('utility-items');

    //the deleteProjectButton will (later) open an 'are you sure?' modal
    //and then delete from localStorage
    const deleteProjectButton = document.createElement('img');
    deleteProjectButton.setAttribute('src', './images/trash.svg');
    deleteProjectButton.classList.add('svg');
    deleteProjectButton.onclick = () => {
      projectDiv.remove();
      memoryModule.deleteMemory(loadedObject.title);
    }
    utilityItems.appendChild(deleteProjectButton);
    //TODO: add 'Delete' eventListener
    
    //the editProjectButton will open a populated form which, upon submission,
    //will change the item's attributes in localStorage
    const editProjectButton = document.createElement('img');
    editProjectButton.setAttribute('src', './images/edit.svg');
    editProjectButton.classList.add('svg');
    utilityItems.appendChild(editProjectButton);
    //TODO: add 'edit' eventListener

    projectDiv.appendChild(utilityItems);

    
    //EVENT LISTENERS!
    //These describe the functions for the following elements:
    //taskAdder, deleteProjectButton, and editProjectButton

    //taskAdder function:
    //
    //TODO
    //

    //deleteProjectButton function:
    //
    //TODO
    //

    //editProjectButton function:
    //
    //TODO
    //



    //TODO: add 'more info' task button


    mainArea.appendChild(projectDiv);
  }

}
const domModule = new domModuleClass;

export {domModule};
export {memoryModule};