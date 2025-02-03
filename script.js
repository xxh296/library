const myLibrary = [];

function Book(author, title, pages, isRead, comment) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.comment = comment;
}

function addBookToLibrary(author, title, pages, isRead, comment) {
  const book = new Book(author, title, pages, isRead, comment);
  myLibrary.push(book);
  return myLibrary;
}

// DEBUG
// console.log("Hello");