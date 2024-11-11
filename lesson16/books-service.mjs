/**
 * Implements all Books handling logic 
 */

import * as booksData from './books-data-mem.mjs'


function InvalidData(message) {
    this.message = message
}

export  function getBooks(userId) {
    return booksData.getBooks(userId);
}

export function addBook(userId, bookCreator) {
    if(bookCreator.title && bookCreator.isbn) {
        booksData.addBook(userId, bookCreator)    
    }
    Promise.reject(new InvalidData(`Books creation must have a title and isbn`))
}

export function getBook(userId, bookId) {
    // Validate BookId - TO DO
    return booksData.getBook(bookId)
        .then(book => {
            if(!book || book.userId != userId) {
                return Promise.reject("Book not found")
            }
            return book
        })

}

// export async function addBook(bookCreator) {
//     if(bookCreator.title && bookCreator.isbn) {
//         const newBook = new Book(bookRepresentation.title, bookRepresentation.isbn)
//         BOOKS.push(newBook)
//         return newBook
//     }
//     throw InvalidData(`Books creation must have a title and isbn`))
// }