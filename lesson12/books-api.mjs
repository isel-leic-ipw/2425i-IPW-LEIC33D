/**
 * This file contains all HTTP API handling functions, and all data handling
 */

let idNextBook = 0

function Book(title, isbn) {
    this.id = ++idNextBook
    this.title = title
    this.isbn = isbn
}


const BOOKS = [
    new Book("Book1", 1111111),
    new Book("Book2", 2222222),
    new Book("Book3", 3333333),
    new Book("Book4", 4444444),
]

export function getBooks(req, rsp) {
    // rsp.type('application/json')
        // .send(JSON.stringify(BOOKS))
    rsp.json(BOOKS)
}

export function addBook(req, rsp) {
    rsp.send('Post to books called')
}

export function getBook(req, rsp) {
    const book = BOOKS.find(b => b.id == req.params.bookId)
    rsp.json(book)
}

export function updateBook(req, rsp) {
    rsp.send(`Put book with id ${req.params.bookId} called`)
}

export function deleteBook(req, rsp) {
    const bookId = req.params.bookId
    const idxToRemove = BOOKS.findIndex(b => b.id = bookId)
    BOOKS.splice(idxToRemove, 1)
    rsp.json({ message: `Book with id ${bookId} deleted` })
}