import menuPage from './menu-page.js';
import mainPage from './main-page.js';
import aboutPage from './about-page.js';
import contactPage from './contact-page.js';

const loadTaskBar = () => {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');

  const mainButton = document.createElement('button');
  mainButton.textContent = 'Home';
  mainButton.onclick = () => {
    loadPage(mainPage);
  }

  const menuButton = document.createElement('button');
  menuButton.textContent = 'Menu';
  menuButton.onclick = () => {
    loadPage(menuPage);
  }

  const aboutButton = document.createElement('button');
  aboutButton.textContent = 'About Us';
  aboutButton.onclick = () => {
    loadPage(aboutPage);
  }

  const contactButton = document.createElement('button');
  contactButton.textContent = 'Contact Us';
  contactButton.onclick = () => {
    loadPage(contactPage);
  }

  function addToPage() {
    //console.log(arguments);
    let args = arguments;
    for (let i = 0; i < args.length; i++) {
      taskDiv.appendChild(args[i]);
    }
  }

  addToPage(mainButton, menuButton, aboutButton, contactButton);

  return taskDiv;
}

const loadFooter = () => {
  const footerDiv = document.createElement('div');
  footerDiv.classList.add('footer');

  const content = document.createElement('p');
  content.textContent = '© 2022 EATMYSHORTS INTERNATIONAL ALL RIGHTS RESERVED';
  footerDiv.appendChild(content);

  return footerDiv;
}

const loadPage = (loadScript) => {
  while (mainContent.firstChild) {
    mainContent.removeChild(mainContent.firstChild);
  }
  mainContent.appendChild(loadScript());
}

document.body.appendChild(loadTaskBar());

const mainContent = document.createElement('div');
mainContent.classList.add('main');
document.body.appendChild(mainContent);

document.body.appendChild(loadFooter());

loadPage(mainPage);