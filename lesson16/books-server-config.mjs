/**
 * Configures the express HTTP application (including routes and middlewares)
 */

import express from 'express'
import * as api from './books-api.mjs' 

export default function(app) {
    app.use(express.json())

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
}

