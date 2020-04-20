const express   =   require('express');
const jwt       =   require('jsonwebtoken');
var cors        =   require('cors');
const app       =   express();
var bodyParser  =   require('body-parser');

app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var users       =   require('./model/users');
var teams       =   require('./model/teams');


app.post('/api/login',(req,res)=>{
    var data={
        email:req.body.loginid,
        password:req.body.loginpass
    };
    response = users.authentication(data,function(err,data){
        res.setHeader('Content-Type', 'application/json');
        const thisUser = data[0];
        jwt.sign({userData:thisUser},'kamakazi',(err,token)=>{
            res.json({token});
        });
    });
});

//Users API
app.get('/api/getAllUsers',(req,res)=>{
    response = users.getAllUsers(function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});

app.get('/api/uniqueEmailCheck',(req,res)=>{
    response = users.uniqueEmailValidator(req.body,function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    });
});

app.post('/api/addUsers',(req,res)=>{
    /* {
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

//team API
app.post('/api/createTeam', verifyToken,(req,res)=>{
    jwt.verify(req.token,'kamakazi',(error, authData)=>{
        if (error) {
            res.sendStatus(403);
        } else {
            res.json({
                authData,
                message:" team Created"
            });
        }
    });
    /* response = users.createTeam(req.body,function(err,data){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));  
    }); */
});


function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader == "undefined"){
        res.sendStatus(403);
    }else{
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
}

app.listen(4000,()=>{
    console.log("listening on port 4000");
});