let User = require('../models/User');
let auth = require('../config/Authentication');
let mailer = require('../config/Mailer');
let winston = require ('../config/Winston');


module.exports = {
    login         : (req, res) => {
        let email    = req.body.email,
            password = req.body.password;
        User.getAuthenticated(email, password, (err, user, reason) => {
            if (reason) {
                return res.json({status: false, message: `Error: ${reason}`, data: {errReason: reason}, meta: {}});
            }
            if (err) {
                return res.json({status: false, message: `Error: ${err.message}`, data: {user: user}, meta: {}});
            }
            if (user) {
                let token = auth.createToken(user);
                return res.json({
                    status : true,
                    message: "Successfully logged in.",
                    data   : {user: user, token: token},
                    meta   : {}
                });
            }
        })
    },
    register      : (req, res) => {
        if (req.body.name &&
            req.body.email &&
            req.body.phoneNumber &&
            req.body.password) {
            
            let userData = {
                name       : req.body.name,
                email      : req.body.email,
                password   : req.body.password,
                phoneNumber: req.body.phoneNumber,
            };
            console.log(userData);
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
            user.email       = req.body.email;
            user.username    = req.body.username;
            user.phoneNumber = req.body.phoneNumber;
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
