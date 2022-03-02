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
    div.textContent = content;
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

    let projectDesc = this.loadProjectElement('project-desc', loadedObject.description);
    projectDiv.appendChild(projectDesc);

    let projectDue = this.loadProjectElement('project-due', 'Due: 04/20/2020');
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
      //TODO: add 'more' button and event listeners
      //

      taskGrid.appendChild(div);
    }
    projectDiv.appendChild(taskGrid);


    //
    //TODO: add event listeners
    //TODO: add SVGs
    //


    mainArea.appendChild(projectDiv);
  }
}

export default new domChanger