let db       = require('../config/Mongoose'),
    mongoose = db.mongoose,
    Schema   = db.Schema;

let UserTwilioAccountSchema = new Schema({
    userId         : {
        type    : Number,
        required: true
    },
    twilioSID      : {
        type    : String,
        required: true,
    },
    authToken      : {
        type    : String,
        required: true,
    },
    friendlyName   : {
        type    : String,
        required: true,
    },
    ownerAccountSid: {
        type    : String,
        required: true,
    },
    status         : {
        type    : String,
        enum    : ['active', 'suspended', 'closed'],
        required: true,
        default : 'active',
    },
    createdAt      : {
        type   : Date,
        default: Date.now()
    },
    updatedAt      : {
        type   : Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('UserTwilioAccount', UserTwilioAccountSchema);

