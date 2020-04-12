import { config } from 'dotenv'

config() // add values inside .env file to environment

export const settings = {
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'fake-sid',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'fake-token',
  }
}