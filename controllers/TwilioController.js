let Twilio  = require('../models/UserTwilioAccount');
let User    = require('../models/User');
let client  = require('../config/Twilio');
let auth    = require('../config/Authentication');
let winston = require('../config/Winston');


module.exports = {
    createNumber: (req, res) => {
        let account                       = client.createAccount();
        let userId                        = req.user.id,
            authToken                     = account.authToken,
            friendlyName                  = account.friendlyName,
            ownerAccountSid               = account.ownerAccountSid,
            status                        = account.status;
        let userTwilioAccount             = new Twilio();
        userTwilioAccount.userId          = userId;
        userTwilioAccount.twilioSID       = twilioSID;
        userTwilioAccount.authToken       = authToken;
        userTwilioAccount.friendlyName    = friendlyName;
        userTwilioAccount.ownerAccountSid = ownerAccountSid;
        userTwilioAccount.status          = status;
        userTwilioAccount.save();
    },
    getNumbers  : (req, res) => {
        // return all numbers
    },
    deleteNumber: (req, res) => {
        // remove a number
    },
    getNumber   : (req, res) => {
        // get single number with all number information
    }
}
