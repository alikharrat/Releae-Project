var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, login, password, done) {

    process.nextTick(function() {
      console.log("we are here");
      console.log(req.body);

      User.findOne({ 'mail':  login }, function(err, user) {
        if (err){
            console.log("we got error findOne");
            console.log(err);
            return done(err);
          }
        if (user) {
          console.log('user exists');
          return done(null, false, req.flash('signupMessage', 'That Mail Adress is already taken.'));
        } else {
          var newUser = new User();
          newUser.nom = req.body.nom.toLowerCase();
          newUser.prenom= req.body.prenom.toLowerCase();
          newUser.password = newUser.generateHash(password);
          newUser.mail = req.body.login.toLowerCase();
          newUser.tel = req.body.mobile.toLowerCase();
          newUser.type="CLIENT";
          newUser.pack="No Pack"
          newUser.pays=req.body.pays;
          newUser.save(function(err) {
            if (err){
              console.log("we got error save");
              console.log(err);
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, login, password, done) {
      console.log("req.bodyaaaaaaaaaaaaaaaaaa");
    console.log(login);
    User.findOne({ 'mail': login }, function(err, user) {
        console.log(user)
      if (err){
        console.log("we are here2");
        console.log(password);
          return done(err)
          }
      if (!user){
        console.log("line 68 index.js");
          return done(null, 'invalid login');
        }
      if (!user.validPassword(req.body.password)){
          console.log("line 72 index.js");
          return done(null, 'invalid password');
        }
      console.log("line 75 index.js");
      return done(null, user);
    });
  }));

};
