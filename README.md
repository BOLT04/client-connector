# client-connector
An application to contact users via SMS using Twilio APIs
This project is for an hackathon submission. You can find here the [announcement post](https://twil.io/dev-hack-april).

## Built with
- Node.js web server using [Express.js](https://npm.im/express) and [Typescript](https://www.typescriptlang.org/)
- React and Javascript for the client-side

## Features
- Send a message to a person's phone using SMS

## Set up

### Requirements

- [Node.js](https://nodejs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Twilio Account Settings

This application uses the `dotenv` module to read the environement variables configuration. So in order to run the server, you must create a .env file and set the appropriate values to each variable. Below is a table with the variables you need to set, or check the file `.env-sample` (optional values aren't on the table):

| Env Variable | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TWILIO_ACCOUNT_SID  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| TWILIO_AUTH_TOKEN   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| TWILIO_FROM_PHONE_NUMBER | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |

You can also set `PORT` to specify the port the server should listen to.

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone https://github.com/BOLT04/client-connector.git
cd client-connector
```

2. Install dependencies

```bash
npm install
```

3. Run the application

```bash
npm start
```

5. Navigate to [http://localhost:3000](http://localhost:3000)


## License

[MIT](LICENSE)

