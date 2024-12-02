/**
 * Configures the express HTTP application (including routes and middlewares)
 */

import express from 'express'

import * as usersData from './data/users-data-mem.mjs'
//import * as booksData from './data/books-data-mem.mjs'
import * as booksData from './data/books-data-es.mjs'
import booksServiceInit from './books-service.mjs'
import apiInit from './books-api.mjs' 

const booksService = booksServiceInit(booksData, usersData)
const api = apiInit(booksService)


console.log("Server-config loaded")

export default function(app) {
    app.use(express.json())
    app.use(countReq, showRequestData)
    app.use(api.extractToken)

    // Web Application Resources URIs
    const RESOURCES = {
        BOOKS: '/api/books',
        BOOK: '/api/books/:bookId'
    }

    // Web Application Routes
    
    app.get(RESOURCES.BOOKS, api.getBooks)
    app.post(RESOURCES.BOOKS, api.addBook)

    app.get(RESOURCES.BOOK, api.getBook)
    app.put(RESOURCES.BOOK, api.updateBook)
    app.delete(RESOURCES.BOOK, api.deleteBook)

    let count = 1
    function countReq(req, rsp, next) {
        console.log(`Number of requests: ${count++}`)
        next()
    }

    function showRequestData(req, rsp, next) {
        console.log(`Request method: ${req.method}`)
        console.log(`Request uri: ${req.originalUrl}`)
        next()
    }

}

