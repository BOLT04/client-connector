import express, { Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import path from 'path'
import { settings } from './settings'
import { sendSmsHandler } from './api/send-sms.handler'
import { verifyPhoneNumberHandler } from './api/verify-phone-number.handler'

const app = express()
app.set('x-powered-by', false)

// Middleware
app.use(morgan('combined'))
app.use(express.json())

var a ="";

// Set up rate limiter: maximum of five requests per minute
const limiter = rateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 5
});
app.use(limiter);

// API routes
app.post('/send-sms', sendSmsHandler)
app.get('/check/:number', verifyPhoneNumberHandler)

const { port, isProd } = settings
if (isProd) {
  // Serve SPA
  const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build')
  app.use(express.static(CLIENT_BUILD_PATH))
  app.get('/*', (_: Request, res: Response) => res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html')))

  // Gracefully shutdown
  process
    .on('SIGTERM', shutdown('SIGTERM'))
    .on('SIGINT', shutdown('SIGINT'))
    .on('uncaughtException', shutdown('uncaughtException'));
}

// Handle process shutdown: https://help.heroku.com/D5GK0FHU/how-can-my-node-app-gracefully-shutdown-when-receiving-sigterm
function shutdown(signal: string): NodeJS.SignalsListener {
  return (error: any) => {
    console.log(`${signal}...`)
    if (error) console.error(error.stack || error);

    setTimeout(() => {
      console.log('...waited 5s, exiting.')
      process.exit(error ? 1 : 0)
    }, 5000).unref()
  }
}

app.listen(port, () => {
  console.log(`Client Connector server listening on port ${port}!`)
  if (!isProd) console.log(`Entry point is http://localhost:${port}/`)
})
