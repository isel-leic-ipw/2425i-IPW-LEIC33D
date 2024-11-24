/**
 * Implements all Books handling logic
 */


import errors from './errors.mjs'
import * as booksData from './data/books-data-es.mjs'
import * as usersData from './data/users-data-mem.mjs'


function changeUserTokenToUserIdArgument(internalFunction) {
    return function(...args) {
        const userToken = args.pop()
        return usersData.convertTokenToId(userToken)
                .then(userId => { 
                    args.push(userId)
                    return internalFunction.apply(this, args)
                })
    }
}

export const getBooks  = changeUserTokenToUserIdArgument(getBooksInternal)
export const getBook = changeUserTokenToUserIdArgument(getBookInternal)
export const updateBook = changeUserTokenToUserIdArgument(updateBookInternal)
export const createBook = changeUserTokenToUserIdArgument(createBookInternal)
export const deleteBook = changeUserTokenToUserIdArgument(deleteBookInternal)

/**
 * 
 * @returns Returns A Promise resolved with an array, with all books
 */
function getBooksInternal(userId) {
    return booksData.getBooks(userId)
}

/**
 * Create a new Book, given a creator object
 * 
 * @param {*} bookCreator - The object with the initial data to create a Book
 * @returns a Promise resolved with the created book
 */

function createBookInternal(bookCreator, userId) {
    // Validate if user exists - TODO
    if(bookCreator.title && bookCreator.isbn) {
        return booksData.createBook(bookCreator, userId)
    }
    return Promise.reject(errors.INVALID_DATA(`To create a Book, a title and isbn must be provided`))
}

function getBookInternal(bookId, userId) {
    return booksData.getBook(bookId)
        .then(book => {
            if(book.ownerId == userId)
                return book
            return Promise.reject(errors.NOT_AUTHORIZED(`User with id ${userId} does not own book with id ${bookId}`));
        
        })    
}

function updateBookInternal(bookId, bookUpdater, userId) {    
    if(bookUpdater.title && bookUpdater.isbn) {
        return booksData.updateBook(bookId, bookUpdater, userId)       
    } else {
        return Promise.reject(errors.INVALID_DATA(`To update a Book, a title and isbn must be provided`))
    }
}

function deleteBookInternal(bookId, userId) {
    return booksData.getBook(bookId)
        .then(book => {
            if(book.id == userId)
                return booksData.deleteBook(bookId)
            return Promise.reject(errors.NOT_AUTHORIZED(`User with id ${userId} does not own book with id ${bookId}`));
        
        })    
}