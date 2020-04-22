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
  const TTL_10_MINUTES = 600
  const capability = new ClientCapability({ accountSid, authToken, ttl: TTL_10_MINUTES });
  capability.addScope(
    new ClientCapability.OutgoingClientScope({
      applicationSid: accountSid,
    })
  );
  capability.addScope(new ClientCapability.IncomingClientScope('test client'));

  return capability.toJwt();
}

export class InvalidPhoneNumberError extends Error {
  constructor(message = "Invalid phone number") {
    super(message);
    this.name = "InvalidPhoneNumberError";
  }
}
