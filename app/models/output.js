var mongoose = require('mongoose');


var Output = new mongoose.Schema({
	index: {
		type: Number,
		required: true
	},
	distinction: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	number: { 
		type: Number, 
		required: true
	}	
});

module.exports = mongoose.model('versions', Output);
