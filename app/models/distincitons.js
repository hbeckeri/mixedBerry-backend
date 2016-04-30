var mongoose = require('mongoose');


var Distinctions = new mongoose.Schema({
	index: {
		type: "int",
		required: true
	},
	latitude1: {
		type: Double,
		required: true
	},
	longitude1: {
		type: Double,
		required: true
	},
	latitude2: {
		type: Double,
		required: true
	},
	longitude2: {
		type: Double,
		required: true
	}
	
});

module.exports = mongoose.model('Distinctions', Distinctions);
