import next from 'next'
import express from 'express'
import logger from 'morgan'

import { routes } from './routes'

const PORT = process.env.PORT || 3001
const dev = process.env.NODE_ENV !== 'production'
const nextServer = next({ dev })
const nextRequestHandler = nextServer.getRequestHandler()

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {}

nextServer
  .prepare()
  .then(async () => {
    const app = express()

    app.use(logger(dev ? 'dev' : 'combined'))

    const router = express.Router()
    routes(router)
    app.use('/', router)

    app.all('*', (req, res) => {
      return nextRequestHandler(req, res)
    })

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`)
    })
  })
  .catch(console.error)
