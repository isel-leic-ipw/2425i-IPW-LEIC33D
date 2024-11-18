/**
 * Starts HTTP server
 */

import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'
import express from 'express'
import cors from 'cors'

export const app = express()
const swaggerDocument = yaml.load('./docs/books-api.yaml')

import init from './books-server-config.mjs'
app.use(cors())
app.use('/slb', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
init(app)

const PORT = 1904
app.listen(PORT, serverStarted)

function serverStarted(e) {
    if(e) {
        return console.log(`Server not started because of the following error: ${e}`)
    }
    console.log(`Server listening on port ${1904}`)
}



