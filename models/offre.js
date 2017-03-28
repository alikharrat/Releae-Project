var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	ID_offre: { type: Number, required: true},
	nom : { type: String, required: true},
	activite: { type: String, required: true},
	duree: { type: String, required: true},
	coach: { type: String, required: true},
	price: { type: Number, required: true}
});
 
 module.exports = mongoose.model('offres', schema);