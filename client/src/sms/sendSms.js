import Axios from 'axios'

/**
 * @param {string} msg
 * @param {string} phone
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export async function sendSms(msg, phone) {
    return Axios.post('/send-sms', { msg, phone })
}