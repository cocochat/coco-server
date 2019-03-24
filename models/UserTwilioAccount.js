let db                 = require('../config/Mongoose'),
    mongoose           = db.mongoose,
    Schema             = db.Schema;

let UserTwilioAccountSchema = new Schema({
    userId         : {
        type    : Number,
        required: true
    },
    accountId : {
        type: String,
        required: true,
        //todo remove default
        default: "",
    },
    phoneNumber  : {
        type    : String,
        required: true,
    },
    createdAt    : {
        type   : Date,
        default: Date.now()
    },
    updatedAt    : {
        type   : Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('UserTwilioAccount', UserTwilioAccountSchema);

