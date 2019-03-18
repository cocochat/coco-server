let jwt    = require('jsonwebtoken');
let User = require('../models/User');
let secret = process.env.APP_SECRET;

module.exports = {
    checkToken : (req, res, next) => {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    let user = User.findByMail(decoded.email);
                    req.user = user;
                    next();
                }
            });
        } else {
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    },
    createToken: (user) => {
        let payload = {
            email: user.email,
            id   : user.id
        };
        return jwt.sign(payload, process.env.APP_SECRET)
    }
    
};