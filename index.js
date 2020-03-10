var users       =   require('./model/users');
const express   =   require('express');
var cors        =   require('cors');
const app       =   express();
var bodyParser  =   require('body-parser');

app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

app.listen(4000,()=>{
    console.log("listening on port 4000");
});