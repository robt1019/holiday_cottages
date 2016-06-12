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
    var cottage = new Cottage(req.body);
    cottage.save(function(err, cottage) {
        if (err) {
            return next(err);
        }
        res.json(cottage);
    });
});

router.post('/cottageDates', function(req, res, next) {
    var cottageDate = new CottageDate(req.body);
    cottageDate.save(function(err, cottageDate) {
        if (err) {
            return next(err);
        }
        res.json(cottageDate);
    });
});

router.get('/cottageDates', function(req, res, next) {
    CottageDate.find(function(err, cottageDates) {
        if (err) {
            return next(err);
        }
        res.json(cottageDates);
    });
});

router.get('/cottageDates/:date', function(req, res, next) {
    CottageDate.find({ date: date }, function(err, cottages) {
        if (err) {
            return next(err);
        }
        res.json(cottages);
    });
});



module.exports = router;
