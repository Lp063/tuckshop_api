var users       =   require('./model/users');
const express   =   require('express');
//var cors        =   require('cors');
const app       =   express();
var bodyParser  =   require('body-parser');

//app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/',(req,res)=>{
    response = users.getAllUsers(function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});

app.post('/addUsers',(req,res)=>{
    /* var insertObject = {
            "name":"Tanmay",
            "username":"tanmayb",
            "email":"tanmayb@unboxsocial.com",
            "password":"5787543444"
        }; */
    
    response = users.addUsers(req.body,function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});

app.listen(4000,()=>{
    console.log("listening on port 4000");
});