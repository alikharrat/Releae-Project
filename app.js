var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session      = require('express-session');
var schedule = require('node-schedule');
var tache = require('./models/schedular');
var port     = process.env.PORT || 3030;
var nodemailer = require('nodemailer');
mongoose.connect('mongodb://localhost/mydb');

var routes = require('./routes/route');

var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// required for passport
app.use(session({ secret: 'thesecretpatient' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require('./config/passport')(passport);

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({data:err.message});
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message
  });
});
app.listen(port, function(){
    console.log('lets try')
    var j = schedule.scheduleJob('*/1 * * * *', function(){
        var x=new Date();
        var date=x.toLocaleDateString("km-KH")+"T"+(x.getHours()<10?'0':'') + x.getHours()+':'+(x.getMinutes()<10?'0':'')+x.getMinutes();
        var L=new Date(date);
        console.log(x);
        console.log(L);
        console.log("request :",x.toLocaleDateString("km-KH") )
        tache.find({backgroundColor:"",start:{$lte:x.toLocaleDateString("km-KH")+'T24:00'}},function(err,res){
            if(err){
                    console.log("we got an error")
                   }
             if(!res[0]){
                    console.log(date);
                    var from = 'kharratali@gmail.com';
                    console.log("nothing to do here");
                  /*  var mailOptions = {
                          from: from,
                          to: "kharratali@hotmail.com",
                          subject: "retard",
                          //text: body,
                          html:"<h2>"+"r.title"+"</h2></br>Un retard par l'employé:"+"<b>"+"r.employe"+"</b></br>"+"Nom du Patient:"+"r.patientName"
                        };
                    console.log(mailOptions);
                    sendMail(mailOptions);*/

             }else{

              console.log("egalité existe");
              console.log(res)
                 res.forEach(function(r){
                    var m=r.start.split('T');
                    console.log(m);
                    if(m[0]<x.toLocaleDateString("km-KH")){
                      console.log("inégalité existe")
                         r.backgroundColor="red";
                         r.traite="false";
                         r.save(function(err,result){
                        if(err)
                          console.log("error")
                        else{
                            var mailOptions = {
                              from: from,
                              to: "kharratali@hotmail.com",
                              subject: "retard",
                              //text: body,
                              html:"<h2>"+r.title+"</h2></br>Un retard par l'employé:"+"<b>"+r.employe+"</b></br>"+"Nom du Patient:"+r.patientName
                            };
                            sendMail(mailOptions);
                            console.log("updated to red")
                            }
                         })

                    }else{
                          if(typeof m[1]==="undefined"){
                            console.log("m[1] undefined");
                            return 0
                          }else{
                            console.log("split m[1]")
                            var s=m[1].split(':');
                            var diffminutes=parseInt((x.getMinutes()<10?'0':'')+x.getMinutes()-parseInt(s[1]));
                            var diffhours=parseInt((x.getHours()<10?'0':'') + x.getHours())-parseInt(s[0]);
                            if((diffhours>0 && diffminutes+60>=5) ||(diffhours==0 && diffminutes>=5) ){
                              console.log("test final <3")
                             r.backgroundColor="red";
                             r.traite="false";
                             r.save(function(err,result){
                            if(err)
                              console.log("error")
                            else{
                                var mailOptions = {
                                  from: from,
                                  to: "kharratali@hotmail.com",
                                  subject: "retard",
                                  //text: body,
                                  html:"<h2>"+r.title+"</h2></br>Un retard par l'employé:"+"<b>"+r.employe+"</b></br>"+"Nom du Patient:"+r.patientName
                                };
                                sendMail(mailOptions);
                                console.log("updated to red")
                                }
                             })

                            }
                          }
                    }
                 })
             }
        })
 
});
});
console.log('The magic happens on port ' + port);
function sendMail(mailOptions,res){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'kharratali@gmail.com', // Your email id
      pass: 'hamadi@90' // Your password
    }
  });
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      return({yo: 'error'});
    }else{
      console.log('Message sent: ' + info.response);
      return({yo: info.response});
    };
  })
};
module.exports = app;
