import menuPage from './menu-page.js';
import mainPage from './main-page.js';

const loadTaskBar = () => {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task');

  const menuButton = document.createElement('button');
  menuButton.textContent = 'MENU HERE!';
  menuButton.onclick = () => {
    loadPage(menuPage);
  }

  const mainButton = document.createElement('button');
  mainButton.textContent = 'Main';
  mainButton.onclick = () => {
    loadPage(mainPage);
  }

  taskDiv.appendChild(menuButton);
  taskDiv.appendChild(mainButton);

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