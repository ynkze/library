let myLibrary = [];
const display=document.querySelector("#book-display");
const card=document.querySelector(".card");
let id = 0;
id = localStorage.getItem("id"); // if there is an id in storage, get it

// on first visit, set id and initialize default books
if (id==null){
    id = 0;

    const book1 = new Book("The Hobbit", "J.R.R. Tolkien", "318", false, 1);
    myLibrary.push(book1);
    id++;
    localStorage.setItem(`${id}`, JSON.stringify(book1));

    const book2 = new Book("Atomic Habits", "James Clear", "320", true, 2);
    myLibrary.push(book2);
    id++;
    localStorage.setItem(`${id}`, JSON.stringify(book2));

    const book3 = new Book("The Laws Of Human Nature", "Robert Greene", "624", false, 3);
    myLibrary.push(book3);
    id++;
    localStorage.setItem(`${id}`, JSON.stringify(book3));

    localStorage.setItem("id", `${id}`);
}

//get local storage books and display
for(var i =0; i < localStorage.length; i++){
    //ignore id key
    if (localStorage.key(i)=="id"){
        continue;
    }
    let storedBook=JSON.parse(localStorage.getItem(localStorage.key(i)));
    displayBook(storedBook);
}

class Book{
    constructor(title, author, pages, read, id){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.id = id;
    }
}

function addBookToLibrary(){

    //create new book object in array
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;
    
    id++;
    //increase storage id
    localStorage.setItem("id", `${id}`);
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
    //store book in local storage
    localStorage.setItem(`${id}`, JSON.stringify(book));
    displayBook(book);
}

function displayBook(book){

    //clone card template and make it visible
    let clone = card.cloneNode(true);
    clone.style.position="static";

    //set attribute to id
    clone.setAttribute("data-index", `${id}`);

    //display the input info 
    let displayTitle = clone.querySelector(".title");
    displayTitle.textContent = "'" + book.title + "'";
    let displayAuthor = clone.querySelector(".author");
    displayAuthor.textContent += book.author;
    let displayPages = clone.querySelector(".pages");
    displayPages.textContent = book.pages + " pages";

    const readStatus = clone.querySelector("#toggleRead");
    if (book.read){
        readStatus.innerHTML="<i class=\"fas fa-book\"></i> Read";
        readStatus.style.backgroundColor = "green";
    }
    else {
        readStatus.innerHTML="<i class=\"fas fa-book-open\"></i> Not Read";
        readStatus.style.backgroundColor = "red";
    }

    //remove button
    const removeBook = clone.querySelector("#remove");
    removeBook.addEventListener("click", function removeBook(){
        //find index of deleted book and remove from array
        let index = myLibrary.findIndex(book=> book.id == clone.getAttribute("data-index"));
        myLibrary.splice(index, 1);
        display.removeChild(clone);
        console.log(localStorage.removeItem(`${book.id}`));
    });

    //toggle read status
    readStatus.addEventListener("click", ()=>{
        book.read = !book.read;
        //save read status to localstorage
        localStorage.setItem(book.id, JSON.stringify(book)); 
        console.log(book.id)
        if (book.read){
            readStatus.innerHTML="<i class=\"fas fa-book\"></i> Read";
            readStatus.style.backgroundColor = "green";
        }
        else {
            readStatus.innerHTML="<i class=\"fas fa-book-open\"></i> Not Read";
            readStatus.style.backgroundColor = "red";
        }
    });

    display.appendChild(clone);
}

//submit button
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

//close function
let close = document.getElementById("close");
close.onclick = () => {
    modal.style.display="none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
