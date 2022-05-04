import {domModule, memoryModule} from './dom-module.js';
//import dateChanger from './date-changer.js';
//import memoryModule from './memory-module.js';


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

const addProjectButton = document.querySelector('.add-project');
addProjectButton.onclick = function() {
  domModule.createAddProjectForm();
}

/*
function() {
  domModule.toggleModal('addProjectModal');
}
*/

//Part 2 of addProjectModalListeners(): the form submission



/*function() {
  //TODO: itemize contents: title, desc, due
  const addProjectModal = document.getElementById('addProjectModal');
  const title = addProjectModal.querySelector('#title').value;
  const desc = addProjectModal.querySelector('#desc').value;
  const due = addProjectModal.querySelector('#due').value;
  const newProject = new ProjectClass (title, desc, due);
  memoryModule.saveMemory(newProject);
  domModule.toggleModal('addProjectModal');
  domModule.addProject(newProject);
}
*/


let projectArray = memoryModule.projectArray;
if (projectArray) {
  for (const project of projectArray) {
    domModule.addProject(project);
  }
}
/*
for (let i = 0; i < projectArray.length; i++) {
  domModule.addProject(projectArray[i]);
}
*/