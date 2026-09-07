import express from 'express'
import { connectDatabase } from './config/database.js'
import { apiRouter } from './routes.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl })
})

app.use('/api', apiRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

app.listen(port, () => console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`))
void connectDatabase()