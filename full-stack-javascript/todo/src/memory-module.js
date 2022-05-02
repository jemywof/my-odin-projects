//this module is responsible for any changes to memory
//this includes saving, deleting, editing, and loading project/task data
class memoryModuleClass {
  constructor() {
    //all projects, and their information, is housed in this array:
    let maybeArray = localStorage.getItem('projectArray');
    if (maybeArray !== undefined) {
      this.projectArray = JSON.parse(maybeArray);
    } else {
      this.projectArray = [];
    }
  }
  getMemory(projectKey) {
    const loadedObject = JSON.parse(localStorage.getItem(projectKey));
    return loadedObject;
  }

  deleteMemory(projectKey) {
    if (this.projectArray) {
      const newProjectArray = this.projectArray.filter(project => project.title != projectKey);
      localStorage.setItem('projectArray', JSON.stringify(newProjectArray));
    }
  }
  
  saveMemory(project) {
    if (this.projectArray) {
      this.projectArray.push(project);
      localStorage.setItem('projectArray', JSON.stringify(this.projectArray));
    }
    else {
      let tempArray = [project];
      localStorage.setItem('projectArray', JSON.stringify(tempArray));
    }
  }
}
const memoryModule = new memoryModuleClass;
export {memoryModule};