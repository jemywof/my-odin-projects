const contactPage = () => {
  const pageDiv = document.createElement('div');
  mainDiv.classList.add('page-div');

  const contactHeader = document.createElement('h3');
  contactHeader.textContent = "Contact Us";

  const phoneNumber = document.createElement('p');
  phoneNumber.textContent = "Phone: 123-456-7890";

  const email = document.createElement('p');
  email.textContent = "Email: chilis@chili.chili";

  function addToPage() {
    //console.log(arguments);
    let args = arguments;
    for (let i = 0; i < args.length; i++) {
      pageDiv.appendChild(args[i]);
    }
  }

  addToPage(contactHeader, phoneNumber, email);

  return pageDiv;
}

export default contactPage;