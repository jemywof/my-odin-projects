const mainPage = () => {
  const pageDiv = document.createElement('div');
  pageDiv.classList.add('pageDiv');

  const mainHeader = document.createElement('h3');
  aboutHeader.textContent = "Welcome to Chili's!"

  const mainText = document.createElement('p');
  aboutText.textContent = ("Chili's chili-house is a family"
  + "-owned restaurant serving only the highest-quality"
  + " chili-based dishes and chili-adjacent foods.");

  const lineBreak = document.createElement('hr');

  const secondText = document.createElement('p');
  secondText.textContent = ("Please feel free to call"
  + "us to make a reservation, or just drop by!");


  function addToPage() {
    //console.log(arguments);
    let args = arguments;
    for (let i = 0; i < args.length; i++) {
      pageDiv.appendChild(args[i]);
    }
  }

  addToPage(mainHeader, mainText, lineBreak, secondText);

  return pageDiv;

}

export default mainPage;