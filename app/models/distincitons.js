var mongoose = require('mongoose');


var Dist = new mongoose.Schema({
	index: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('distinction', Dist);
