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

app.post('/addUsers',(req,res)=>{console.log(req);
    //localhost:4000/addUsers?name=Nash&username=nascar&email=nascar@gmail.com&password=12345678914
    response = users.addUsers(req.query,function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});

app.listen(4000,()=>{
    console.log("listening on port 4000");
});