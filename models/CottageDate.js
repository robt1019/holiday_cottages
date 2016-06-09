var mongoose = require('mongoose');

var CottageDateSchema = new mongoose.Schema({
    date: Date,
    Cottages: []
});