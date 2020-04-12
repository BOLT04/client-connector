import express, { Request, Response } from 'express'
import { settings } from './settings'

const app = express()
app.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'TODO' })
})

const { port } = settings
app.listen(port, () => {
  console.log(`Client Connector server listening on port ${port}!`)
  if (!settings.isProd) console.log(`Entry point is http://localhost:${port}/`)
})