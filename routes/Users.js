let express        = require('express');
let router         = express.Router();
let authMiddleware = require('../config/Authentication');
let userController = require('../controllers/UserController');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/forgot-password', userController.forgotPassword);
router.get('/verify', userController.verify);
router.use(authMiddleware.checkToken);
router.put('/update', userController.update);
router.put('/update/welcome-message', userController.updateWelcomeMessage);
router.post('/update/profile-pic', userController.uploadProfilePic);
router.post('/register/phone-number', userController.registerTwilioNumber);


// todo set twilio account creation
// router.post('/account', userController.createTwilioAccount);

module.exports = router;
