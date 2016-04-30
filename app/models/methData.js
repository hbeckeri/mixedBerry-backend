var mongoose = require('mongoose');


var methData = new mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	county: { 
		type: String, 
		required: true
	},
	fips: { 
		type: Number, 
		required: true
	},
	latitude: { 
		type: Number, 
		required: true
	},	
	longitude: { 
		type: Number, 
		required: true
	}
});

module.exports = mongoose.model('MethData', methData);
