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
  if (twilioDevice) return // Then the device was initialized already

  const { token } = await Axios.post('/voice/token').then(rsp => rsp.data)
  twilioDevice = new Device().setup(token)

  twilioDevice.on('ready', _ => {
   console.log('Device Ready')
  })
}


export async function startCall(phoneNumber) {
  if (!navigator.getUserMedia) return console.error('getUserMedia() is not supported in this browser')
  
  navigator.getUserMedia({ audio: true }, async _ => {
    await init()
    const con = twilioDevice.connect({ phone: phoneNumber })
    console.log('Status', con.status)
    console.log('Codec', con.codec)
  }, _ => console.warn(`Can't make phone calls since the permission was denied`))
  
 //await Axios.post('/voice/calls/create', {phoneNumber}).then(rsp => rsp.data)
}

export function endCall() {
  twilioDevice && twilioDevice.disconnectAll()
}