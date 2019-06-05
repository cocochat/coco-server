let express        = require('express');
let router         = express.Router();
let authMiddleware = require('../config/Authentication');
let twilioController = require('../controllers/TwilioController');

router.use(authMiddleware.checkToken);
router.post('/number', twilioController.createNumber);
router.get('/numbers', twilioController.getNumbers);
router.delete('/number/:id', twilioController.deleteNumber);
router.get('/number/:id', twilioController.getNumber);

module.exports = router;
