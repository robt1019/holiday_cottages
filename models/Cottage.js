var mongoose = require('mongoose');

var CottageSchema = new mongoose.Schema({
    name: String,
});

mongoose.model('Cottage', CottageSchema);
