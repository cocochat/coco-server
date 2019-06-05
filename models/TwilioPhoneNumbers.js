let db       = require('../config/Mongoose'),
    mongoose = db.mongoose,
    Schema   = db.Schema;

let TwilioPhoneNumbers = new Schema({
    userId     : {
        type    : Number,
        required: true
    },
    accountSID : {
        type    : String,
        required: true,
    },
    country: {
        type: String,
        required: true,
        default: 'US',
    },
    areaCode: {
        type: String,
        required: true,
    },
    friendlyName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    LATA: {
        type: String,
        required: false,
        default: "",
    },
    region: {
        type: String,
        required: false,
        default: "",
    },
    postalCode: {
        type: String,
        required: true,
    },
    
    createdAt  : {
        type   : Date,
        default: Date.now()
    },
    updatedAt  : {
        type   : Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('TwilioPhoneNumbers', TwilioPhoneNumbersSchema);

