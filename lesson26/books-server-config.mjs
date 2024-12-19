/**
 * Configures the express HTTP application (including routes and middlewares)
 */

import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path';
import hbs from 'hbs'

import booksDataInit from './data/books-data-mem.mjs'
//import booksDataInit from './data/books-data-es.mjs'
import * as usersData from './data/users-data-mem.mjs'
import booksServiceInit from './books-service.mjs'
import apiInit from './books-api.mjs' 
import siteInit from './books-web-site.mjs' 

const booksData = booksDataInit()

const booksService = booksServiceInit(booksData, usersData)
const apiRouter = apiInit(booksService)
const siteRouter = siteInit(booksService)

console.log("Server-config loaded")

export default function(app) {
    app.use('/api/*', express.json())
    app.post('/site/*', express.urlencoded())


    const fileUrl = import.meta.url
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    //view engine setup
    const viewPath = path.join(__dirname, 'views')
    const partialsPath = path.join(viewPath, 'partials')

    app.set('views', path.join(viewPath));
    app.set('view engine', 'hbs');
    hbs.registerPartials(partialsPath);

    app.use(countReq, showRequestData)
    

    // Web Api Application Routes
    app.use('/api', apiRouter)

    // Web Site Application Routes
    app.use('/site', siteRouter)
    


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

