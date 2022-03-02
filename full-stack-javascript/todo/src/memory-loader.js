//this module loads and prepares the page's local data
//this includes task/project data
class memoryLoader {
  constructor() {
  }
  getTestMemory(testProject) {
    const loadedObject = JSON.parse(localStorage.getItem(testProject));
    console.log("GETTING MEMORY:");
    console.log(typeof loadedObject);
    console.log(loadedObject);
    console.log("DONE");
    return loadedObject;
  }
}

export default new memoryLoader