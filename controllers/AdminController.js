let User    = require('../models/User'),
    auth    = require('../config/Authentication'),
    // let mailer  = require('../config/Mailer');
    winston = require('../config/Winston');


module.exports = {
    // sendInvite: (req, res) => {
    //     let invited = req.body.email,
    //         message = req.body.message;
    //     let invite  = {
    //         from   : process.env.MAIL_SENDER,
    //         to     : invited,
    //         subject: "You have been invited to join COCO!",
    //         text   : message,
    //         // html: "<p>HTML version of the message</p>"
    //     }
    //     mailer.sendMail(invite, (err, info) => {
    //         if (err) {
    //             winston.record(err);
    //             return process.exit(1);
    //         }
    //
    //         console.log('Message sent successfully!');
    //         return res.json({status: true, message: `Invitation sent to ${email}.`, data: {}, meta: {}});
    //
    //     })
    // }
}
