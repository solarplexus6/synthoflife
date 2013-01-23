var Preset = require('../models/preset.js')
,   crypto = require('crypto');

exports.init = function (req, res) {
	Preset.collection.drop();

	var preset = {
		//sn : crypto.randomBytes(4).toString('hex'),
		sn : "abcd",
		name : "smallExploder",
        pattern : [{x: 8, y: 8}, {x: 7, y: 9}, {x: 8, y: 9}, {x: 9, y: 9}, {x: 7, y: 10}, {x: 9, y: 10}, {x: 8, y: 11}]
    }

    var presetObj = new Preset(preset);
    presetObj.save(function (err, data) {
    	if (err) {
    		res.send(err);
    	} else {
    		res.send(data);
    	}
    });
}