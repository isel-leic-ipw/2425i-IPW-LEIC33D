/**
 * Starts HTTP server
 */

import express from 'express'
export const app = express()


import init from './books-server-config.mjs'
init(app)


const PORT = 1904
app.listen(PORT, serverStarted)

function serverStarted(e) {
    if(e) {
        return console.log(`Server not started because of the following error: ${e}`)
    }
    console.log(`Server listening on port ${1904}`)
}



