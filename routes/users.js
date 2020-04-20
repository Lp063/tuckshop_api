var users       =   require('../model/users');
const express   =   require('express');
const app       =   express();

app.get('/getAllUsers',(req,res)=>{
    response = users.getAllUsers(function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});

app.post('/addUsers',(req,res)=>{
    //localhost:4000/addUsers
    var insertObject={
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
    };
    response = users.addUsers(insertObject,function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});