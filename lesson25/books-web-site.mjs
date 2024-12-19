// Module responsibilities
// This file contains all HTTP Web Site handling functions.
//

import express from 'express'


import handleError from './http-errors.mjs'

export default function(services) {
    const app = expres.Router()

    app.get('/books', handlerWrapper(getBooks))           // Get all books
    app.get('/books/:id', handlerWrapper(getBook))        // Get a book details
    app.delete('/books/:id', handlerWrapper(deleteBook))  // Delete a book
    app.put('/books/:id', handlerWrapper(updateBook))     // Update a book
    app.post('/books', handlerWrapper(createBook))        // Delete a book

    return app


    function setUserToken(req) {
        // Hammer time. Frankenstein here gets even uglier....
        req.token = '0b115b6e-8fcd-4b66-ac26-33392dcb9340'
    }
    


    function handlerWrapper(handler) {
        return async function(req, rsp) {
            setUserToken(req)
            console.log(req.token)
            try {
                handler(req, rsp)
            } catch(e) {
               const error = handleError(e) 
               rsp.status(error.status).json(error.body)
            }    
        }
    }

    async function getBooks(req, resp) {
        const books = await services.getBooks(req.token)
        resp.render('books', {g: books})
    }

    async function getBook(req, resp) {
        const book = await services.getBook(req.token, req.params.id)
        resp.render('book', book)
    }

    async function updateBook(req, resp) {  
        await services.updateBook(req.token, req.params.id, req.body.name, req.body.description)
    }

    async function createBook(req, resp) {
        resp.status(201)
        return await services.createBook(req.token, req.body.name, req.body.description)
    }

    async function deleteBook(req, resp) {
        await services.deleteBook(req.token, req.params.id)
    }
}