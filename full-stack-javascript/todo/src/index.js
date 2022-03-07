import domModule from './dom-module.js';
import dateChanger from './date-changer.js';
import memoryModule from './memory-module.js';


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

let projectArray = memoryModule.loadPage();

/*
I'm not sure why, but this iterator isn't working for the object array:
        for (const project in projectArray) {
so I'm using a more primitive iterator instead:
*/
for (let i = 0; i < projectArray.length; i++) {
  domChanger.addProject(projectArray[i]);
}



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
memoryModule.saveMemory(testProject);
domChanger.addProject(testProject);
*/

/*
const testProject = memoryModule.getTestMemory();

if (!testProject) {
  memoryModule.saveTestMemory();
} else {
  domChanger.addProject(testProject);
}
console.log("End");
*/