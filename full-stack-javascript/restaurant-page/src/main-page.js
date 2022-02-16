const mainPage = () => {
  const introPage = document.createElement('div');
  introPage.classList.add('intro-page');

  const aboutHeader = document.createElement('h3');
  aboutHeader.textContent = "About Chili's"

  const aboutText = document.createElement('p');
  aboutText.textContent = ("Chili's chili-house is a family"
  + "-owned restaurant serving only the highest-quality"
  + " chili-based dishes and chili-adjacent foods. It has"
  + " absolutely no relation to the national chain, Chili's,"
  + " and any attempt to associate Chili's chili-house family"
  + " restaurant to the corporate beast will be met with"
  + " justified indignation and swift violence.");

  const chiliHeader = document.createElement('h3');
  chiliHeader.textContent = "But why chili?";

  const chiliTextOne = document.createElement('p');
  chiliTextOne.textContent = ("For centuries, Chili's chili-house"
  + " served exclusively chili-based entrees. Only recently has"
  + " the family-owned restaurant allowed chili-adjacent foods."
  + " Hence, many patrons ask: 'why chili'?");

  const chiliTextTwo = document.createElement('p');
  chiliTextTwo.textContent = (`"While the founder, Dierdre`
  + ` Kluft III, gave no personal explanaition for her strange`
  + ` business model, the family has held dear to her wishes`
  + ` as much as humanly possible," says Chili's owner Dierdre`
  + ` Kluft IX.`);


  function addToPage() {
    //console.log(arguments);
    let args = arguments;
    for (let i = 0; i < args.length; i++) {
      introPage.appendChild(args[i]);
      console.log(args[i]);
    }
  }
  introPage.appendChild(aboutHeader);
  addToPage(aboutHeader, aboutText, chiliHeader, chiliTextOne, chiliTextTwo);

  return introPage;

}

export default mainPage;