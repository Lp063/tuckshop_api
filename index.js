var users       =   require('./model/users');
const express   =   require('express');
const app       =   express();

app.get('/',(req,res)=>{

    var response=false;
    
    response = users.getAllUsers(function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});

app.listen(3000,()=>{
    console.log("listening on port 3000");
});