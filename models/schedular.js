var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    title: String,
    start: String,
    end: String,
    allDay:String,
    backgroundColor:{ type: String, default: ""},
    rendering:String,
    employe:String,
    patientName:String,
    excuse:{type:String, default:""},
    traite:{type:String, default:"true"}
    
});


module.exports = mongoose.model('schedular', userSchema);
