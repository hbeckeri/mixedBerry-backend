var mongoose = require('mongoose');


var AmbulanceData = new mongoose.Schema({
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

module.exports = mongoose.model('AmbulanceData', AmbulanceData);
