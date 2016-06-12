var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cottage = mongoose.model('Cottage');

var CottageDateSchema = new mongoose.Schema({
    date: Date,
    cottages: [{ type: Schema.Types.ObjectId, ref: Cottage }]
});

mongoose.model('CottageDate', CottageDateSchema);
