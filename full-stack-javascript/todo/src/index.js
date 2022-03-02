import domChanger from './dom-changer.js';
import dateChanger from './date-changer.js';
import memoryLoader from './memory-loader.js';
import memoryChanger from './memory-changer.js';


class ProjectClass {
  constructor(title, desc, due, tasks) {
    this.title = title;
    this.desc = desc;
    this.due = due;
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




const loadedObject = memoryLoader.getTestMemory('This is a Test');
domChanger.addProject(loadedObject);




//below is just old code that I don't want to throw away yet.
//. . .
//. . .
//. . .
//don't shame me for hoarding.
//
//
//
/*
const testTitle = "testProject";
const testDesc = "ah shit here we go again";
const testDue = '04/20/2020';
const testTasks = [];
testTasks.push

testTasks.push(new ProjectClass('Clean GUTTER', 'ooh hello', '04/04/2024'));
testTasks.push(new ProjectClass('Hoog', 'ooh hello', '05/05/2424'));
testTasks.push(new ProjectClass('BOOG', 'ooh hello', '01/01/2001'));

const testProject = new ProjectClass(testTitle, testDesc, testDue, testTasks);
memoryChanger.saveMemory(testProject);
domChanger.addProject(testProject);
*/

/*
const testProject = memoryLoader.getTestMemory();

if (!testProject) {
  memoryChanger.saveTestMemory();
} else {
  domChanger.addProject(testProject);
}
console.log("End");
*/