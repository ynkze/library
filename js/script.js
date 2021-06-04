let myLibrary = [];
const display=document.querySelector("#book-display");
const card=document.querySelector(".card");


function Book(title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(){

    //create new book object in array
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBook(title, author, pages, read);
}

function displayBook(title, author, pages, read){

    //clone card template and make it visible
    let clone = card.cloneNode(true);
    clone.style.position="static";

    //set attribute to array number
    clone.setAttribute("data-index", `${myLibrary.length}`);

    //display the input info 
    let displayTitle = clone.querySelector(".title");
    displayTitle.textContent += " "+title;
    let displayAuthor = clone.querySelector(".author");
    displayAuthor.textContent += " "+author;
    let displayPages = clone.querySelector(".pages");
    displayPages.textContent += " "+pages;
    let displayRead = clone.querySelector(".read");

    //display read message depending on if the book is read
    if (read){
        displayRead.textContent += " Completed";
    }
    else {
        displayRead.textContent += " Not yet completed";
    }

    //remove button
    const removeBook = clone.querySelector("#remove");
    removeBook.addEventListener("click", function removeBook(){
        let index = this.parentNode.getAttribute("data-index");
        console.log(index);
        myLibrary.splice(index-1,1);
        console.log(myLibrary);
        display.removeChild(clone);
    });

    //edit info

    //toggle read status
    const readStatus = clone.querySelector("#toggleRead");
    readStatus.addEventListener("click", ()=>{

    })


    display.appendChild(clone);
}

//submit
const submit = document.querySelector("#submit");
submit.addEventListener("click", ()=> {
    addBookToLibrary();
    modal.style.display = "none";
})

//modal
let modal = document.getElementById("myModal");
let newBook = document.getElementById("newBook");
newBook.onclick = function(){
    modal.style.display = "block";
};

//

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


