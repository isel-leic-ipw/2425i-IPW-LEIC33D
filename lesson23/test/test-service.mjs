import * as booksService from '../books-service.mjs'
import { USERS } from '../data/users-data-mem.mjs'  from '../data/users-data-mem.mjs'
//import assert from 'assert'

import * as chai from 'chai'
var assert = chai.assert;
var expect = chai.expect;

const ORIGINAL_USERS = USERS.users

const SAMPLE_BOOK = {
    title: "Book title",
    isbn: 1233243242
}

const USER1 = 'c176eafd-25eb-45d3-a8cb-7218f3d63b3b'


describe('Services addBook tests', function () {
    beforeEach(() => {
        USERS.users = ORIGINAL_USERS
    });

  describe('#add function tests', function () {
    it('should add a book', async function (done) {
        // Arrange 

        // Act
        let b = await booksService.addBook(SAMPLE_BOOK, USER1) 
        
        // Assert
        let addedBook = await booksService.getBook(b.id)
        assert.isDefined(addedBook)
        assert.equal(addedBook.title, SAMPLE_BOOK.title)
        assert.equal(addedBook.isbn, SAMPLE_BOOK.isbn)

        done()

    });
    it('should throw exception on addBook if user does not exist', async function (done) {
        // Arrange 
        USERS.users = []

        // Act
        try {
            let b = await booksService.addBook(SAMPLE_BOOK, USER1) 
        } catch(e) {
            // Assert if exception is the expected one

            done()
        }
        done("Exception should have been thrown")
        
        // Assert
    });
    
//   });
// });