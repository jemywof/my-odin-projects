//this script loads the a series of book-cards to the HTML,
//and allows the user to add their own book-cards


//initialize general global variables

//i don't use this array for anything
//but ODIN said I should use it
//so here we are!
let myLibrary = [];
myLibrary.push(new Book("War and Peace", "Leo Tolstoy", 90000, true))
myLibrary.push(new Book("IT", "Stephen King", 800, false))
myLibrary.push(new Book("Pushcard Prize XXXVII", "Henderson et al", 9000, false))
myLibrary.push(new Book("TestBookTitle", "TestBookAuthor", 69420, false))


//The Book constructor!

function Book(title, author, pageCount, hasRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.hasRead = hasRead;
}

//Prototype all Book object functions

Book.prototype.toggleRead = function() {
  (this.hasRead == true) ? this.hasRead = false : this.hasRead = true;
  return;
}

Book.prototype.removeFromLibrary = function() {

}

Book.prototype.announce = function() {
  for (let prop in this) {
    console.log(prop);
  }
}
                               
//prototype 'addCard' function
//adds any given Book to the HTML in a 'book-card' div
Book.prototype.addCard = function(uniqueNumber) {

  //for each property of Book: 
  //create an element, add the property, and append to the div
  let bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.setAttribute('value', uniqueNumber);
  
  let cardTitle = document.createElement('h2');
  cardTitle.textContent = this.title;
  cardTitle.classList.add('card-title');
  bookCard.appendChild(cardTitle);

  let cardAuthor = document.createElement('h3');
  cardAuthor.textContent = this.author;
  cardAuthor.classList.add('card-author');
  bookCard.appendChild(cardAuthor);

  //cardBottom is a separate chunk of the card, for style:

  let cardBottom = document.createElement('div');
  cardBottom.classList.add('card-bottom');

  let cardPages = document.createElement('p');
  cardPages.textContent = `${this.pageCount} pages`;
  cardPages.classList.add('card-pages');
  cardBottom.appendChild(cardPages);

  let cardHasRead = document.createElement('p');
  cardHasRead.textContent = this.hasRead;
  if (this.hasRead == true) {
    cardHasRead.textContent = 'Read!';
    cardHasRead.classList.add('card-read');
  }
  else {
    cardHasRead.textContent = 'Unread';
    cardHasRead.classList.add('card-unread');
  }
  cardHasRead.onclick = toggleRead;
  cardBottom.appendChild(cardHasRead);

  bookCard.appendChild(cardBottom);

  let removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-button');
  removeButton.onclick = removeCard;
  bookCard.appendChild(removeButton);


  //add everything to the page!

  document.getElementById('bookDisplay').appendChild(bookCard);
}


//initialize functions


//creates a book with given parameters, adds to library array, adds to HTML.
function loadBook(title, author, pageCount, hasRead) {
  const book = new Book(title, author, pageCount, hasRead);
  myLibrary.push(book);
  book.addCard();
}

//opens the 'NEW BOOK!' popup, for the user to submit information
function openBookForm() {
  let modal = document.getElementById('createModal');
  let closeButton = document.querySelector('.close');
  modal.style.display='block';
  closeButton.onclick = function() {
    modal.style.display = 'none';
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}

//submits the 'NEW BOOK!' popup info, and adds the new book to the page
function submitBookForm() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pageCount = document.getElementById('pageCount').value;
  let hasRead = document.querySelector('input[name=hasRead]:checked').value;
  if (!title || !author || !pageCount || !hasRead) return;
  console.log(title, author, pageCount, hasRead);
  loadBook(title, author, pageCount, hasRead);
}

//toggles a book's status between 'Read!' and 'Unread'
function toggleRead() {
  this.classList.toggle('card-read');
  this.classList.toggle('card-unread');
  if (this.textContent == 'Read!') {
    this.textContent = 'Unread';
  } else {
    this.textContent = 'Read!';
  }
}

function removeCard() {
  this.parentNode.remove();
}

//this starting function pushes the myLibrary array's Book objects 
//to addCard().

document.addEventListener("DOMContentLoaded", function() {
  myLibrary.map(book => book.addCard());
});

