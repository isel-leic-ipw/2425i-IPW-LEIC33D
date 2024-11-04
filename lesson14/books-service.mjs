/**
 * Implements all Books handling logic and manage books data
 */


let idNextBook = 0

function Book(title, isbn) {
    this.id = ++idNextBook
    this.title = title
    this.isbn = isbn
    this.updateCount = 0
}


const BOOKS = [
    new Book("Book1", 1111111),
    new Book("Book2", 2222222),
    new Book("Book3", 3333333),
    new Book("Book4", 4444444),
]

function InvalidData(message) {
    this.message = message
}

export  function getBooks() {
    return Promise.resolve(BOOKS)
}

export function addBook(bookCreator) {
    if(bookCreator.title && bookCreator.isbn) {
        const newBook = new Book(bookRepresentation.title, bookRepresentation.isbn)
        BOOKS.push(newBook)
        return Promise.resolve(newBook)
    }
    Promise.reject(new InvalidData(`Books creation must have a title and isbn`))
}

export async function addBook(bookCreator) {
    if(bookCreator.title && bookCreator.isbn) {
        const newBook = new Book(bookRepresentation.title, bookRepresentation.isbn)
        BOOKS.push(newBook)
        return newBook
    }
    throw InvalidData(`Books creation must have a title and isbn`))
}