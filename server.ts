require('dotenv-safe').load()

import express from 'express'
import path from 'path'

const { PORT } = process.env
const app: express.Application = express()

const staticDir = path.join(__dirname, 'dist')
const staticIndex = path.join(staticDir, 'index.html')

app.use(express.static(staticDir))
app.use((req: express.Request, res: express.Response) => res.sendFile(staticIndex))

app.listen(PORT, (error: any) => {
  if (error) {
    console.error(error)
  } else {
    console.log(`Listening on port ${PORT}`)
  }
})
