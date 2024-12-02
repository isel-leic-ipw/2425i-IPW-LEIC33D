/**
 * Implements all Books data access, stored in elastic search 
 */

import errors from '../errors.mjs'


function Book(id, title, isbn, ownerId) {
    this.id = id
    this.title = title
    this.isbn = isbn
    this.ownerId = ownerId
}

const URI_PREFIX = 'http://localhost:9200/'
const INDEX = 'books1'


export function getBooks(userId) {
    const uri = `${URI_PREFIX}${INDEX}/_search`
    return fetch(uri)
        .then(res => res.json())
        .then(elObj => {
            console.log(elObj)
            return elObj.hits.hits.map(d => new Book(d._id, d._source.title, d._source.isbn, d._source.ownerId) )
            
        })
}

export function createBook(bookCreator, userId) {
    const newBook = new Book(bookCreator.title, bookCreator.isbn, userId)
    BOOKS.push(newBook)
    return Promise.resolve(newBook)
}

export function getBook(bookId) {
    const book = BOOKS.find(b => b.id == bookId)
    if(book) {
        return Promise.resolve(book)
    }
    return Promise.reject(errors.NOT_FOUND(`Book with id ${bookId} not found`))
}

export function updateBook(bookId, bookUpdater, userId) {
    const book = BOOKS.find(b => b.id == bookId)
    if(book) {
        book.title = bookUpdater.title
        book.isbn = bookUpdater.isbn
        return Promise.resolve(book)
    }
    return Promise.reject(errors.NOT_FOUND(`Book with id ${bookId} not found`))
}

export function deleteBook(bookId) {
    const idxToRemove = BOOKS.findIndex(b => b.id == bookId)
    if(idxToRemove != -1) {
        BOOKS.splice(idxToRemove, 1)
        return Promise.resolve(bookId)
    }
    return Promise.reject(errors.NOT_FOUND(`Book with id ${bookId} not found`))
}



