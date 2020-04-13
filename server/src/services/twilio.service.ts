import { settings } from '../settings'
import twilio from 'twilio'

const client = twilio(settings.twilio.accountSid, settings.twilio.authToken);

/**
 * Send an SMS to a phone number with the given body.
 * @param body body of the message to be sent
 * @param to phone number of the message receiver. It should have the E.164 format ([+][country code][phone number including area code])
 * For more information, check the link to the docs.
 * @link https://www.twilio.com/docs/glossary/what-e164
 */
export async function sendMessage(body: string, to: string) {
  // TODO: validate "to" string format
  const rsp = await client.messages.create({
    body,
    from: settings.twilio.fromPhomeNumber,
    to
  })
  console.log(`Message sent [sid:${rsp.sid}]`)
}