var users       =   require('./model/users');
const express   =   require('express');
const app       =   express();
var bodyParser  =   require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/',(req,res)=>{
    response = users.getAllUsers(function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});

app.get('/addUsers',(req,res)=>{
    /* var insertObject = {
        "name":"tushar",
        "username":"tusharc",
        "email":"tushar@unboxsocial.com",
        "password":"876545678"
    }; */
    
    response = users.addUsers(req.body,function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});

app.listen(4000,()=>{
    console.log("listening on port 4000");
});