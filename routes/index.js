let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('test in here');
    res.render('index', { title:  'COCO' });
});

module.exports = router;
