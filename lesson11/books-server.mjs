import express from 'express'

const app = express()

app.get('/api/books', function(req, rsp) {
    rsp.send('Get books called')

})

app.post('/api/books', function(req, rsp) {
    rsp.send('Post to books called')
})


app.get('/api/books/:bookId', function(req, rsp) {
    rsp.send(`Get book with id ${req.params.bookId} called`)
})

app.put('/api/books/:bookId', function(req, rsp) {
    rsp.send(`Put book with id ${req.params.bookId} called`)
})

app.delete('/api/books/:bookId', function(req, rsp) {
    rsp.send(`Delete book with id ${req.params.bookId} called`)
})


const PORT = 1904
app.listen(PORT)
console.log(`Server listening on port ${1904}`)