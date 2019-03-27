let express        = require('express');
let router         = express.Router();
let authMiddleware = require('../config/Authentication');
let adminController = require('../controllers/AdminController');

router.use(authMiddleware.checkToken);
// router.post('/invite', adminController.sendInvite());


// todo set twilio account creation
// router.post('/account', userController.createTwilioAccount);

module.exports = router;
