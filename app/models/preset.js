var mongoose = require('mongoose');

var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

// create Preset model
var Preset = new Schema({
  sn : {type: String, require: true, trim: true, unique: true},
  name : {type: String, required: true, trim: true},
  pattern : {type: Array, required: true, trim: true;}
});

module.exports = mongoose.model('Preset', Preset);