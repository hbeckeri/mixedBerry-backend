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
		type: "int", 
		required: true
	},
	latitude: { 
		type: "double", 
		required: true
	},	
	longitude: { 
		type: "double", 
		required: true
	}
});

module.exports = mongoose.model('MethData', methData);
