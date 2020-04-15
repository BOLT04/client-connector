import express from 'express'
import morgan from 'morgan'
import { settings } from './settings'
import { sendSmsHandler } from './api/send-sms.handler'
import { verifyPhoneNumberHandler } from './api/verify-phone-number.handler'

const app = express()
app.set('x-powered-by', false)

// Middleware
app.use(morgan('combined'))
app.use(express.json())

app.post('/send-sms', sendSmsHandler)
app.get('/check/:number', verifyPhoneNumberHandler)

const { port } = settings
app.listen(port, () => {
  console.log(`Client Connector server listening on port ${port}!`)
  if (!settings.isProd) console.log(`Entry point is http://localhost:${port}/`)
})