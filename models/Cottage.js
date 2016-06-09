var mongoose = require('mongoose');

var CottageSchema = new mongoose.Schema({
    name: String,
    reserved: Boolean
});

mongoose.model('Cottage', CottageSchema);
