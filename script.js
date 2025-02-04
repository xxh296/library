const myLibrary = [];

function Book(author, title, pages, isRead, comment) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.comment = comment;
    this.bookId = myLibrary.length + 1;
}

function addBookToLibrary(author, title, pages, isRead, comment) {
  const book = new Book(author, title, pages, isRead, comment);
  myLibrary.push(book);
  return myLibrary;
}

function removeBookFromLibrary(bookNum){

  //DEBUG
  console.log("myLibrary.lenth === " + myLibrary.length);

    const indexToRemove = myLibrary.findIndex(i => i.bookId === bookNum);
    if (indexToRemove !== -1){
      myLibrary.splice(indexToRemove, 1);
    }

    //DEBUG
    console.log(myLibrary);
    console.log("myLibrary.lenth === " + myLibrary.length);

}

Book.prototype.toggleIsReadStatus = function(){
  if (!this.isRead){
    this.isRead = true;
  } else if (this.isRead){
    this.isRead = false;
  }
} 

// DEBUG
// console.log("Hello");
//populate & print
addBookToLibrary("Author One", "Hello title one", 310, true, "1 this is a comment")
addBookToLibrary("Author Two", "Hello title two", 3200, false, "2 this is a comment")
addBookToLibrary("Author three", "Hello title three", 3300, true, "3 this is a comment")
addBookToLibrary("Author four", "Hello title four", 340, false, "4 this is a comment")
addBookToLibrary("Author five", "Hello title five", 350, true, "5 this is a comment")
console.log(myLibrary);