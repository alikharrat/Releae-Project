var express = require('express');
var passport = require('passport');
var csrf=require('csurf');
var csrfProtection = csrf();
var join= require('../models/join');
var schedular= require('../models/schedular');
var user= require('../models/user');
var patient=require('../models/patient');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require('nodemailer');
var router = express.Router();

router.use(csrfProtection);

router.get('/', function(req, res, next){
 res.send({'csrfToken':req.csrfToken()});
})
router.post('/logout', function(req, res) {
    if(req.isAuthenticated){
        req.logout();
        res.send({data:"logout",'csrfToken':req.csrfToken()});
    }

});
router.post('/memberlogin', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {

    if (err) { 
        console.log('error')
        return res.send({data:"error",'csrfToken':req.csrfToken()});
    }
    if (!user) { 
        console.log("notfound");
        return res.send({data:"wrong login",'csrfToken':req.csrfToken()});
               }
    req.logIn(user, function(err) {
      if (err) { 
          console.log('other error')
          return res.send({data:'wrong password','csrfToken':req.csrfToken()}); 
      }
      return res.send({data:user,'csrfToken':req.csrfToken()});;

    });
  })(req, res, next);
});

router.post('/postschedular',function(req,res){
    console.log(req.body);
    res.send({data:'postschedular','csrfToken':req.csrfToken()})
})
router.post('/getnewschedular',function(req,res){
 // res.send({data:'done','csrfToken':req.csrfToken()})
  if(req.isAuthenticated){
    if(req.user.type=='admn'){

    }else{
      var planning=new schedular();
      
      if(!(typeof req.body.data.data.end==='undefined')){
        planning.end=req.body.data.data.end;
      }
      if(!(typeof req.body.data.patient==='undefined')){
        planning.patientName=req.body.data.patient;
      }
      planning.title=req.body.data.data.title;
      planning.start=req.body.data.data.start;
      planning.employe=req.body.data.employe;
      
      console.log(planning);
      planning.save(function(err,result){
        if(err)
              {
                return err
              } else{
                res.send({data:planning,'csrfToken':req.csrfToken()});
              }
      })

    }

  }else{
    res.send({data:'dont try this'})
  }
})
router.post('/Intdashemployee',function(req,res){
  if(req.isAuthenticated){
    if(req.user.type=='admin'){
      var vartosend=new Array();
      var m=0;
          schedular.find({}).sort({"start":-1}).exec(function(err,plans){
            if(err){
              return err
            }
            if(!plans[0]){
                    
                patient.find({},function(errp,patients){
                    if(errp){
                      return errp
                    }
                    if(!patients[0]){
                        user.find({},function(erru,users){
                            if(erru){
                              return erru
                            }
                            if(!users[0]){

                              res.send({data:"Nothing Planned",patient:"no patient",user:"no user",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:"Nothing Planned",patient:"no patient",user:users ,'csrfToken':req.csrfToken()})

                            }

                          })

                    }else{
                        user.find({},function(erru,users){
                            if(erru){
                              return erru
                            }
                            if(!users[0]){

                              res.send({data:"Nothing Planned",patient:patients,user:"no user",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:"Nothing Planned",patient:patients,user:users ,'csrfToken':req.csrfToken()})

                            }

                          })
                    }
                  })
            }else{

                
                patient.find({},function(errp,patients){
                    if(errp){
                      return errp
                    }
                    if(!patients[0]){
                        user.find({},function(erru,users){
                            if(erru){
                              return erru
                            }
                            if(!users[0]){

                              res.send({data:plans,patient:"no patient",user:"no user",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:plans,patient:"no patient",user:users ,'csrfToken':req.csrfToken()})

                            }

                          })

                    }else{
                        user.find({},function(erru,users){
                            if(erru){
                              return erru
                            }
                            if(!users[0]){

                              res.send({data:plans,patient:patients,user:"no user",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:plans,patient:patients,user:users ,'csrfToken':req.csrfToken()})

                            }
                           })
                          }
                        })
                    }
            })
        }else{
            console.log('something here');
            var vartosend=new Array();
      var m=0;
          schedular.find({employe:req.user.mail}).sort({"start":-1}).exec(function(err,plans){
            if(err){
              return err
            }
            if(!plans[0]){
                    
                patient.find({},function(errp,patients){
                    if(errp){
                      return errp
                    }
                    if(!patients[0]){
                        user.find({},function(erru,users){
                            if(erru){
                              return erru
                            }
                            if(!users[0]){

                              res.send({data:"Nothing Planned",patient:"no patient",user:"no user",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:"Nothing Planned",patient:"no patient",user:users ,'csrfToken':req.csrfToken()})

                            }

                          })

                    }else{
                        user.find({},function(erru,users){
                            if(erru){
                              return erru
                            }
                            if(!users[0]){

                              res.send({data:"Nothing Planned",patient:patients,user:"no user",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:"Nothing Planned",patient:patients,user:users ,'csrfToken':req.csrfToken()})

                            }

                          })
                    }
                  })
            }else{

                
                patient.find({},function(errp,patients){
                    if(errp){
                      return errp
                    }
                    if(!patients[0]){
                        user.find({},function(erru,users){
                            if(erru){
                              return erru
                            }
                            if(!users[0]){

                              res.send({data:plans,patient:"no patient",user:"no user",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:plans,patient:"no patient",user:users ,'csrfToken':req.csrfToken()})

                            }

                          })

                    }else{
                        user.find({},function(erru,users){
                            if(erru){
                              return erru
                            }
                            if(!users[0]){

                              res.send({data:plans,patient:patients,user:"no user",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:plans,patient:patients,user:users ,'csrfToken':req.csrfToken()})

                            }
                           })
                          }
                        })
                    }
            })

             }
            }
          });
router.post('/ValidateEvent',function(req,res){
    if(req.isAuthenticated){
        schedular.findById({'_id':new ObjectId(req.body.data)},function(err,updated){
            console.log('we try to update');
            if(err){
              return err;
            }else{
                  updated.backgroundColor='green'
                  updated.save(function(err,result){
                    if(err)
                      return err;
                    else{
                      res.send({data:"updated",'csrfToken':req.csrfToken()})
                   }
                })
            }
          })
    }
    
    
});

router.post('/addemploye',function(req,res){
    if(req.isAuthenticated){
        console.log(req.body.data)
        if(req.body.data.type=="admin" && req.user.type!="admin"){
                res.send({data:"Vous ne pouvez pas faire ça",'csrfToken':req.csrfToken()});
            }else{
                user.find({'mail':req.body.data.mail}, function(err,user1){
                    if(err){
                        return err
                    }
                    if(user1[0]){
                        res.send({data:"existing user",'csrfToken':req.csrfToken()})
                    }else{
                    console.log(req.body.data)
                      var newUser = new user();
                      newUser.nom = req.body.data.nom.toLowerCase();
                      newUser.prenom= req.body.data.prenom.toLowerCase();
                      newUser.password = newUser.generateHash(req.body.data.password);
                      newUser.mail = req.body.data.mail.toLowerCase();
                      newUser.tel = req.body.data.tel.toLowerCase();
                      newUser.type = req.body.data.type;
                      newUser.save(function(err) {
                        if (err){
                          console.log(err);
                          res.send({data:'could not add the user','csrfToken':req.csrfToken()})
                        }else{
                           res.send({data:'done','csrfToken':req.csrfToken()}); 
                        }
                         
                            });
                    }
                })

            }
    }
    
    
});
router.post('/addpatient',function(req,res){
    if(req.isAuthenticated){
                    console.log(req.body.data)
                      var newpatient = new patient();
                      newpatient.Nom = req.body.data.Nom.toLowerCase();
                      newpatient.Origine= req.body.data.Origine.toLowerCase();
                      newpatient.doctor=req.body.data.Doctor;
                      newpatient.Raison = req.body.data.Raison;
                      newpatient.Sexe = req.body.data.gender;
                      newpatient.save(function(err) {
                        if (err){
                          console.log(err);
                          res.send({data:'could not add the user','csrfToken':req.csrfToken()})
                        }else{
                           res.send({data:'done','csrfToken':req.csrfToken()}); 
                        }
                         
                            });
                    
                }

            
    });
router.post('/getPatientSchedular',function(req,res){
   if(req.isAuthenticated){
    schedular.find({patientName:req.body.data}).sort({"start":-1}).exec(function(err,plans){
                        if(err){
                              return err
                            }
                            if(!plans[0]){

                              res.send({data:"Nothing Planned",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:plans ,'csrfToken':req.csrfToken()})

                            }
        
    })
    }
})
router.post('/getWorkerSchedular',function(req,res){
    if(req.isAuthenticated){
        schedular.find({employe:req.body.data}).sort({"start":-1}).exec(function(err,plans){
                        if(err){
                              return err
                            }
                            if(!plans[0]){

                              res.send({data:"Nothing Planned",'csrfToken':req.csrfToken()})
                            }else{

                              res.send({data:plans ,'csrfToken':req.csrfToken()})

                            }
        
    })
    }
})

router.post('/sendexcuse',function(req,res){
    if(req.isAuthenticated){
        schedular.findById({'_id':new ObjectId(req.body.data.data._id)},function(err,sch){
                        if(err){
                              return err
                            }
                            if(!sch){

                              res.send({data:"Nothing todo",'csrfToken':req.csrfToken()})
                            }else{

                             sch.excuse=req.body.data.excuse;
                             sch.save(function(err,result){
                            if(err)
                              res.send({data:"Nothing done",'csrfToken':req.csrfToken()})
                            else{
                              res.send({data:"done",'csrfToken':req.csrfToken()})
                                }
                             })

                            }
        
    })
    }
})

router.post('/validatexcuse',function(req,res){
    if(req.isAuthenticated){
        schedular.findById({'_id':new ObjectId(req.body.data._id)},function(err,sch){
                        if(err){
                              return err
                            }
                            if(!sch){

                              res.send({data:"Nothing todo",'csrfToken':req.csrfToken()})
                            }else{

                             sch.traite="true";
                             sch.save(function(err,result){
                            if(err)
                              res.send({data:"Nothing done",'csrfToken':req.csrfToken()})
                            else{
                              res.send({data:"done",'csrfToken':req.csrfToken()})
                                }
                             })

                            }
        
    })
    }
})

router.post('/sendingtest', function(req, res, next) {
  console.log("i have been calleed");
  res.send({data:"Testing"});
})
/*Loging member. */
/*router.post('/memberlogin',function(req, res, next){
  console.log("trying to login");
  res.send({data:"Testing login"});
})*/

router.post('/memberlogin', function(req, res, next) {
          console.log(req.body);
  passport.authenticate('local-login', function(err, user, info) {

    if (err) { 
        console.log('error')
        return res.send({data:"error"});
    }
    if (!user) { 
        console.log("notfound");
        return res.send({data:"req"});
               }
    req.logIn(user, function(err) {
      if (err) { 
          console.log('other error')
          return res.send({data:'wrong password'}); 
      }
      return res.send({data:user});;
    });
  })(req, res, next);
});





router.post('/send-mail',function(req,res){
  console.log('whaaat');
  var from = 'kharratali@gmail.com';
  var subject = req.body.mailSubject;
  var body = req.body.mailBody;

  var mailOptions = {
    from: from,
    to: "kharratali@hotmail.com",
    subject: subject,
    //text: body,
    html:body
  };
  sendMail(mailOptions);
  res.end("done");
});


function sendMail(mailOptions,res){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'kharratali@gmail.com', // Your email id
      pass: 'fatma@90' // Your password
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

module.exports = router;
