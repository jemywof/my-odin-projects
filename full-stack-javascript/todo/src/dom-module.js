import { memoryModule } from './memory-module.js'

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
      const parentProjectMemory = memoryModule.projectArray.find(project => project.title === projectKey)
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
        memoryModule.saveProject(submittedObject)
        domModule.addProject(submittedObject)
      } else if (type === 'editProject') {
        // save all values into memory through editProject();
        const titleHTML = parentProjectHTML.querySelector('.project-title')

        const projectKey = parentProjectHTML.querySelector('.project-title').textContent
        const desc = modalDiv.querySelector('#desc').value
        const submittedObject = new ProjectClass(title, desc, due)
        memoryModule.editProject(projectKey, submittedObject)

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
        const parentProjectMemory = memoryModule.projectArray.find(project => project.title === projectKey)
        // push task to Project's task array
        if (parentProjectMemory.tasks) {
          parentProjectMemory.tasks.unshift(task)
        } else {
          parentProjectMemory.tasks = [task]
        }
        // push new object to memoryModule.editMemory();
        memoryModule.editProject(projectKey, parentProjectMemory)

        const taskGrid = parentProjectHTML.querySelector('.task-grid')

        // load the HTML by just adding to the parentProjectHTML's task grid
        // this is still bad design; mostly copy-pasted from below

        const div = document.createElement('div')
        div.classList.add('task')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        div.appendChild(checkbox)
        checkbox.onclick = function () {
          memoryModule.removeTask(task, parentProjectMemory)
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
          memoryModule.removeTask(task, loadedObject)
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
        memoryModule.deleteProject(loadedObject.title)
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

export { domModule }
export { memoryModule }
