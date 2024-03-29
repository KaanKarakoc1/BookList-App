//Classes

class Book{
    constructor(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
    }
}

class UI{


    static display(){
        const books = Store.getBooks();
        books.forEach(books=>UI.addBook(books));
    }

    static addBook(book){
        const bookList = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML= `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td id='isbn'>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`
        bookList.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>document.querySelector('.alert').remove(),3000)
    }


    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
}
//Storage
class Store{

    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books =JSON.parse(books=localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index)=>{
        if(book.isbn===isbn){
            books.splice(index,1);
        }
    });
    localStorage.setItem('books',JSON.stringify(books));
    }
}

//Events
document.addEventListener('DOMContentLoaded',UI.display);

//Add
document.querySelector('#book-form').addEventListener('submit',(e)=>{
e.preventDefault();
const title= document.querySelector('#title').value;
const author= document.querySelector('#author').value;
const isbn= document.querySelector('#isbn').value;

if(title===''||author===''||isbn===''){
    UI.showAlert('Fill in all fields','danger');
    }else{
    const book = new Book(title,author,isbn);
    UI.addBook(book);
    Store.addBook(book);
    UI.showAlert('Fill in all fields','success');
    UI.clearFields();
    }
});

//Delete
document.querySelector('#book-list').addEventListener('click',(e)=>{
UI.deleteBook(e.target);

let x =e.target.parentElement.previousElementSibling;
let y = e.target.parentElement.previousElementSibling.textContent;
Store.removeBook(y);
console.log(x);
console.log(y);
UI.showAlert('Book removed','green');
});