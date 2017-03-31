var admin = require('../models/user');

var mongoose = require('mongoose');
 mongoose.connect ('localhost:27017/mydb');

var Admin =
new admin()

  Admin.nom = 'Administrator';
  Admin.prenom='admin';
  Admin.password = Admin.generateHash("70851999ssma");
  Admin.mail = "admin@saba-assistance.com";
  Admin.tel = "70851999";
  Admin.pays= 'Tunisie';
  Admin.type = "admin";
	Admin.save(function(err, result) {

			exit();

	});


function exit() {
	mongoose.disconnect();
}

