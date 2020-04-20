import Axios from 'axios'
import { Device } from 'twilio-client';

/**
 * @type {import('twilio-client').Device}
 */
let twilioDevice

/**
 * Set up a Twilio Device Client
 */
export async function init() {
  const { token } = await Axios.post('/voice/token').then(rsp => rsp.data)
  twilioDevice = new Device().setup(token)

  twilioDevice.ready(device => {
    // TODO:
  })
}

export function startCall() {
  twilioDevice.connect()
}