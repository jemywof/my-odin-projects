import {domModule, memoryModule} from './dom-module.js';

const addProjectButton = document.querySelector('.add-project');
addProjectButton.onclick = function() {
  domModule.createNewForm('project');
}

let projectArray = memoryModule.projectArray;
if (projectArray) {
  for (const project of projectArray) {
    domModule.addProject(project);
  }
}