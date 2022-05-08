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

  deleteProject(projectKey) {
    if (this.projectArray) {
      this.projectArray = this.projectArray.filter(project => project.title != projectKey);
      localStorage.setItem('projectArray', JSON.stringify(this.projectArray));
    }
  }
  
  saveProject(project) {
    if (this.projectArray) {
      this.projectArray.push(project);
      localStorage.setItem('projectArray', JSON.stringify(this.projectArray));
    }
    else {
      let tempArray = [project];
      localStorage.setItem('projectArray', JSON.stringify(tempArray));
    }
  }

  editProject(projectKey, newProject) {
    if (!projectKey || !newProject || !this.projectArray) return;
    //find position of item in projectArray
    const position = this.projectArray.findIndex(project => project.title == projectKey);
    //remove item from array
    const removed = this.projectArray.splice(position, 1);
    //add new item to array
    this.projectArray.splice(position, 0, newProject);
    //SAVE
    localStorage.setItem('projectArray', JSON.stringify(this.projectArray));
  }

  removeTask(task, project) {
    
  }

}
const memoryModule = new memoryModuleClass;
export {memoryModule};