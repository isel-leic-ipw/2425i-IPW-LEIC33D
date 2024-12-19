/**
 * This file contains all HTTP API handling functions.
 */

import express from 'express'

import errosMapping from './application-to-http-erros.mjs'
import { isGuid } from 'is-guid'
import errors from './errors.mjs'


const RESOURCES_API = {
    // Resource URI that represents ALL Books
    BOOKS: '/books',    
    // Resource URI that represents ONE Book
    BOOK: '/books/:bookId'
}

export default function(booksService) {
    if(!booksService) {
        throw "Invalid service provided"
    }

    const router = express.Router()
    router.use('/*', extractToken)

    router.get(RESOURCES_API.BOOKS, createHandler(getBooks))
    router.post(RESOURCES_API.BOOKS, createHandler(addBook))
    router.get(RESOURCES_API.BOOK, createHandler(getBook))
    router.put(RESOURCES_API.BOOK, createHandler(updateBook))
    router.delete(RESOURCES_API.BOOK, createHandler(deleteBook))
    
    return router
    
    
    function getBooks(req, rsp) {
        return booksService.getBooks(req.token).then(
            books => rsp.json(books)
        )
    }
    
    function addBook(req, rsp) {
        let bookRepresentation = req.body
    
        return booksService.createBook(bookRepresentation, req.token).then(
            book => rsp.status(201).json({
                description: `Book created`,
                uri: `/api/books/${book.id}`
            })
        )
    }
    
    function getBook(req, rsp) {
        const bookId = req.params.bookId
        const userToken = req.token
    
        return booksService.getBook(bookId, userToken).then(
            book => rsp.json(book)
        )
    }
    
    function updateBook(req, rsp) {
        const bookRepresentation = req.body
        const bookId = req.params.bookId
        const userToken = req.token
    
    
        return booksService.updateBook(bookId, bookRepresentation, bookId, userToken)
            .then(book => rsp.json({ message: `Book with id ${bookId} updated` })
            )
    }
    
    function deleteBook(req, rsp) {
        const bookId = req.params.bookId
        const userToken = extractToken(req)
    
        return booksService.deleteBook(bookId, userToken).then(
            bookId => rsp.json({ message: `Book with id ${bookId} deleted` })
        )
    }
    
    ///////// Auxiliary functions
    
    
    function createHandler(specificFunction) {
        return function (req, rsp, next) {
            const promiseResult = specificFunction(req, rsp)
    
            promiseResult
                .catch(error => sendError(rsp, error))
        }
    }
    
    function sendError(rsp, appError) {
        const httpError = errosMapping(appError)
        rsp.status(httpError.status).json(httpError.body)
    }
    
    
    function extractToken(req, rsp, next) {
        console.log("extract token called")
        const authHeader = req.get("Authorization")
        if (authHeader) {
            const authHeaderParts = authHeader.split(" ")
            if (authHeaderParts.length == 2 && authHeaderParts[0] == "Basic" && isGuid(authHeaderParts[1])) {
                const token = authHeaderParts[1]
                if (token) {
                    req.token = token
                    return next()
                }
            }
        }
    
        sendError(rsp, errors.INVALID_DATA(`Token is required to use this API`))
    
    }
}

