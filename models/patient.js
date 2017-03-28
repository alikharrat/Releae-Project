var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    Nom: String,
    Origine: String,
    Raison:String,
    doctor:String,
    Sexe:String
    
});


module.exports = mongoose.model('patient', userSchema);
