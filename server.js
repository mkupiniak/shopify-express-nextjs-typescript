const next = require('next')
const express = require('express')

const PORT = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const nextServer = next({ dev })
const nextRequestHandler = nextServer.getRequestHandler()

nextServer.prepare().then(async () => {
  const app = express()

  app.all('*', (req, res) => {
    return nextRequestHandler(req, res)
  })

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
  })
})
