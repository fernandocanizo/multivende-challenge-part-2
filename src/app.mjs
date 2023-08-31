import express from 'express'
import httpLogger from 'morgan'

import * as auth from './controller/auth.mjs'
import * as product from './controller/product.mjs'

const app = express()
const port = 3000

app.use(httpLogger('dev'))

app.get('/ping', (_, res) => {
  return res.status(200).end()
})

app.get('/login', auth.login)

app.get('/configuration', auth.getToken)

app.get('/status', product.getStatus)

app.listen(port, () => {
  console.log(`Listening on localhost, port ${port}`)
})
