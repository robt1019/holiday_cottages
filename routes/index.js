var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cottage = mongoose.model('Cottage');
var CottageDate = mongoose.model('CottageDate');

router.get('/cottages', function(req, res, next) {
    Cottage.find(function(err, cottages) {
        if (err) {
            return next(err);
        }
        res.json(cottages);
    });
});

router.post('/cottages', function(req, res, next) {
  var date = new Date(req.body);
    var cottage = new Cottage(req.body);
    cottage.save(function(err, cottage) {
        if (err) {
            return next(err);
        }
        res.json(cottage);
    });
});

router.get('/:date/cottages', function(req, res, next) {
    Cottage.find(function(err, cottages) {
        if (err) {
            return next(err);
        }
        res.json(cottages);
    });
});



module.exports = router;
