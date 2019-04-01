const nodemailer = require('nodemailer');
const winston    = require('./Winston');

let options = {
    from  : process.env.MAIL_USER,
    host  : process.env.MAIL_HOST,
    port  : process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth  : {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
};

// const transporter = nodemailer.createTransport(options);
//
// transporter.verify((err, suc) => {
//     if (err) {
//         console.log("HERE");
//         console.log(err);
//         console.log("HERE");
//         winston.record(err);
//         // exit(-1);
//     } else {
//         console.log("Mailer Ready.");
//     }
// });


// module.exports = transporter;
