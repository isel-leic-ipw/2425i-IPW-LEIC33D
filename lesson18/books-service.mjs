/**
 * Implements all Books handling logic
 */


import errors from './errors.mjs'
import * as booksData from './books-data-mem.mjs'

/**
 * 
 * @returns Returns A Promise resolved with an array, with all books
 */
export function getBooks(userId) {
    return booksData.getBooks(userId)
}

/**
 * Create a new Book, given a creator object
 * 
 * @param {*} bookCreator - The object with the initial data to create a Book
 * @returns a Promise resolved with the created book
 */
export function createBook(bookCreator, userId) {
    // Validate if user exists - TODO
    if(bookCreator.title && bookCreator.isbn) {
        return booksData.createBook(bookCreator, userId)
    }
    return Promise.reject(errors.INVALID_DATA(`To create a Book, a title and isbn must be provided`))
}

export function getBook(bookId, userId) {
    return booksData.getBook(bookId)
        .then(book => {
            if(book.ownerId == userId)
                return book
            return Promise.reject(errors.NOT_AUTHORIZED(`User with id ${userId} does not own book with id ${bookId}`));
        
        })    
}

export function updateBook(bookId, bookUpdater, userId) {
    
    if(bookUpdater.title && bookUpdater.isbn) {
        return booksData.updateBook(bookId, bookUpdater, userId)       
    } else {
        return Promise.reject(errors.INVALID_DATA(`To update a Book, a title and isbn must be provided`))
    }
}

export function deleteBook(bookId, userId) {
    return booksData.getBook(bookId)
        .then(book => {
            if(book.id == userId)
                return booksData.deleteBook(bookId)
            return Promise.reject(errors.NOT_AUTHORIZED(`User with id ${userId} does not own book with id ${bookId}`));
        
        })    
}