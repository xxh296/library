const myLibrary = [];
const dataTable = document.querySelector(".data-table");
const dataForm = document.querySelector(".data-form");
const modalCloseButton = document.querySelector("#modal-close");
const addButton = document.querySelector("#addButton");

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
modalCloseButton.addEventListener("click", () => {
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
  
  addBookToLibrary(author, title, pages, isRead, comment);
  
  document.querySelector("#data-inputs").reset();
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
  // return myLibrary;
}

function removeBookFromLibrary(bookNum){

  //DEBUG
  // console.log("myLibrary.lenth === " + myLibrary.length);

    const indexToRemove = myLibrary.findIndex(i => i.bookId === bookNum);
    if (indexToRemove !== -1){
      myLibrary.splice(indexToRemove, 1);
    }

    populate();

    //DEBUG
    // console.log(myLibrary);
    // console.log("myLibrary.lenth === " + myLibrary.length);

}

Book.prototype.toggleIsReadStatus = function(){
  if (!this.isRead){
    this.isRead = true;
  } else if (this.isRead){
    this.isRead = false;
  }
  populate();black
} 

function populate(){
  if (myLibrary.length){
    // the table needs to be repopulated after a change
    const elementsToRemove = document.querySelectorAll('.data-table div:not(.table-title)');
    elementsToRemove.forEach(element => {
      element.remove();
    });
    
    // append myLibrary items to .data-table

    // for (let i = 0; i < myLibrary.length; i++) {
    //   const dataPieceDiv0 = document.createElement("div");
    //   dataPieceDiv0.textContent = myLibrary[i].author;
    //   dataTable.appendChild(dataPieceDiv0);

    //   const dataPieceDiv1 = document.createElement("div");
    //   dataPieceDiv1.textContent = myLibrary[i].title;
    //   dataTable.appendChild(dataPieceDiv1);

    //   const dataPieceDiv2 = document.createElement("div");
    //   dataPieceDiv2.textContent = myLibrary[i].pages;
    //   dataTable.appendChild(dataPieceDiv2);

    //   const dataPieceDiv3 = document.createElement("div");
    //   dataPieceDiv3.textContent = myLibrary[i].isRead;
    //   dataTable.appendChild(dataPieceDiv3);

    //   const dataPieceDiv4 = document.createElement("div");
    //   dataPieceDiv4.textContent = myLibrary[i].comment;
    //   dataTable.appendChild(dataPieceDiv4);      
    // }

    for (let i = 0; i < myLibrary.length; i++) {
      const dataPieces = [
        i + 1 + ".",
        myLibrary[i].author,
        myLibrary[i].title,
        myLibrary[i].pages,
        myLibrary[i].isRead,
        myLibrary[i].comment
      ];
    
      // Loop through the data pieces and create the divs dynamically
      dataPieces.forEach((dataPiece) => {
        const dataPieceDiv = document.createElement("div");
        dataPieceDiv.textContent = dataPiece;
        dataTable.appendChild(dataPieceDiv);
      });
    }
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
populate();