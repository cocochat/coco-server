let db                 = require('../config/Mongoose'),
    mongoose           = db.mongoose,
    Schema             = db.Schema,
    SALT_ROUNDS        = 12,
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME          = 2 * 60 * 60 * 1000;

let UserSchema = new Schema({
    name         : {
        type    : String,
        trim    : true,
        required: true
    },
    userType     : {
        type: String,
        enum: ['Superadmin', 'Admin', 'Manager', 'User'],
        default: 'User'
    },
    email        : {
        type     : String,
        required : true,
        trim     : true,
        lowercase: true,
        unique   : true,
    },
    password     : {
        type    : String,
        required: true,
        min     : 8,
        max     : 25,
    },
    phoneNumber  : {
        type    : String,
        required: true,
    },
    loginAttempts: {
        type    : Number,
        required: true,
        default : 0
    },
    lockUntil    : {
        type: Number
    },
    token        : {
        type: String
    },
    refreshToken : {
        type: String
    },
    isVerified   : {
        type   : Boolean,
        default: false,
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

// virtual columns
UserSchema.virtual('isLocked').get(function () {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// enums
let reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND         : 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS      : 3
};

// methods
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.incrementLoginAttempts = function (cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set  : {loginAttempts: 1},
            $unset: {lockUntil: 1}
        }, cb);
    }
    // otherwise increment
    var updates = {$inc: {loginAttempts: 1}};
    
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = {lockUntil: Date.now() + LOCK_TIME};
    }
    return this.update(updates, cb);
};


// statics
UserSchema.statics.findByEmail = (email, cb) => {
    return this.findOne({
        where: {
            email: email
        }
    }, cb);
};

UserSchema.statics.getAuthenticated = function (email, password, cb) {
    this.findOne({email: email}, function (err, user) {
        if (err) return cb(err);
        
        // make sure the user exists
        if (!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }
        
        // check if the account is currently locked
        if (user.isLocked) {
            // just increment login attempts if account is already locked
            return user.incLoginAttempts(function (err) {
                if (err) return cb(err);
                return cb(null, null, reasons.MAX_ATTEMPTS);
            });
        }
        
        // test for a matching password
        user.comparePassword(password, function (err, isMatch) {
            if (err) return cb(err);
            
            // check if the password was a match
            if (isMatch) {
                // if there's no lock or failed attempts, just return the user
                if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
                // reset attempts and lock info
                var updates = {
                    $set  : {loginAttempts: 0},
                    $unset: {lockUntil: 1}
                };
                return user.update(updates, function (err) {
                    if (err) return cb(err);
                    return cb(null, user);
                });
            }
            
            // password is incorrect, increment login attempts
            user.incrementLoginAttempts(function (err) {
                if (err) return cb(err);
                return cb(null, null, reasons.PASSWORD_INCORRECT);
            });
        });
    });
};

// hooks
UserSchema.pre('save', (next) => {
    // get user
    let user = this;
    
    // todo check if password is modified
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
        if (err) return next(err);
        
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
    
});

module.exports = mongoose.model('User', UserSchema);

