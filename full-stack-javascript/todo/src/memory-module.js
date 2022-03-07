//this module is responsible for any changes to memory
//this includes saving, deleting, editing, and loading project/task data
class memoryModule {
  constructor() {

  }
  getMemory(projectTitle) {
    const loadedObject = JSON.parse(localStorage.getItem(projectTitle));
    return loadedObject;
  }
  
  loadPage() {
  let projectArray = JSON.parse(localStorage.getItem('projectArray'));
  return projectArray;
  }

  deleteMemory(projectKey) {
    localStorage.removeItem(projectKey);
  }
  
  saveMemory(project) {
    localStorage.setItem(`${project.title}`, JSON.stringify(project));

    /*
    const testProject = document.querySelector('.project');
    console.log(testProject);
    console.log(typeof testProject);
    
    const mainArea = document.querySelector('main');
    console.log(mainArea);
    mainArea.appendChild(testProject);
    mainArea.appendChild(testProject);
    mainArea.appendChild(testProject);

    
    localStorage.setItem('testProject', JSON.stringify(testProject));

    let verifier = JSON.parse(localStorage.getItem('testProject'));
    console.log(typeof verifier);
    console.log(verifier);
    */
  }
}

export default new memoryChanger