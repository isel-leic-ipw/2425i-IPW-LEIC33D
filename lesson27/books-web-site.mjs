// Module responsibilities
// This file contains all HTTP Web Site handling functions.
//

import express from 'express'


import errosMapping from './application-to-http-erros.mjs'

const BOOKS = '/books'
const BOOK = `${BOOKS}/:bookId`


const RESOURCES_WEB_SITE = {
    // Resource URI that represents ALL Books
    BOOKS: BOOKS,    
    // Resource URI that represents ONE Book
    BOOK: BOOK,
    // Resource URI that represents a HTML form to create a book
    BOOK_CREATE: `${BOOKS}/form-creator`,
    // Resource URI that represents a HTML form to update/edit a book
    BOOK_EDIT: `${BOOK}/form-editor`,
    // Resource URI that represents to delete a Book
    BOOK_DELETE: `${BOOK}/delete`
}

export default function(services) {
    const router = express.Router()

    router.get(RESOURCES_WEB_SITE.BOOKS, handlerWrapper(getBooks))
    // router.post(RESOURCES_WEB_SITE.BOOKS, handlerWrapper(addBook))
    // router.get(RESOURCES_WEB_SITE.BOOK_CREATE, getFormCreate)
    // router.get(RESOURCES_WEB_SITE.BOOK_EDIT, getFormEditor)
    router.get(RESOURCES_WEB_SITE.BOOK, handlerWrapper(getBook))
    // router.post(RESOURCES_WEB_SITE.BOOK, updateBook)
    router.post(RESOURCES_WEB_SITE.BOOK_DELETE, handlerWrapper(deleteBook))
    
    return router


    function setUserToken(req) {
        // Hammer time. Frankenstein here gets even uglier....
        req.user = {
            name: 'Bob o Construtor', 
            email: 'bob@construrtor.pt',
            token: 'c176eafd-25eb-45d3-a8cb-7218f3d63b3b'
        }
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
        const books = await services.getBooks(req.user.token)
        resp.render('books', { username: req.user.name, books: books})
    }

    async function getBook(req, resp) {
        const book = await services.getBook(req.params.bookId, req.user.token)
        resp.render('book', book)
    }

    async function updateBook(req, resp) {  
        await services.updateBook(req.token, req.params.id, req.body.name, req.body.description)
    }

    async function addBook(req, resp) {
        resp.status(201)
        return await services.createBook(req.token, req.body.name, req.body.description)
    }

    async function deleteBook(req, resp) {
        await services.deleteBook(req.params.bookId, req.user.token)
        //resp.status(302).set("Location", "/site/books").end()
        resp.redirect("/site/books")
    }
}