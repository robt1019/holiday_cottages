var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cottage = mongoose.model('Cottage');

var CottageDateSchema = new mongoose.Schema({
    _id: Date,
    cottages: [{ name: String, reserved: Boolean }]
});

mongoose.model('CottageDate', CottageDateSchema);
