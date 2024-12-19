/**
 * Implements all Books data access, stored in elastic search 
 */

import errors from '../errors.mjs'


export default function (index = 'books') {
    const URI_PREFIX = 'http://localhost:9200/'

    return {
        getBooks,
        getBook,
        createBook,
        updateBook,
        deleteBook
    }
    
    function Book(id, title, isbn, ownerId) {
        this.id = id
        this.title = title
        this.isbn = isbn
        this.ownerId = ownerId
    }
    
    function getBooks(userId) {
        const uri = `${URI_PREFIX}${index}/_search`
        return fetch(uri)
            .then(res => res.json())
            .then(elObj => {
                return elObj.hits.hits.map(d => new Book(d._id, d._source.title, d._source.isbn, d._source.ownerId))

            })
    }


    function createBook(bookCreator, userId) {
        const newBook = new Book(bookCreator.title, bookCreator.isbn, userId)
        BOOKS.push(newBook)
        return Promise.resolve(newBook)
    }

    function getBook(bookId) {
        const book = BOOKS.find(b => b.id == bookId)
        if (book) {
            return Promise.resolve(book)
        }
        return Promise.reject(errors.NOT_FOUND(`Book with id ${bookId} not found`))
    }

    function updateBook(bookId, bookUpdater, userId) {
        const book = BOOKS.find(b => b.id == bookId)
        if (book) {
            book.title = bookUpdater.title
            book.isbn = bookUpdater.isbn
            return Promise.resolve(book)
        }
        return Promise.reject(errors.NOT_FOUND(`Book with id ${bookId} not found`))
    }

    function deleteBook(bookId) {
        const idxToRemove = BOOKS.findIndex(b => b.id == bookId)
        if (idxToRemove != -1) {
            BOOKS.splice(idxToRemove, 1)
            return Promise.resolve(bookId)
        }
        return Promise.reject(errors.NOT_FOUND(`Book with id ${bookId} not found`))
    }

}

