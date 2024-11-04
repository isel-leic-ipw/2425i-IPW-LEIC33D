/**
 * This file contains all HTTP API handling functions
 */

import * as booksService from './books-service.mjs'

export async function getBooks(req, rsp) {
    // rsp.type('application/json')
        // .send(JSON.stringify(BOOKS))
    // const allBooks = await booksService.getBooks()
    // req.json(allBooks)

    booksService.getBooks()
        .then(allBooks => req.json(allBooks))
    
    
}

export function addBook(req, rsp) {
    let bookRepresentation = req.body
    booksService
        .addBook(bookRepresentation)
        .then(newBook => { 
            rsp.status(201).send({
                description: `Book created`,
                uri: `/api/books/${newBook.id}`
            })
        } )
        .catch(e => 
            badRequest(rsp)
        )
    return
}


export async function addBookAw(req, rsp) {
    let bookRepresentation = req.body
    try  {
        const newBook = await booksService.addBook(bookRepresentation)
        rsp.status(201).send({
            description: `Book created`,
            uri: `/api/books/${newBook.id}`
        })
    } catch(e) {
            badRequest(rsp)
    }
}

export function getBook(req, rsp) {
    const bookId = req.params.bookId
    const book = BOOKS.find(b => b.id == bookId)
    if(book) {
        rsp.json(book)
        return
    } 
    // Book not found. Inform the client
    bookNotFound(rsp, bookId)
}

export function updateBook(req, rsp) {
    const bookRepresentation = req.body
    const bookId = req.params.bookId 
    const book = BOOKS.find(b => b.id == bookId)
    if(book) {
        if(bookRepresentation.title && bookRepresentation.isbn) {
            book.title = bookRepresentation.title
            book.isbn = bookRepresentation.isbn
            book.updateCount++
            rsp.json({ message: `Book with id ${bookId} updated` })

            return
    
        } else {
            badRequest(rsp, bookId)
        }
    }
    bookNotFound(rsp, bookId)
}

export function deleteBook(req, rsp) {
    const bookId = req.params.bookId
    const idxToRemove = BOOKS.findIndex(b => b.id == bookId)
    if(idxToRemove != -1) {
        BOOKS.splice(idxToRemove, 1)
        rsp.json({ message: `Book with id ${bookId} deleted` })
        return
    }
    bookNotFound(rsp, bookId)
}

///////// Auxiliary functions


function bookNotFound(rsp, bookId) {
    sendStatusResponse(rsp, 404, `Book with id ${bookId} not found`)
}

function badRequest(rsp, bookId) {
    sendStatusResponse(rsp, 400, `Bad request for adding/updating book wit id ${bookId}`)
}

function sendStatusResponse(rsp, status, message) {
    rsp.status(status)
        .json({
            message: message
        })
}