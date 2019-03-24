const accountSID = process.env.TWILIO_ACCOUNT_SID,
      authToken = process.env.TWILIO_AUTH_TOKEN,
      client = require('twilio')(accountSID, authToken);

// client.CreateAccount =