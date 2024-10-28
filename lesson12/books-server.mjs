/**
 * Configures books api routes, and starts HTTP server
 */

import express from 'express'
import * as api from './books-api.mjs'
const app = express()

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


const PORT = 1904
app.listen(PORT)
console.log(`Server listening on port ${1904}`)



