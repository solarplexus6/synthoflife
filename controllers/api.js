var	Preset = require('../models/preset.js')
,	db = require('./../db/init');

exports.initDb = function (req, res) {
	console.log(req.url);

	db.init(req, res);
}

exports.getPreset = function(req, res) {
	var sn = req.params.sn;
	Preset.findOne({sn : sn}, function(err,doc) {
		if (err)
			res.send('There is no widget with sn of ' + sn);
		else
			res.send(doc);
	});
}