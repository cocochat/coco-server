let User = require('../models/User');

module.exports = {
    login         : (req, res) => {
        let email    = req.body.email,
            password = req.body.password;
        
    },
    register      : (req, res) => {
        if (req.body.email &&
            req.body.username &&
            req.body.phoneNumber &&
            req.body.password) {
            
            let userData = {
                name       : req.body.name,
                email      : req.body.email,
                password   : req.body.password,
                phoneNumber: req.body.phoneNumber,
            };
            
            //use schema.create to insert data into the db
            User.create(userData, function (err, user) {
                if (err) {
                    return next(err)
                } else {
                    return res.json({status: true, message: "Thank you for registering.", data: {user: user}, meta: {}})
                }
            });
        } else {
            return res.json({status: false, message: "Missing Parameter.", data: {requestParams: req.body}, meta: {}})
        }
    },
    forgotPassword: (req, res) => {
        // todo send mail
    },
    verify        : (req, res) => {
        // define verification model
        // use twilio
    },
    update        : (req, res) => {
        if (!req.user) {
            return res.json({status: false, message: "Missing Token.", data: {}, meta: {}})
        }
        let user = req.user;
        if (req.body.email &&
            req.body.username &&
            req.body.phoneNumber) {
            user.email  = req.body.email;
            user.username  = req.body.username;
            user.phoneNumber  = req.body.phoneNumber;
            user.save()
                .then(userUpdated => {
                    return res.json({status: true, message: "User Updated .", data: {user: user}, meta: {}})
                })
                .catch(err => {
                    return res.json({status: false, message: "Error Updating User.", data: {err: err}, meta: {}})
                })
        }
    }
}