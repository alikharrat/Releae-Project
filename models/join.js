var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

	ID_user : { type: String, required: true},
	ID_offre: { type: String, required: true},
	payement: {type:String}
    //date: {type:Date}
});
 
 module.exports = mongoose.model('joins', schema);