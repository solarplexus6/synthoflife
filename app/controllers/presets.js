var Preset = require('../models/preset.js');

// index listing of widgets at /widgets/
exports.index = function(req, res) {
   City.find({}, function(err, docs) {
      res.render('presets/index', {title : 'Presets'});
   });
};