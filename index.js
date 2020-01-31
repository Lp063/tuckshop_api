var users       =   require('./model/users');
const express   =   require('express');
const app       =   express();

app.get('/',(req,res)=>{
    users.getAllUsers(function(err,data){
        console.log(data);
        res.json(data); 
    });
});

app.get('/addUser',(req,res)=>{
    var data={
        name:'jack',
        email:'jack@jumping.com',
        username:'jackinthebox',
        password:'jumpingJack'
    };
    users.addUser(function(err,data){
        console.log(data);
        res.json(data); 
    });
});

app.listen(4000,()=>{
    console.log("listening on port 4000");
});