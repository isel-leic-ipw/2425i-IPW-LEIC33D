const PREFIX = "http://localhost:1904/api"


console.log("Get all books")

await booksApi(`${PREFIX}/books`)
console.log("--------------------------------------")

console.log("Get book details") 
await booksApi(`${PREFIX}/books/slb`)
console.log("--------------------------------------")

console.log("Delete book") 
await booksApi(`${PREFIX}/books/1`,"DELETE" )
console.log("--------------------------------------")

console.log("Update book") 
await booksApi(`${PREFIX}/books/1`,"PUT" )
console.log("--------------------------------------")

console.log("Post book") 
await booksApi(`${PREFIX}/books`,"POST" )
console.log("--------------------------------------")



function booksApi(uri, m = "GET")  {
    return fetch(uri, { method: m})
        .then(rsp => rsp.text())
        .then(obj => console.log(obj))
}
