var mongoose = require('mongoose');


var 911Data = new mongoose.Schema({
	name: {
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
	latitude: { 
		type: Double, 
		required: true
	},	
	longitude: { 
		type: Double, 
		required: true
	}
});

module.exports = mongoose.model('911Data', 911Data);
