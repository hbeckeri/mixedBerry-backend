var mongoose = require('mongoose');


var Output = new mongoose.Schema({
	index: {
		type: "int",
		required: true
	},
	distinction: {
		type: "int",
		required: true
	},
	type: {
		type: String,
		required: true
	},
	number: { 
		type: "double", 
		required: true
	}	
});

module.exports = mongoose.model('Output', Output);
