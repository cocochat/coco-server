let express            = require('express');
let router             = express.Router();
let authMiddleware     = require('../config/Authentication');
let campaignController = require('../controllers/CampaignController');

router.use(authMiddleware.checkToken);
router.get('/:id');
router.post('/create', campaignController.create);
router.put('/edit/:id', campaignController.edit);
router.delete('/remove/:id', campaignController.delete);
router.post('/save/:id', campaignController.draft);
router.put('/launch/:id', campaignController.launch);


module.exports = router;
