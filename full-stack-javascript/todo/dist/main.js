/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-module.js":
/*!***************************!*\
  !*** ./src/dom-module.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domModule": () => (/* binding */ domModule),
/* harmony export */   "memoryModule": () => (/* reexport safe */ _memory_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule)
/* harmony export */ });
/* harmony import */ var _memory_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memory-module.js */ "./src/memory-module.js");


// this module handles any DOM manipulation
// this includes adding or removing tasks/projects from the page
// or displaying/clearing modals
class ProjectClass {
  constructor (title, desc, due = new Date(), tasks) {
    title = title.trim()
    this.title = (title.length) ? title : 'Unnamed Project'

    desc = desc.trim()
    this.desc = (desc.length) ? desc : 'No description.'

    this.due = (due) ? due : '2000-01-01'

    this.tasks = tasks
  }
}
class TaskClass {
  constructor (title, due) {
    title = title.trim()
    this.title = (title.length) ? title : 'Unnamed Project'
    this.due = (due) ? due : '2000-01-01'
  }
}
class DomModuleClass {
  // creates the modal form for adding a project
  createNewForm (type, parentProjectHTML) {
    if (type !== 'newProject' && type !== 'task' && type !== 'editProject') {
      console.error('ERROR IN ADDING FORM MODAL; UNSPECIFIED FORM TYPE')
      return
    }
    if (type === 'task' || type === 'editProject') {
      if (!parentProjectHTML) {
        console.error('ERROR: parentProjectHTML not provided for new form')
        return
      }
    }
    const modalDiv = document.createElement('div')
    modalDiv.id = 'addProjectModal'
    modalDiv.classList.add('modal')

    const formDiv = document.createElement('div')
    formDiv.classList.add('create-fields')
    modalDiv.appendChild(formDiv)

    const titleP = document.createElement('p')
    if (type === 'newProject') {
      titleP.textContent = 'Add Project:'
    } else if (type === 'editProject') {
      titleP.textContent = 'Edit Project'
    } else {
      titleP.textContent = 'Add Task'
    }
    formDiv.appendChild(titleP)

    const mainForm = document.createElement('form')
    formDiv.appendChild(mainForm)

    // this function, appendLabelInputPair,
    // appends two items to the mainForm HTML item:
    // the 'label' and 'input' of a particular field
    const appendLabelInputPair = function (name, inputType) {
      const label = document.createElement('label')
      label.setAttribute('for', name)
      const displayText = name[0].toUpperCase() + name.substring(1)
      label.textContent = `${displayText}:`

      const input = document.createElement('input')
      input.setAttribute('type', inputType)
      input.setAttribute('name', name)
      input.id = name

      mainForm.appendChild(label)
      mainForm.appendChild(input)
    }

    appendLabelInputPair('title', 'text')

    if (type === 'newProject' || type === 'editProject') {
      // Rather than convolute appendLabelInputPair() with too many args,
      // here's some code dedicated to the label/input for
      // the Description field
      const descLabel = document.createElement('label')
      descLabel.setAttribute('for', 'desc')
      descLabel.textContent = 'Description:'
      const descInput = document.createElement('textarea')
      descInput.setAttribute('name', 'desc')
      descInput.id = 'desc'
      mainForm.appendChild(descLabel)
      mainForm.appendChild(descInput)
    }

    appendLabelInputPair('due', 'date')

    if (type === 'editProject') {
      const projectKey = parentProjectHTML.querySelector('.project-title').textContent
      // Find the parent Project in projectArray
      const parentProjectMemory = _memory_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule.projectArray.find(project => project.title === projectKey)
      // Fill out the form values from parentProjectMemory
      const titleInput = mainForm.querySelector('#title')
      const descInput = mainForm.querySelector('#desc')
      const dueInput = mainForm.querySelector('#due')
      titleInput.value = parentProjectMemory.title
      descInput.textContent = parentProjectMemory.desc
      dueInput.textContent = parentProjectMemory.due
    }

    const submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'button')
    submitButton.setAttribute('value', 'Submit')
    submitButton.id = 'addProjectSubmitButton'
    submitButton.textContent = 'Submit'
    submitButton.onclick = function () {
      // the submit button gathers the relevant field values,
      // generates the appropriate project/task object,
      // and asks to update the DOM appropriately.
      const title = modalDiv.querySelector('#title').value
      const due = modalDiv.querySelector('#due').value

      if (type === 'newProject') {
        const desc = modalDiv.querySelector('#desc').value
        const submittedObject = new ProjectClass(title, desc, due)
        _memory_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule.saveProject(submittedObject)
        domModule.addProject(submittedObject)
      } else if (type === 'editProject') {
        // save all values into memory through editProject();
        const titleHTML = parentProjectHTML.querySelector('.project-title')

        const projectKey = parentProjectHTML.querySelector('.project-title').textContent
        const desc = modalDiv.querySelector('#desc').value
        const submittedObject = new ProjectClass(title, desc, due)
        _memory_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule.editProject(projectKey, submittedObject)

        // Now replace the item's values in the DOM:
        titleHTML.textContent = submittedObject.title

        const descHTML = parentProjectHTML.querySelector('.project-desc')
        descHTML.textContent = submittedObject.desc

        const dueHTML = parentProjectHTML.querySelector('.project-due')
        dueHTML.textContent = submittedObject.due
      } else if (type === 'task') {
        const projectKey = parentProjectHTML.querySelector('.project-title').textContent
        // This is very bad design, so I'm listing its actions bit-by-bit
        // Create a new task object
        const task = new TaskClass(title, due)
        // Find the parent Project in projectArray
        const parentProjectMemory = _memory_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule.projectArray.find(project => project.title === projectKey)
        // push task to Project's task array
        if (parentProjectMemory.tasks) {
          parentProjectMemory.tasks.unshift(task)
        } else {
          parentProjectMemory.tasks = [task]
        }
        // push new object to memoryModule.editMemory();
        _memory_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule.editProject(projectKey, parentProjectMemory)

        const taskGrid = parentProjectHTML.querySelector('.task-grid')

        // load the HTML by just adding to the parentProjectHTML's task grid
        // this is still bad design; mostly copy-pasted from below

        const div = document.createElement('div')
        div.classList.add('task')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        div.appendChild(checkbox)
        checkbox.onclick = function () {
          _memory_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule.removeTask(task, parentProjectMemory)
          const taskHTML = this.parentNode
          taskHTML.remove()
          // TODO: add fade-out animation
        }

        const taskTitle = document.createElement('p')
        taskTitle.textContent = task.title
        div.appendChild(taskTitle)

        const taskDue = document.createElement('p')
        taskDue.textContent = task.due
        div.appendChild(taskDue)

        taskGrid.insertBefore(div, taskGrid.firstChild)
      }
      // this.addProject(newProject)
      modalDiv.remove()
    }
    window.onclick = function (event) {
      if (event.target === modalDiv) {
        modalDiv.remove()
      }
    }
    mainForm.appendChild(submitButton)

    document.body.appendChild(modalDiv)
  }

  // loadProjectElement helps addProject()
  // by creating a div, of a given class name,
  // and adding a given text content
  loadProjectElement (className, content) {
    const div = document.createElement('div')
    div.classList.add(className)
    if (content) div.textContent = content
    return div
  }

  // addProject loads a provided project-object into the DOM
  // as a new child to the main project-grid
  // and adds respective event listeners
  addProject (loadedObject) {
    const mainArea = document.querySelector('main')

    // addProject(): this section adds the main project's data elements:
    // title, description, and due-date
    const projectDiv = document.createElement('div')
    projectDiv.classList.add('project')

    const projectTitle = this.loadProjectElement('project-title', loadedObject.title)
    projectDiv.appendChild(projectTitle)

    const projectDesc = this.loadProjectElement('project-desc', loadedObject.desc)
    projectDiv.appendChild(projectDesc)

    const projectDue = this.loadProjectElement('project-due', `Due: ${loadedObject.due}`)
    projectDiv.appendChild(projectDue)

    // addProject(): this section adds the task grid to the project
    const taskGrid = document.createElement('div')
    taskGrid.classList.add('task-grid')

    const taskArray = loadedObject.tasks
    if (taskArray) {
      for (const task of taskArray) {
        // addProject(): this section adds a task's main data elements
        // to the task grid:
        // checkbox, title, due-date
        const div = document.createElement('div')
        div.classList.add('task')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        div.appendChild(checkbox)
        checkbox.onclick = function () {
          const taskName = task.title
          const projectKey = loadedObject.title
          _memory_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule.removeTask(task, loadedObject)
          // TODO: add fade-out animation
          this.parentNode.remove()
        }

        const taskTitle = document.createElement('p')
        taskTitle.textContent = task.title
        taskTitle.classList.add('task-title')
        div.appendChild(taskTitle)

        const taskDue = document.createElement('p')
        taskDue.textContent = task.due
        div.appendChild(taskDue)

        taskGrid.appendChild(div)
      }
    }
    // addProject(): a final empty task, the 'taskAdder', enables task addition:
    const taskAdder = this.loadProjectElement('task', '+')
    taskAdder.classList.add('task-adder')
    taskAdder.onclick = function () {
      // make new form
      const parentProjectHTML = this.parentNode.parentNode
      domModule.createNewForm('task', parentProjectHTML)
      // push to loadedObject.tasks array
      // save new object to memory
    }
    taskGrid.appendChild(taskAdder)

    projectDiv.appendChild(taskGrid)

    // addProject(): the utilityItems for each project:
    // holds the editProject and deleteProject buttons!
    const utilityItems = document.createElement('div')
    utilityItems.classList.add('utility-items')

    // the deleteProjectButton will open an 'are you sure?' modal
    // and then delete from localStorage
    const deleteProjectButton = document.createElement('img')
    deleteProjectButton.setAttribute('src', './images/trash.svg')
    deleteProjectButton.classList.add('svg')
    deleteProjectButton.onclick = () => {
      const modalDiv = document.createElement('div')
      modalDiv.id = 'addProjectModal'
      modalDiv.classList.add('modal')

      const formDiv = document.createElement('div')
      formDiv.classList.add('confirm-field')
      modalDiv.appendChild(formDiv)

      window.onclick = function (event) {
        if (event.target === modalDiv) {
          modalDiv.remove()
        }
      }

      const confirmText = document.createElement('h2')
      confirmText.textContent = `Are you sure you want to delete "${loadedObject.title}?"`
      formDiv.appendChild(confirmText)

      const confirmButton = document.createElement('button')
      // confirmButton.setAttribute('type', 'button')
      // confirmButton.setAttribute('value', 'Submit')
      confirmButton.classList.add = 'confirm-button'
      confirmButton.textContent = 'Yes!'
      confirmButton.onclick = function () {
        projectDiv.remove()
        modalDiv.remove()
        _memory_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule.deleteProject(loadedObject.title)
      }
      formDiv.appendChild(confirmButton)

      const rejectButton = document.createElement('button')
      // rejectButton.setAttribute('type', 'button')
      // rejectButton.setAttribute('value', 'Submit')
      rejectButton.classList.add = 'confirm-button'
      rejectButton.textContent = 'No!'
      rejectButton.onclick = function () {
        modalDiv.remove()
      }
      formDiv.appendChild(rejectButton)

      document.body.appendChild(modalDiv)
    }

    utilityItems.appendChild(deleteProjectButton)

    // the editProjectButton will open a populated form which, upon submission,
    // will change the item's attributes in localStorage
    const editProjectButton = document.createElement('img')
    editProjectButton.setAttribute('src', './images/edit.svg')
    editProjectButton.classList.add('svg')
    editProjectButton.onclick = function () {
      domModule.createNewForm('editProject', projectDiv)
    }
    utilityItems.appendChild(editProjectButton)

    projectDiv.appendChild(utilityItems)

    // EVENT LISTENERS!
    // These describe the functions for the following elements:
    // taskAdder, deleteProjectButton, and editProjectButton

    mainArea.appendChild(projectDiv)
  }
}
const domModule = new DomModuleClass()





/***/ }),

/***/ "./src/memory-module.js":
/*!******************************!*\
  !*** ./src/memory-module.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "memoryModule": () => (/* binding */ memoryModule)
/* harmony export */ });
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-module.js */ "./src/dom-module.js");


const addProjectButton = document.querySelector('.add-project')
addProjectButton.onclick = function () {
  _dom_module_js__WEBPACK_IMPORTED_MODULE_0__.domModule.createNewForm('newProject')
}

const projectArray = _dom_module_js__WEBPACK_IMPORTED_MODULE_0__.memoryModule.projectArray
if (projectArray) {
  for (const project of projectArray) {
    _dom_module_js__WEBPACK_IMPORTED_MODULE_0__.domModule.addProject(project)
  }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFvQjtBQUN4QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb20tbW9kdWxlLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbWVtb3J5LW1vZHVsZS5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge21lbW9yeU1vZHVsZX0gZnJvbSAnLi9tZW1vcnktbW9kdWxlLmpzJztcclxuXHJcbi8vIHRoaXMgbW9kdWxlIGhhbmRsZXMgYW55IERPTSBtYW5pcHVsYXRpb25cclxuLy8gdGhpcyBpbmNsdWRlcyBhZGRpbmcgb3IgcmVtb3ZpbmcgdGFza3MvcHJvamVjdHMgZnJvbSB0aGUgcGFnZVxyXG4vLyBvciBkaXNwbGF5aW5nL2NsZWFyaW5nIG1vZGFsc1xyXG5jbGFzcyBQcm9qZWN0Q2xhc3Mge1xyXG4gIGNvbnN0cnVjdG9yICh0aXRsZSwgZGVzYywgZHVlID0gbmV3IERhdGUoKSwgdGFza3MpIHtcclxuICAgIHRpdGxlID0gdGl0bGUudHJpbSgpXHJcbiAgICB0aGlzLnRpdGxlID0gKHRpdGxlLmxlbmd0aCkgPyB0aXRsZSA6ICdVbm5hbWVkIFByb2plY3QnXHJcblxyXG4gICAgZGVzYyA9IGRlc2MudHJpbSgpXHJcbiAgICB0aGlzLmRlc2MgPSAoZGVzYy5sZW5ndGgpID8gZGVzYyA6ICdObyBkZXNjcmlwdGlvbi4nXHJcblxyXG4gICAgdGhpcy5kdWUgPSAoZHVlKSA/IGR1ZSA6ICcyMDAwLTAxLTAxJ1xyXG5cclxuICAgIHRoaXMudGFza3MgPSB0YXNrc1xyXG4gIH1cclxufVxyXG5jbGFzcyBUYXNrQ2xhc3Mge1xyXG4gIGNvbnN0cnVjdG9yICh0aXRsZSwgZHVlKSB7XHJcbiAgICB0aXRsZSA9IHRpdGxlLnRyaW0oKVxyXG4gICAgdGhpcy50aXRsZSA9ICh0aXRsZS5sZW5ndGgpID8gdGl0bGUgOiAnVW5uYW1lZCBQcm9qZWN0J1xyXG4gICAgdGhpcy5kdWUgPSAoZHVlKSA/IGR1ZSA6ICcyMDAwLTAxLTAxJ1xyXG4gIH1cclxufVxyXG5jbGFzcyBEb21Nb2R1bGVDbGFzcyB7XHJcbiAgLy8gY3JlYXRlcyB0aGUgbW9kYWwgZm9ybSBmb3IgYWRkaW5nIGEgcHJvamVjdFxyXG4gIGNyZWF0ZU5ld0Zvcm0gKHR5cGUsIHBhcmVudFByb2plY3RIVE1MKSB7XHJcbiAgICBpZiAodHlwZSAhPT0gJ25ld1Byb2plY3QnICYmIHR5cGUgIT09ICd0YXNrJyAmJiB0eXBlICE9PSAnZWRpdFByb2plY3QnKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0VSUk9SIElOIEFERElORyBGT1JNIE1PREFMOyBVTlNQRUNJRklFRCBGT1JNIFRZUEUnKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmICh0eXBlID09PSAndGFzaycgfHwgdHlwZSA9PT0gJ2VkaXRQcm9qZWN0Jykge1xyXG4gICAgICBpZiAoIXBhcmVudFByb2plY3RIVE1MKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IHBhcmVudFByb2plY3RIVE1MIG5vdCBwcm92aWRlZCBmb3IgbmV3IGZvcm0nKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBtb2RhbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBtb2RhbERpdi5pZCA9ICdhZGRQcm9qZWN0TW9kYWwnXHJcbiAgICBtb2RhbERpdi5jbGFzc0xpc3QuYWRkKCdtb2RhbCcpXHJcblxyXG4gICAgY29uc3QgZm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBmb3JtRGl2LmNsYXNzTGlzdC5hZGQoJ2NyZWF0ZS1maWVsZHMnKVxyXG4gICAgbW9kYWxEaXYuYXBwZW5kQ2hpbGQoZm9ybURpdilcclxuXHJcbiAgICBjb25zdCB0aXRsZVAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcclxuICAgIGlmICh0eXBlID09PSAnbmV3UHJvamVjdCcpIHtcclxuICAgICAgdGl0bGVQLnRleHRDb250ZW50ID0gJ0FkZCBQcm9qZWN0OidcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2VkaXRQcm9qZWN0Jykge1xyXG4gICAgICB0aXRsZVAudGV4dENvbnRlbnQgPSAnRWRpdCBQcm9qZWN0J1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGl0bGVQLnRleHRDb250ZW50ID0gJ0FkZCBUYXNrJ1xyXG4gICAgfVxyXG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZCh0aXRsZVApXHJcblxyXG4gICAgY29uc3QgbWFpbkZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcclxuICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQobWFpbkZvcm0pXHJcblxyXG4gICAgLy8gdGhpcyBmdW5jdGlvbiwgYXBwZW5kTGFiZWxJbnB1dFBhaXIsXHJcbiAgICAvLyBhcHBlbmRzIHR3byBpdGVtcyB0byB0aGUgbWFpbkZvcm0gSFRNTCBpdGVtOlxyXG4gICAgLy8gdGhlICdsYWJlbCcgYW5kICdpbnB1dCcgb2YgYSBwYXJ0aWN1bGFyIGZpZWxkXHJcbiAgICBjb25zdCBhcHBlbmRMYWJlbElucHV0UGFpciA9IGZ1bmN0aW9uIChuYW1lLCBpbnB1dFR5cGUpIHtcclxuICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXHJcbiAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgbmFtZSlcclxuICAgICAgY29uc3QgZGlzcGxheVRleHQgPSBuYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnN1YnN0cmluZygxKVxyXG4gICAgICBsYWJlbC50ZXh0Q29udGVudCA9IGAke2Rpc3BsYXlUZXh0fTpgXHJcblxyXG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgaW5wdXRUeXBlKVxyXG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBuYW1lKVxyXG4gICAgICBpbnB1dC5pZCA9IG5hbWVcclxuXHJcbiAgICAgIG1haW5Gb3JtLmFwcGVuZENoaWxkKGxhYmVsKVxyXG4gICAgICBtYWluRm9ybS5hcHBlbmRDaGlsZChpbnB1dClcclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmRMYWJlbElucHV0UGFpcigndGl0bGUnLCAndGV4dCcpXHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICduZXdQcm9qZWN0JyB8fCB0eXBlID09PSAnZWRpdFByb2plY3QnKSB7XHJcbiAgICAgIC8vIFJhdGhlciB0aGFuIGNvbnZvbHV0ZSBhcHBlbmRMYWJlbElucHV0UGFpcigpIHdpdGggdG9vIG1hbnkgYXJncyxcclxuICAgICAgLy8gaGVyZSdzIHNvbWUgY29kZSBkZWRpY2F0ZWQgdG8gdGhlIGxhYmVsL2lucHV0IGZvclxyXG4gICAgICAvLyB0aGUgRGVzY3JpcHRpb24gZmllbGRcclxuICAgICAgY29uc3QgZGVzY0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxyXG4gICAgICBkZXNjTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAnZGVzYycpXHJcbiAgICAgIGRlc2NMYWJlbC50ZXh0Q29udGVudCA9ICdEZXNjcmlwdGlvbjonXHJcbiAgICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcclxuICAgICAgZGVzY0lucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdkZXNjJylcclxuICAgICAgZGVzY0lucHV0LmlkID0gJ2Rlc2MnXHJcbiAgICAgIG1haW5Gb3JtLmFwcGVuZENoaWxkKGRlc2NMYWJlbClcclxuICAgICAgbWFpbkZvcm0uYXBwZW5kQ2hpbGQoZGVzY0lucHV0KVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZExhYmVsSW5wdXRQYWlyKCdkdWUnLCAnZGF0ZScpXHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICdlZGl0UHJvamVjdCcpIHtcclxuICAgICAgY29uc3QgcHJvamVjdEtleSA9IHBhcmVudFByb2plY3RIVE1MLnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LXRpdGxlJykudGV4dENvbnRlbnRcclxuICAgICAgLy8gRmluZCB0aGUgcGFyZW50IFByb2plY3QgaW4gcHJvamVjdEFycmF5XHJcbiAgICAgIGNvbnN0IHBhcmVudFByb2plY3RNZW1vcnkgPSBtZW1vcnlNb2R1bGUucHJvamVjdEFycmF5LmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0S2V5KVxyXG4gICAgICAvLyBGaWxsIG91dCB0aGUgZm9ybSB2YWx1ZXMgZnJvbSBwYXJlbnRQcm9qZWN0TWVtb3J5XHJcbiAgICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBtYWluRm9ybS5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKVxyXG4gICAgICBjb25zdCBkZXNjSW5wdXQgPSBtYWluRm9ybS5xdWVyeVNlbGVjdG9yKCcjZGVzYycpXHJcbiAgICAgIGNvbnN0IGR1ZUlucHV0ID0gbWFpbkZvcm0ucXVlcnlTZWxlY3RvcignI2R1ZScpXHJcbiAgICAgIHRpdGxlSW5wdXQudmFsdWUgPSBwYXJlbnRQcm9qZWN0TWVtb3J5LnRpdGxlXHJcbiAgICAgIGRlc2NJbnB1dC50ZXh0Q29udGVudCA9IHBhcmVudFByb2plY3RNZW1vcnkuZGVzY1xyXG4gICAgICBkdWVJbnB1dC50ZXh0Q29udGVudCA9IHBhcmVudFByb2plY3RNZW1vcnkuZHVlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICAgIHN1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJylcclxuICAgIHN1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ1N1Ym1pdCcpXHJcbiAgICBzdWJtaXRCdXR0b24uaWQgPSAnYWRkUHJvamVjdFN1Ym1pdEJ1dHRvbidcclxuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdTdWJtaXQnXHJcbiAgICBzdWJtaXRCdXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gdGhlIHN1Ym1pdCBidXR0b24gZ2F0aGVycyB0aGUgcmVsZXZhbnQgZmllbGQgdmFsdWVzLFxyXG4gICAgICAvLyBnZW5lcmF0ZXMgdGhlIGFwcHJvcHJpYXRlIHByb2plY3QvdGFzayBvYmplY3QsXHJcbiAgICAgIC8vIGFuZCBhc2tzIHRvIHVwZGF0ZSB0aGUgRE9NIGFwcHJvcHJpYXRlbHkuXHJcbiAgICAgIGNvbnN0IHRpdGxlID0gbW9kYWxEaXYucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWVcclxuICAgICAgY29uc3QgZHVlID0gbW9kYWxEaXYucXVlcnlTZWxlY3RvcignI2R1ZScpLnZhbHVlXHJcblxyXG4gICAgICBpZiAodHlwZSA9PT0gJ25ld1Byb2plY3QnKSB7XHJcbiAgICAgICAgY29uc3QgZGVzYyA9IG1vZGFsRGl2LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjJykudmFsdWVcclxuICAgICAgICBjb25zdCBzdWJtaXR0ZWRPYmplY3QgPSBuZXcgUHJvamVjdENsYXNzKHRpdGxlLCBkZXNjLCBkdWUpXHJcbiAgICAgICAgbWVtb3J5TW9kdWxlLnNhdmVQcm9qZWN0KHN1Ym1pdHRlZE9iamVjdClcclxuICAgICAgICBkb21Nb2R1bGUuYWRkUHJvamVjdChzdWJtaXR0ZWRPYmplY3QpXHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2VkaXRQcm9qZWN0Jykge1xyXG4gICAgICAgIC8vIHNhdmUgYWxsIHZhbHVlcyBpbnRvIG1lbW9yeSB0aHJvdWdoIGVkaXRQcm9qZWN0KCk7XHJcbiAgICAgICAgY29uc3QgdGl0bGVIVE1MID0gcGFyZW50UHJvamVjdEhUTUwucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUnKVxyXG5cclxuICAgICAgICBjb25zdCBwcm9qZWN0S2V5ID0gcGFyZW50UHJvamVjdEhUTUwucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUnKS50ZXh0Q29udGVudFxyXG4gICAgICAgIGNvbnN0IGRlc2MgPSBtb2RhbERpdi5xdWVyeVNlbGVjdG9yKCcjZGVzYycpLnZhbHVlXHJcbiAgICAgICAgY29uc3Qgc3VibWl0dGVkT2JqZWN0ID0gbmV3IFByb2plY3RDbGFzcyh0aXRsZSwgZGVzYywgZHVlKVxyXG4gICAgICAgIG1lbW9yeU1vZHVsZS5lZGl0UHJvamVjdChwcm9qZWN0S2V5LCBzdWJtaXR0ZWRPYmplY3QpXHJcblxyXG4gICAgICAgIC8vIE5vdyByZXBsYWNlIHRoZSBpdGVtJ3MgdmFsdWVzIGluIHRoZSBET006XHJcbiAgICAgICAgdGl0bGVIVE1MLnRleHRDb250ZW50ID0gc3VibWl0dGVkT2JqZWN0LnRpdGxlXHJcblxyXG4gICAgICAgIGNvbnN0IGRlc2NIVE1MID0gcGFyZW50UHJvamVjdEhUTUwucXVlcnlTZWxlY3RvcignLnByb2plY3QtZGVzYycpXHJcbiAgICAgICAgZGVzY0hUTUwudGV4dENvbnRlbnQgPSBzdWJtaXR0ZWRPYmplY3QuZGVzY1xyXG5cclxuICAgICAgICBjb25zdCBkdWVIVE1MID0gcGFyZW50UHJvamVjdEhUTUwucXVlcnlTZWxlY3RvcignLnByb2plY3QtZHVlJylcclxuICAgICAgICBkdWVIVE1MLnRleHRDb250ZW50ID0gc3VibWl0dGVkT2JqZWN0LmR1ZVxyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0YXNrJykge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RLZXkgPSBwYXJlbnRQcm9qZWN0SFRNTC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10aXRsZScpLnRleHRDb250ZW50XHJcbiAgICAgICAgLy8gVGhpcyBpcyB2ZXJ5IGJhZCBkZXNpZ24sIHNvIEknbSBsaXN0aW5nIGl0cyBhY3Rpb25zIGJpdC1ieS1iaXRcclxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgdGFzayBvYmplY3RcclxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2tDbGFzcyh0aXRsZSwgZHVlKVxyXG4gICAgICAgIC8vIEZpbmQgdGhlIHBhcmVudCBQcm9qZWN0IGluIHByb2plY3RBcnJheVxyXG4gICAgICAgIGNvbnN0IHBhcmVudFByb2plY3RNZW1vcnkgPSBtZW1vcnlNb2R1bGUucHJvamVjdEFycmF5LmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0S2V5KVxyXG4gICAgICAgIC8vIHB1c2ggdGFzayB0byBQcm9qZWN0J3MgdGFzayBhcnJheVxyXG4gICAgICAgIGlmIChwYXJlbnRQcm9qZWN0TWVtb3J5LnRhc2tzKSB7XHJcbiAgICAgICAgICBwYXJlbnRQcm9qZWN0TWVtb3J5LnRhc2tzLnVuc2hpZnQodGFzaylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGFyZW50UHJvamVjdE1lbW9yeS50YXNrcyA9IFt0YXNrXVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwdXNoIG5ldyBvYmplY3QgdG8gbWVtb3J5TW9kdWxlLmVkaXRNZW1vcnkoKTtcclxuICAgICAgICBtZW1vcnlNb2R1bGUuZWRpdFByb2plY3QocHJvamVjdEtleSwgcGFyZW50UHJvamVjdE1lbW9yeSlcclxuXHJcbiAgICAgICAgY29uc3QgdGFza0dyaWQgPSBwYXJlbnRQcm9qZWN0SFRNTC5xdWVyeVNlbGVjdG9yKCcudGFzay1ncmlkJylcclxuXHJcbiAgICAgICAgLy8gbG9hZCB0aGUgSFRNTCBieSBqdXN0IGFkZGluZyB0byB0aGUgcGFyZW50UHJvamVjdEhUTUwncyB0YXNrIGdyaWRcclxuICAgICAgICAvLyB0aGlzIGlzIHN0aWxsIGJhZCBkZXNpZ247IG1vc3RseSBjb3B5LXBhc3RlZCBmcm9tIGJlbG93XHJcblxyXG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2snKVxyXG5cclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxuICAgICAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94J1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjaGVja2JveClcclxuICAgICAgICBjaGVja2JveC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgbWVtb3J5TW9kdWxlLnJlbW92ZVRhc2sodGFzaywgcGFyZW50UHJvamVjdE1lbW9yeSlcclxuICAgICAgICAgIGNvbnN0IHRhc2tIVE1MID0gdGhpcy5wYXJlbnROb2RlXHJcbiAgICAgICAgICB0YXNrSFRNTC5yZW1vdmUoKVxyXG4gICAgICAgICAgLy8gVE9ETzogYWRkIGZhZGUtb3V0IGFuaW1hdGlvblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gdGFzay50aXRsZVxyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpXHJcblxyXG4gICAgICAgIGNvbnN0IHRhc2tEdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcclxuICAgICAgICB0YXNrRHVlLnRleHRDb250ZW50ID0gdGFzay5kdWVcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQodGFza0R1ZSlcclxuXHJcbiAgICAgICAgdGFza0dyaWQuaW5zZXJ0QmVmb3JlKGRpdiwgdGFza0dyaWQuZmlyc3RDaGlsZClcclxuICAgICAgfVxyXG4gICAgICAvLyB0aGlzLmFkZFByb2plY3QobmV3UHJvamVjdClcclxuICAgICAgbW9kYWxEaXYucmVtb3ZlKClcclxuICAgIH1cclxuICAgIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG1vZGFsRGl2KSB7XHJcbiAgICAgICAgbW9kYWxEaXYucmVtb3ZlKClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbWFpbkZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKVxyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWxEaXYpXHJcbiAgfVxyXG5cclxuICAvLyBsb2FkUHJvamVjdEVsZW1lbnQgaGVscHMgYWRkUHJvamVjdCgpXHJcbiAgLy8gYnkgY3JlYXRpbmcgYSBkaXYsIG9mIGEgZ2l2ZW4gY2xhc3MgbmFtZSxcclxuICAvLyBhbmQgYWRkaW5nIGEgZ2l2ZW4gdGV4dCBjb250ZW50XHJcbiAgbG9hZFByb2plY3RFbGVtZW50IChjbGFzc05hbWUsIGNvbnRlbnQpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXHJcbiAgICBpZiAoY29udGVudCkgZGl2LnRleHRDb250ZW50ID0gY29udGVudFxyXG4gICAgcmV0dXJuIGRpdlxyXG4gIH1cclxuXHJcbiAgLy8gYWRkUHJvamVjdCBsb2FkcyBhIHByb3ZpZGVkIHByb2plY3Qtb2JqZWN0IGludG8gdGhlIERPTVxyXG4gIC8vIGFzIGEgbmV3IGNoaWxkIHRvIHRoZSBtYWluIHByb2plY3QtZ3JpZFxyXG4gIC8vIGFuZCBhZGRzIHJlc3BlY3RpdmUgZXZlbnQgbGlzdGVuZXJzXHJcbiAgYWRkUHJvamVjdCAobG9hZGVkT2JqZWN0KSB7XHJcbiAgICBjb25zdCBtYWluQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKVxyXG5cclxuICAgIC8vIGFkZFByb2plY3QoKTogdGhpcyBzZWN0aW9uIGFkZHMgdGhlIG1haW4gcHJvamVjdCdzIGRhdGEgZWxlbWVudHM6XHJcbiAgICAvLyB0aXRsZSwgZGVzY3JpcHRpb24sIGFuZCBkdWUtZGF0ZVxyXG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKVxyXG5cclxuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IHRoaXMubG9hZFByb2plY3RFbGVtZW50KCdwcm9qZWN0LXRpdGxlJywgbG9hZGVkT2JqZWN0LnRpdGxlKVxyXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpXHJcblxyXG4gICAgY29uc3QgcHJvamVjdERlc2MgPSB0aGlzLmxvYWRQcm9qZWN0RWxlbWVudCgncHJvamVjdC1kZXNjJywgbG9hZGVkT2JqZWN0LmRlc2MpXHJcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3REZXNjKVxyXG5cclxuICAgIGNvbnN0IHByb2plY3REdWUgPSB0aGlzLmxvYWRQcm9qZWN0RWxlbWVudCgncHJvamVjdC1kdWUnLCBgRHVlOiAke2xvYWRlZE9iamVjdC5kdWV9YClcclxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdER1ZSlcclxuXHJcbiAgICAvLyBhZGRQcm9qZWN0KCk6IHRoaXMgc2VjdGlvbiBhZGRzIHRoZSB0YXNrIGdyaWQgdG8gdGhlIHByb2plY3RcclxuICAgIGNvbnN0IHRhc2tHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHRhc2tHcmlkLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZ3JpZCcpXHJcblxyXG4gICAgY29uc3QgdGFza0FycmF5ID0gbG9hZGVkT2JqZWN0LnRhc2tzXHJcbiAgICBpZiAodGFza0FycmF5KSB7XHJcbiAgICAgIGZvciAoY29uc3QgdGFzayBvZiB0YXNrQXJyYXkpIHtcclxuICAgICAgICAvLyBhZGRQcm9qZWN0KCk6IHRoaXMgc2VjdGlvbiBhZGRzIGEgdGFzaydzIG1haW4gZGF0YSBlbGVtZW50c1xyXG4gICAgICAgIC8vIHRvIHRoZSB0YXNrIGdyaWQ6XHJcbiAgICAgICAgLy8gY2hlY2tib3gsIHRpdGxlLCBkdWUtZGF0ZVxyXG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2snKVxyXG5cclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxuICAgICAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94J1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChjaGVja2JveClcclxuICAgICAgICBjaGVja2JveC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgY29uc3QgdGFza05hbWUgPSB0YXNrLnRpdGxlXHJcbiAgICAgICAgICBjb25zdCBwcm9qZWN0S2V5ID0gbG9hZGVkT2JqZWN0LnRpdGxlXHJcbiAgICAgICAgICBtZW1vcnlNb2R1bGUucmVtb3ZlVGFzayh0YXNrLCBsb2FkZWRPYmplY3QpXHJcbiAgICAgICAgICAvLyBUT0RPOiBhZGQgZmFkZS1vdXQgYW5pbWF0aW9uXHJcbiAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGVcclxuICAgICAgICB0YXNrVGl0bGUuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpXHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRhc2tUaXRsZSlcclxuXHJcbiAgICAgICAgY29uc3QgdGFza0R1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxyXG4gICAgICAgIHRhc2tEdWUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZVxyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0YXNrRHVlKVxyXG5cclxuICAgICAgICB0YXNrR3JpZC5hcHBlbmRDaGlsZChkaXYpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGFkZFByb2plY3QoKTogYSBmaW5hbCBlbXB0eSB0YXNrLCB0aGUgJ3Rhc2tBZGRlcicsIGVuYWJsZXMgdGFzayBhZGRpdGlvbjpcclxuICAgIGNvbnN0IHRhc2tBZGRlciA9IHRoaXMubG9hZFByb2plY3RFbGVtZW50KCd0YXNrJywgJysnKVxyXG4gICAgdGFza0FkZGVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stYWRkZXInKVxyXG4gICAgdGFza0FkZGVyLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vIG1ha2UgbmV3IGZvcm1cclxuICAgICAgY29uc3QgcGFyZW50UHJvamVjdEhUTUwgPSB0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZVxyXG4gICAgICBkb21Nb2R1bGUuY3JlYXRlTmV3Rm9ybSgndGFzaycsIHBhcmVudFByb2plY3RIVE1MKVxyXG4gICAgICAvLyBwdXNoIHRvIGxvYWRlZE9iamVjdC50YXNrcyBhcnJheVxyXG4gICAgICAvLyBzYXZlIG5ldyBvYmplY3QgdG8gbWVtb3J5XHJcbiAgICB9XHJcbiAgICB0YXNrR3JpZC5hcHBlbmRDaGlsZCh0YXNrQWRkZXIpXHJcblxyXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZCh0YXNrR3JpZClcclxuXHJcbiAgICAvLyBhZGRQcm9qZWN0KCk6IHRoZSB1dGlsaXR5SXRlbXMgZm9yIGVhY2ggcHJvamVjdDpcclxuICAgIC8vIGhvbGRzIHRoZSBlZGl0UHJvamVjdCBhbmQgZGVsZXRlUHJvamVjdCBidXR0b25zIVxyXG4gICAgY29uc3QgdXRpbGl0eUl0ZW1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIHV0aWxpdHlJdGVtcy5jbGFzc0xpc3QuYWRkKCd1dGlsaXR5LWl0ZW1zJylcclxuXHJcbiAgICAvLyB0aGUgZGVsZXRlUHJvamVjdEJ1dHRvbiB3aWxsIG9wZW4gYW4gJ2FyZSB5b3Ugc3VyZT8nIG1vZGFsXHJcbiAgICAvLyBhbmQgdGhlbiBkZWxldGUgZnJvbSBsb2NhbFN0b3JhZ2VcclxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3NyYycsICcuL2ltYWdlcy90cmFzaC5zdmcnKVxyXG4gICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdmcnKVxyXG4gICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RhbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgIG1vZGFsRGl2LmlkID0gJ2FkZFByb2plY3RNb2RhbCdcclxuICAgICAgbW9kYWxEaXYuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKVxyXG5cclxuICAgICAgY29uc3QgZm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgIGZvcm1EaXYuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1maWVsZCcpXHJcbiAgICAgIG1vZGFsRGl2LmFwcGVuZENoaWxkKGZvcm1EaXYpXHJcblxyXG4gICAgICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG1vZGFsRGl2KSB7XHJcbiAgICAgICAgICBtb2RhbERpdi5yZW1vdmUoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29uZmlybVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXHJcbiAgICAgIGNvbmZpcm1UZXh0LnRleHRDb250ZW50ID0gYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgXCIke2xvYWRlZE9iamVjdC50aXRsZX0/XCJgXHJcbiAgICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoY29uZmlybVRleHQpXHJcblxyXG4gICAgICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICAgICAgLy8gY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJylcclxuICAgICAgLy8gY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ1N1Ym1pdCcpXHJcbiAgICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCA9ICdjb25maXJtLWJ1dHRvbidcclxuICAgICAgY29uZmlybUJ1dHRvbi50ZXh0Q29udGVudCA9ICdZZXMhJ1xyXG4gICAgICBjb25maXJtQnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcHJvamVjdERpdi5yZW1vdmUoKVxyXG4gICAgICAgIG1vZGFsRGl2LnJlbW92ZSgpXHJcbiAgICAgICAgbWVtb3J5TW9kdWxlLmRlbGV0ZVByb2plY3QobG9hZGVkT2JqZWN0LnRpdGxlKVxyXG4gICAgICB9XHJcbiAgICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoY29uZmlybUJ1dHRvbilcclxuXHJcbiAgICAgIGNvbnN0IHJlamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXHJcbiAgICAgIC8vIHJlamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJylcclxuICAgICAgLy8gcmVqZWN0QnV0dG9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnU3VibWl0JylcclxuICAgICAgcmVqZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQgPSAnY29uZmlybS1idXR0b24nXHJcbiAgICAgIHJlamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdObyEnXHJcbiAgICAgIHJlamVjdEJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG1vZGFsRGl2LnJlbW92ZSgpXHJcbiAgICAgIH1cclxuICAgICAgZm9ybURpdi5hcHBlbmRDaGlsZChyZWplY3RCdXR0b24pXHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsRGl2KVxyXG4gICAgfVxyXG5cclxuICAgIHV0aWxpdHlJdGVtcy5hcHBlbmRDaGlsZChkZWxldGVQcm9qZWN0QnV0dG9uKVxyXG5cclxuICAgIC8vIHRoZSBlZGl0UHJvamVjdEJ1dHRvbiB3aWxsIG9wZW4gYSBwb3B1bGF0ZWQgZm9ybSB3aGljaCwgdXBvbiBzdWJtaXNzaW9uLFxyXG4gICAgLy8gd2lsbCBjaGFuZ2UgdGhlIGl0ZW0ncyBhdHRyaWJ1dGVzIGluIGxvY2FsU3RvcmFnZVxyXG4gICAgY29uc3QgZWRpdFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgZWRpdFByb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKCdzcmMnLCAnLi9pbWFnZXMvZWRpdC5zdmcnKVxyXG4gICAgZWRpdFByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3ZnJylcclxuICAgIGVkaXRQcm9qZWN0QnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGRvbU1vZHVsZS5jcmVhdGVOZXdGb3JtKCdlZGl0UHJvamVjdCcsIHByb2plY3REaXYpXHJcbiAgICB9XHJcbiAgICB1dGlsaXR5SXRlbXMuYXBwZW5kQ2hpbGQoZWRpdFByb2plY3RCdXR0b24pXHJcblxyXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZCh1dGlsaXR5SXRlbXMpXHJcblxyXG4gICAgLy8gRVZFTlQgTElTVEVORVJTIVxyXG4gICAgLy8gVGhlc2UgZGVzY3JpYmUgdGhlIGZ1bmN0aW9ucyBmb3IgdGhlIGZvbGxvd2luZyBlbGVtZW50czpcclxuICAgIC8vIHRhc2tBZGRlciwgZGVsZXRlUHJvamVjdEJ1dHRvbiwgYW5kIGVkaXRQcm9qZWN0QnV0dG9uXHJcblxyXG4gICAgbWFpbkFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdERpdilcclxuICB9XHJcbn1cclxuY29uc3QgZG9tTW9kdWxlID0gbmV3IERvbU1vZHVsZUNsYXNzKClcclxuXHJcbmV4cG9ydCB7IGRvbU1vZHVsZSB9XHJcbmV4cG9ydCB7IG1lbW9yeU1vZHVsZSB9XHJcbiIsIi8vIHRoaXMgbW9kdWxlIGlzIHJlc3BvbnNpYmxlIGZvciBhbnkgY2hhbmdlcyB0byBtZW1vcnlcclxuLy8gdGhpcyBpbmNsdWRlcyBzYXZpbmcsIGRlbGV0aW5nLCBlZGl0aW5nLCBhbmQgbG9hZGluZyBwcm9qZWN0L3Rhc2sgZGF0YVxyXG5jbGFzcyBNZW1vcnlNb2R1bGVDbGFzcyB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgLy8gYWxsIHByb2plY3RzLCBhbmQgdGhlaXIgaW5mb3JtYXRpb24sIGlzIGhvdXNlZCBpbiB0aGlzIGFycmF5OlxyXG4gICAgY29uc3QgbWF5YmVBcnJheSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0QXJyYXknKVxyXG4gICAgaWYgKG1heWJlQXJyYXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnByb2plY3RBcnJheSA9IEpTT04ucGFyc2UobWF5YmVBcnJheSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucHJvamVjdEFycmF5ID0gW11cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldE1lbW9yeSAocHJvamVjdEtleSkge1xyXG4gICAgY29uc3QgbG9hZGVkT2JqZWN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShwcm9qZWN0S2V5KSlcclxuICAgIHJldHVybiBsb2FkZWRPYmplY3RcclxuICB9XHJcblxyXG4gIGRlbGV0ZVByb2plY3QgKHByb2plY3RLZXkpIHtcclxuICAgIGlmICh0aGlzLnByb2plY3RBcnJheSkge1xyXG4gICAgICB0aGlzLnByb2plY3RBcnJheSA9IHRoaXMucHJvamVjdEFycmF5LmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3QudGl0bGUgIT09IHByb2plY3RLZXkpXHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0QXJyYXknLCBKU09OLnN0cmluZ2lmeSh0aGlzLnByb2plY3RBcnJheSkpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzYXZlUHJvamVjdCAocHJvamVjdCkge1xyXG4gICAgaWYgKHRoaXMucHJvamVjdEFycmF5KSB7XHJcbiAgICAgIHRoaXMucHJvamVjdEFycmF5LnB1c2gocHJvamVjdClcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RBcnJheScsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvamVjdEFycmF5KSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHRlbXBBcnJheSA9IFtwcm9qZWN0XVxyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdEFycmF5JywgSlNPTi5zdHJpbmdpZnkodGVtcEFycmF5KSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVkaXRQcm9qZWN0IChwcm9qZWN0S2V5LCBuZXdQcm9qZWN0KSB7XHJcbiAgICBpZiAoIXByb2plY3RLZXkgfHwgIW5ld1Byb2plY3QgfHwgIXRoaXMucHJvamVjdEFycmF5KSByZXR1cm5cclxuICAgIC8vIGZpbmQgcG9zaXRpb24gb2YgaXRlbSBpbiBwcm9qZWN0QXJyYXlcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5wcm9qZWN0QXJyYXkuZmluZEluZGV4KHByb2plY3QgPT4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdEtleSlcclxuICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gYXJyYXlcclxuICAgIHRoaXMucHJvamVjdEFycmF5LnNwbGljZShwb3NpdGlvbiwgMSlcclxuICAgIC8vIGFkZCBuZXcgaXRlbSB0byBhcnJheVxyXG4gICAgdGhpcy5wcm9qZWN0QXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAwLCBuZXdQcm9qZWN0KVxyXG4gICAgLy8gU0FWRVxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RBcnJheScsIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvamVjdEFycmF5KSlcclxuICB9XHJcblxyXG4gIHJlbW92ZVRhc2sgKHRhc2ssIHByb2plY3QpIHtcclxuICAgIGlmICghdGFzayB8fCAhcHJvamVjdCkgcmV0dXJuXHJcbiAgICBwcm9qZWN0LnRhc2tzID0gcHJvamVjdC50YXNrcy5maWx0ZXIoaXRlbSA9PiBpdGVtLnRpdGxlICE9PSB0YXNrLnRpdGxlKVxyXG4gICAgdGhpcy5lZGl0UHJvamVjdChwcm9qZWN0LnRpdGxlLCBwcm9qZWN0KVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWVtb3J5TW9kdWxlID0gbmV3IE1lbW9yeU1vZHVsZUNsYXNzKClcclxuZXhwb3J0IHsgbWVtb3J5TW9kdWxlIH1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkb21Nb2R1bGUsIG1lbW9yeU1vZHVsZSB9IGZyb20gJy4vZG9tLW1vZHVsZS5qcydcclxuXHJcbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QnKVxyXG5hZGRQcm9qZWN0QnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgZG9tTW9kdWxlLmNyZWF0ZU5ld0Zvcm0oJ25ld1Byb2plY3QnKVxyXG59XHJcblxyXG5jb25zdCBwcm9qZWN0QXJyYXkgPSBtZW1vcnlNb2R1bGUucHJvamVjdEFycmF5XHJcbmlmIChwcm9qZWN0QXJyYXkpIHtcclxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdEFycmF5KSB7XHJcbiAgICBkb21Nb2R1bGUuYWRkUHJvamVjdChwcm9qZWN0KVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=