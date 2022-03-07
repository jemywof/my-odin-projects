//this module handles any DOM manipulation
//this includes adding or removing tasks/projects from the page
//or displaying/clearing modals
class domChanger {
  constructor() {
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
      console.log(taskTitle);
      
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
    
    //addProject(): a final empty task, the 'taskAdder', enables task addition:
    const taskAdder = this.loadProjectElement('task', '+');
    taskAdder.classList.add('task-adder');
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
    utilityItems.appendChild(deleteProjectButton);
    
    //the editProjectButton will open a populated form which, upon submission,
    //will change the item's attributes in localStorage
    const editProjectButton = document.createElement('img');
    editProjectButton.setAttribute('src', './images/edit.svg');
    editProjectButton.classList.add('svg');
    utilityItems.appendChild(editProjectButton);

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

export default new domChanger