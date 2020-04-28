import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { settings } from './settings'
import { sendSmsHandler } from './api/send-sms.handler'
import { verifyPhoneNumberHandler } from './api/verify-phone-number.handler'
import { createTokenHandler } from './api/voice/create-token.handler'

const app = express()
app.set('x-powered-by', false)

// Middleware
app.use(morgan('combined'))
app.use(express.json())

// API routes
app.post('/send-sms', sendSmsHandler)
app.get('/check/:number', verifyPhoneNumberHandler)

const { port, isProd } = settings
if (isProd) {
  const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build')
  app.use(express.static(CLIENT_BUILD_PATH))
  app.get('/*', (_, res) => res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html')))
}

app.listen(port, () => {
  console.log(`Client Connector server listening on port ${port}!`)
  if (!isProd) console.log(`Entry point is http://localhost:${port}/`)
})