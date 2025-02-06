const myLibrary = [];
const dataTable = document.querySelector(".data-table");
const dataForm = document.querySelector(".data-form");
const closeLink = document.querySelector("#close-link");
const addButton = document.querySelector("#addButton");
const errorMessage = document.querySelector(".error-message");

// create and add the button
const topContainer = document.querySelector(".top-container");
const addBookButton = document.createElement("button");
addBookButton.innerText = "add a book";
topContainer.appendChild(addBookButton);

// replace the button with the form
addBookButton.addEventListener("click", () => {
  addBookButton.remove();
  dataForm.style.display = "grid";
});

// close the form, show the "add a book" button
closeLink.addEventListener("click", () => {
  errorMessage.style.display = "none";
  dataForm.style.display = "none";  
  topContainer.appendChild(addBookButton);
});

// add form data to myLibrary array
addButton.addEventListener("click", () => {
  const author = document.querySelector("#input-author").value;
  const title = document.querySelector("#input-title").value;
  const pages = document.querySelector("#input-pages").value;
  const isRead = document.querySelector("input[name='isRead']:checked")?.value;
  const comment = document.querySelector("#textarea-comment").value;

  if (!author||!title||!pages||!isRead){    
    errorMessage.style.display = "block";
    return "Please fill out all required (*) fields."
  }
  
  addBookToLibrary(author, title, pages, isRead, comment);
  
  document.querySelector("#data-inputs").reset();
  errorMessage.style.display = "none";
});


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

  populate();
}

function removeBookFromLibrary(bookNum){
    const indexToRemove = myLibrary.findIndex(i => i.bookId === bookNum);
    if (indexToRemove !== -1){
      myLibrary.splice(indexToRemove, 1);
    }

    // if library is empty, remove any remaining boods from UI
    if (!myLibrary.length){
      const elementsToRemove = document.querySelectorAll('.data-table div:not(.table-title)');
      elementsToRemove.forEach(element => {
        element.remove();
      });
    }

    populate();
}

Book.prototype.toggleIsReadStatus = function(){
  if (!this.isRead){
    this.isRead = true;
  } else if (this.isRead){
    this.isRead = false;
  }
  populate();
} 


function regenerateBookId(){
  // old book Id's need to be updated when an object is removed
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].bookId = i + 1; 
  }
}

function populate(){
  if (myLibrary.length){
    // the table needs to be repopulated after a change
    const elementsToRemove = document.querySelectorAll('.data-table div:not(.table-title)');
    elementsToRemove.forEach(element => {
      element.remove();
    });

    regenerateBookId();

    for (let i = 0; i < myLibrary.length; i++) {
      const dataPieces = [
        i + 1 + ".",
        myLibrary[i].author,
        myLibrary[i].title,
        myLibrary[i].pages,
        myLibrary[i].isRead,
        myLibrary[i].comment,
        "remove"
      ];
    
      // loop through the data pieces 
      // and create the divs dynamically
      dataPieces.forEach((dataPiece, j) => {
        const dataPieceDiv = document.createElement("div");
    
        // check if the current data piece is `isRead` 
        // and create a clickable link
        if (j === 4 || j === 6) { 
          const link = document.createElement("a");
          link.href = "javascript:void(0)"; // Prevent link navigation
          link.textContent = dataPiece; 
          if (j === 4){
            link.onclick = function() {
            myLibrary[i].toggleIsReadStatus(); 
            };
          } else {
            link.onclick = function() {
              removeBookFromLibrary(i + 1);
            }
          }

          dataPieceDiv.appendChild(link); 
        } else {
          dataPieceDiv.textContent = dataPiece; 
        }
    
        dataTable.appendChild(dataPieceDiv); 
      });
    }    
  }
}

// DEBUG
//populate
addBookToLibrary("Author One", "Hello title one", 310, true, "1 this is a comment")
addBookToLibrary("Author Two", "Hello title two", 3200, false, "2 this is a comment")
addBookToLibrary("Author three", "Hello title three", 3300, true, "3 this is a comment")
addBookToLibrary("Author four", "Hello title four", 340, false, "4 this is a comment")
addBookToLibrary("Author five", "Hello title five", 350, true, "5 this is a comment")
console.log(myLibrary);
populate();