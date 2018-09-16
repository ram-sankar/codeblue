const express = require('express');
const app = express();
const url_redirect = require('url');

var User = require('../models/user');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ram:madhumitha123@ds151602.mlab.com:51602/codebluev3";

/*mongo shell

mongo ds151602.mlab.com:51602/codebluev3 -u ram -p madhumitha123
*/

/*
- login get-post
- register get-post
- home
- ...
- logout
*/

app.get('/', (req,res) =>{   
    var passedVariable = req.query.valid;
        req.sucess_msg = passedVariable;
    if(passedVariable){
        res.render('login',{
            title:"login",
            query:passedVariable
        });
    }
    else{
        req.sucess_msg = passedVariable;
        res.render('login',{
            title:"login",
            query:"nil"
        });
    }   
});

 
app.post('/',(req, res) =>{
    var username = req.body.username;
	var password = req.body.password;
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("codebluev3");                 
        
        dbo.collection("doctors").find({username: username, password: password}).toArray(function(err, result) {
        if (err) throw err;
          
            if(!result[0]) {
                res.render('login',{
                title:"login",
                query:"error"
                });
            }
            else{
                req.session.user = result[0];
                res.redirect(url_redirect.format({
                pathname:"/home",
                query: { title:"nil" }
                }));
            } 
            
        db.close();
        });    
    });
    
});

app.get('/home', (req,res) =>{      
  res.render('home',{
            title:"home",
            query:"nil"
        });   
});


app.get('/appoint', (req,res) =>{      
  res.render('appoint',{
            title:"appoint",
            query:"nil"
        });   
});


app.get('/patient-view', (req,res) =>{      
  res.render('patient-view',{
            title:"View Report",
            query:"nil"
        });   
});


app.get('/patient-list', (req,res) =>{      
 
  MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("codebluev3");
          dbo.collection("patients").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.render('patient-list',{
                title:"Patient List",
                products:result
            });
            
            db.close();
          });
        }); 
});

app.get('/patient-rep', (req,res) =>{      
  res.render('patient-rep',{
            title:"Patient Report",
            query:"nil"
        });   
});

app.post('/patient-rep',(req,res) =>{
  var pat_id = req.body.pat_id;
  var name = req.body.name;
  var phone = req.body.phone;
  var visit = req.body.visit;
  var age = req.body.age;
  var gender = req.body.gender;
  var reason = req.body.reason;
  var medication = req.body.medication;
  var remarks = req.body.remarks;
  
  
    var newreport = new User.report({
		pat_id: pat_id,
		name: name,
		phone: phone,
		visit: visit,
        age :age,
        gender: gender,
		reason: reason,
		medication: medication,
		remarks: remarks
		});
        
        User.report.create(newreport, function(err, newreport) {
        if(err) return next(err);             
        });
  
  
     res.redirect(url_redirect.format({
                pathname:"/payments-invoice"
                }));
  
  
});


app.get('/payments-invoice', (req,res) =>{      
 
  
   MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("codebluev3");                 
        
        dbo.collection("complete_reports").find({}).sort({_id:-1}).limit(1).toArray(function(err, result) {          
        if (err) throw err;
          
            res.render('invoice',{
                title:"Patient Invoice",
                products:result
            });
            
        db.close();
        });    
    });
  
  
     
  
});





app.get('/logout', function (req, res) {
  req.session.destroy();
  var string = "you have sucessfully logged out";
  res.redirect('/?valid=' + string);
});

module.exports = app;