require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessage = (message, number) => {
  try {
    client.messages.create({
      body: message,
      from: '+18302828279',
      to: number,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendMessage;
