var mongoose = require('mongoose');


var Dist = new mongoose.Schema({
	index: {
		type: Number,
		required: true
	},
	latitude1: {
		type: Number,
		required: true
	},
	longitude1: {
		type: Number,
		required: true
	},
	latitude2: {
		type: Number,
		required: true
	},
	longitude2: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('distinction', Dist);
