let bookArray = [];
const bookList = document.querySelector(".book-container");
const dialog = document.getElementById("new-book-dialog");
const showButton = document.querySelector(".add-new");
const addBookBtn = document.querySelector("#submit");
const form = document.querySelector("#form");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#book_title");
    const author = document.querySelector("#book_author");
    const pages = document.querySelector("#book_pages");
    const isRead = document.querySelector("#book_read");

    addNewBook(title.value, author.value, pages.value, isRead.checked);
    form.reset();
    dialog.close()
});

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    changeReadStatus() {
        this.read = !this.read;
    }
}

function addNewBook(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    bookArray.push(book);
    updateBookList();
}

function updateBookList() {
    bookList.innerHTML = "";

    for (const book of bookArray) {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book-card";
        bookDiv.dataset.bookId = book.id;

        bookDiv.innerHTML = `
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">${book.pages}</div>
            <div class="read-status">${book.read ? "Yes" : "No"}</div>
            <button class="change-btn">${book.read ? "MARK UNREAD" : "MARK READ"}</button>
            <button class="del-book-btn">DELETE</button>
        `;

        const changeReadBtn = bookDiv.querySelector(".change-btn");
        const readStatusDiv = bookDiv.querySelector(".read-status");
        changeReadBtn.addEventListener("click", () => {
            book.changeReadStatus();
            changeReadBtn.textContent = book.read ? "MARK UNREAD" : "MARK READ";
            readStatusDiv.textContent = book.read ? "Yes" : "No";
        });

        const delBtn = bookDiv.querySelector(".del-book-btn");
        delBtn.addEventListener("click", () => {
            const index = bookArray.findIndex(b => b.id === book.id);
            if (index !== -1) {
                bookArray.splice(index, 1);
                updateBookList();
            }
        });

        bookList.appendChild(bookDiv);
    }
}
