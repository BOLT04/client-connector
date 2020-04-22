import { settings } from "../settings";
import twilio from "twilio";

const { accountSid, authToken } = settings.twilio;
const client = twilio(accountSid, authToken);
const lookups = client.lookups.v1;
const { ClientCapability } = twilio.jwt;

/**
 * Send an SMS to a phone number with the given body.
 * @param body body of the message to be sent
 * @param to phone number of the message receiver. It should have the E.164 format ([+][country code][phone number including area code])
 * For more information, check the link to the docs.
 * @link https://www.twilio.com/docs/glossary/what-e164
 */
export async function sendMessage(body: string, to: string) {
  if (!verifyPhoneNumber(to)) throw new InvalidPhoneNumberError();

  try {
    const rsp = await client.messages.create({
      body,
      from: settings.twilio.fromPhomeNumber,
      to,
    });
    console.log(`Message sent [sid:${rsp.sid}]`);
  } catch (error) {
    console.error("An error occurred while sending a message");

    if (error.status === 400) throw new InvalidPhoneNumberError();
    else throw error;
  }
}

export function verifyPhoneNumber(phoneNumber: string) {
  return lookups
    .phoneNumbers(phoneNumber)
    .fetch()
    .then(
      (numberData) => true,
      (err) => false
    );
}

/**
 * @returns {string} The generated JWT token
 */
export function generateToken(): string {
  const TTL_10_MINUTES = 600;
  const capability = new ClientCapability({
    accountSid,
    authToken,
    ttl: TTL_10_MINUTES,
  });
  capability.addScope(
    new ClientCapability.OutgoingClientScope({
      applicationSid: settings.twilio.twimlAppSid,
    })
  );
  capability.addScope(new ClientCapability.IncomingClientScope("test client"));

  return capability.toJwt();
}

const { VoiceResponse } = twilio.twiml;

export function connectCall(phoneNumber: string) {
  const twiml = new VoiceResponse();
  const dial = twiml.dial({ callerId: settings.twilio.fromPhomeNumber });
  dial.number(phoneNumber);
  return twiml.toString()
}

export async function createCall(phoneNumber: string) {
  const call = await client.calls
  .create({
     url: 'https://241577a1.ngrok.io/voice/calls/connect',
     to: phoneNumber,
     from: settings.twilio.fromPhomeNumber
   })

  console.log('call sid', call.sid);
}

export class InvalidPhoneNumberError extends Error {
  constructor(message = "Invalid phone number") {
    super(message);
    this.name = "InvalidPhoneNumberError";
  }
}
