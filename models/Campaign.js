let db       = require('../config/Mongoose'),
    mongoose = db.mongoose,
    Schema   = db.Schema;

let CampaignSchema = new Schema({
    name           : {
        type    : String,
        trim    : true,
        required: true,
    },
    image          : {
        type    : Text,
        required: false,
    },
    description    : {
        type    : String,
        required: false,
        min     : 25,
        max     : 180
    },
    textAlignment  : {
        type   : String,
        enum   : ['left', 'center', 'right'],
        default: 'left',
    },
    textColor      : {
        type   : String,
        default: '#000000',
    },
    backgroundColor: {
        type   : String,
        default: '#000000',
    },
    link           : {
        type    : Text,
        required: false,
    },
    targetAudience : {
        type    : String,
        required: false,
    },
    artistID       : {
        type    : String,
        required: true,
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

CampaignSchema.statics.getCampaignById = function (id, cb) {
    this.findOne({
        _id: id
    }, cb);
}

module.exports = mongoose.model('Campaign', CampaignSchema);

