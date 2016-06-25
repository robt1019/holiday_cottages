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

router.put('/cottageDates', function(req, res, next) {
    CottageDate.findOne({ _id: req.query.date }, function(err, cottageDate) {
        if (err) {
            return next(err);
        }
        if (cottageDate.cottages) {
            for (var i = 0; i < cottageDate.cottages.length; i++) {
                if ((cottageDate.cottages[i].name === req.query.cottageName) &&
                    (cottageDate.cottages[i].reserved === false)) {
                    cottageDate.cottages[i].reserved = true;
                }
            }
            cottageDate.save();
            res.json(cottageDate);
        }
    });
});

router.get('/cottageDates', function(req, res, next) {
    if (req.query && req.query.date) {
        CottageDate.findOne({ _id: req.query.date }, function(err, cottageDates) {
            if (err) {
                return next(err);
            }
            res.json(cottageDates);
        });
    } else {
        CottageDate.find(function(err, cottageDates) {
            if (err) {
                return next(err);
            }
            res.json(cottageDates);
        });
    }
});

module.exports = router;
