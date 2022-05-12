// this module is responsible for any changes to memory
// this includes saving, deleting, editing, and loading project/task data
class MemoryModuleClass {
  constructor () {
    // all projects, and their information, is housed in this array:
    const maybeArray = localStorage.getItem('projectArray')
    if (maybeArray !== undefined) {
      this.projectArray = JSON.parse(maybeArray)
    } else {
      this.projectArray = []
    }
  }

  getMemory (projectKey) {
    const loadedObject = JSON.parse(localStorage.getItem(projectKey))
    return loadedObject
  }

  deleteProject (projectKey) {
    if (this.projectArray) {
      this.projectArray = this.projectArray.filter(project => project.title !== projectKey)
      localStorage.setItem('projectArray', JSON.stringify(this.projectArray))
    }
  }

  saveProject (project) {
    if (this.projectArray) {
      this.projectArray.push(project)
      localStorage.setItem('projectArray', JSON.stringify(this.projectArray))
    } else {
      const tempArray = [project]
      localStorage.setItem('projectArray', JSON.stringify(tempArray))
    }
  }

  editProject (projectKey, newProject) {
    if (!projectKey || !newProject || !this.projectArray) return
    // find position of item in projectArray
    const position = this.projectArray.findIndex(project => project.title === projectKey)
    // remove item from array
    this.projectArray.splice(position, 1)
    // add new item to array
    this.projectArray.splice(position, 0, newProject)
    // SAVE
    localStorage.setItem('projectArray', JSON.stringify(this.projectArray))
  }

  removeTask (task, project) {
    if (!task || !project) return
    project.tasks = project.tasks.filter(item => item.title !== task.title)
    this.editProject(project.title, project)
  }
}

const memoryModule = new MemoryModuleClass()
export { memoryModule }
