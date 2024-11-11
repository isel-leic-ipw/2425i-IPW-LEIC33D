/**
 * This file contains all HTTP API handling functions.
 */

import * as booksService from './books-service.mjs'
import errosMapping from './application-to-http-erros.mjs'


// export async function getBooks(req, rsp) {
//     // rsp.type('application/json')
//         // .send(JSON.stringify(BOOKS))
//     let books = await booksService.getBooks()
//     rsp.json(books)
// }

export function getBooks(req, rsp) {
    const userId = getUserId(req)
    // rsp.type('application/json')
        // .send(JSON.stringify(BOOKS))
    booksService.getBooks(userId)
        .then(books => rsp.json(books))
}

export function addBook(req, rsp) {
    const userId = getUserId(req)
    let bookRepresentation = req.body

    booksService.createBook(bookRepresentation, userId)
        .then(book => rsp.status(201).send({
            description: `Book created`,
            uri: `/api/books/${book.id}`
        }))
        .catch(error => sendError(error, rdp))
}

export async function getBook(req, rsp) {
    const bookId = req.params.bookId
    const userId = getUserId(req)

    booksService.getBook(bookId, userId)
        .then(book => rsp.json(book))
        .catch(error => sendError(error, rsp))
}

export function updateBook(req, rsp) {
    const bookRepresentation = req.body
    const bookId = req.params.bookId 
    const userId = getUserId(req)
    
    booksService.updateBook(bookId, bookRepresentation, bookId, userId)
        .then(book => rsp.json({ message: `Book with id ${bookId} updated` }))
        .catch(error => sendError(error, rdp))

}

export function deleteBook(req, rsp) {
    const bookId = req.params.bookId
    const userId = getUserId(req)
    booksService.deleteBook(bookId, userId)
        .then(bookId => rsp.json({ message: `Book with id ${bookId} deleted` }))
        .catch(error => sendError(error, rdp))
}

///////// Auxiliary functions


function sendError(err, rsp) {
    const httpErr = errosMapping(err)
    rsp.status(httpErr.status).json(httpErr.error)
}

function getUserId(req) {
    // HAMMER TIME: This should be replaced by the proper code to get user id from request
    const fakeUserId = 1
    return fakeUserId
}