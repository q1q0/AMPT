var express = require('express');
var router = express.Router();

var proposals = require('../data/proposals');

router.get('/', function (req, res, next) {
    return res.json({
        code: 0,
        results: proposals || []
    })
});

module.exports = router;
