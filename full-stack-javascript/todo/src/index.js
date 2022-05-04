import {domModule, memoryModule} from './dom-module.js';
//import dateChanger from './date-changer.js';
//import memoryModule from './memory-module.js';


const addProjectButton = document.querySelector('.add-project');
addProjectButton.onclick = function() {
  domModule.createNewForm('project');
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