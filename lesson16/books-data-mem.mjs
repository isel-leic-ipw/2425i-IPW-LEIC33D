/**
 * Manages all books data with its storage in memory
 */


let idNextBook = 0

function Book(title, isbn, userId) {
    this.id = ++idNextBook
    this.title = title
    this.isbn = isbn
    this.updateCount = 0
    this.ownerId = userId
}


const BOOKS = [
    new Book("Book1", 1111111),
    new Book("Book2", 2222222),
    new Book("Book3", 3333333),
    new Book("Book4", 4444444),
]


export function getBooks(userId) {
    return Promise.resolve(BOOKS.filter(b => b.ownerId == userId ))
}

export function addBook(userId, bookCreator) {
    const newBook = new Book(bookRepresentation.title, bookRepresentation.isbn, userId)
    BOOKS.push(newBook)
    return Promise.resolve(newBook)
}

export function getBook(bookId) {
    return Promise.resolve(BOOKS.find(b => b.id == bookId))
}
