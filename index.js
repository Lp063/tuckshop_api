const express   =   require('express');
const jwt       =   require('jsonwebtoken');
var cors        =   require('cors');
const app       =   express();
var bodyParser  =   require('body-parser');

app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use("/email/images",express.static(__dirname + '\\assets\\images\\comm_mail'));

var email       =   require('./model/comm_email');
var users       =   require('./model/users');
var teams       =   require('./model/teams');


app.post('/api/login',(req,res)=>{
    var invalidLogin={
        message:"Invalid Credentials"
    };

    if (typeof req.body.email == "undefined" || req.body.password == "undefined") {
        res.json(invalidLogin);
    } else {
        var data={
            email:req.body.email,
            password:req.body.password
        };
        response = users.authentication(data,function(err,data){ 
            res.setHeader('Content-Type', 'application/json');
            const thisUser = data[0];
            if (data.length) {
                jwt.sign({userData:thisUser},'kamakazi',{expiresIn:60*60},(err,token)=>{
                    /* console.log(jwt.decode(token).userData)
                    {
                        id: 63,
                        firstName: 'Lohit',
                        lastName: 'P',
                        contact: '9875647382',
                        email: 'double@gmail.com',
                        password: 'aviator'
                    } */
                    res.json({token});
                });
            } else {
                res.json(invalidLogin);
            }
        });
    }
    
});

//Users API
app.get('/api/user/getAllUsers',(req,res)=>{
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


//User Routes
app.get('/api/user',verifyToken,(req,res)=>{
    response = users.getAllUsers(req.body,function(err,data){
        var response = {
            success:0,
            data:{}
        };

        if (err) {
            response.data   =   err;
        } else {
            response.success    =   1;
            response.data       =   data;
        }

        res.setHeader('Content-Type', 'application/json');
        res.json({
            response
        });
    }); 
});

app.post('/api/user',(req,res)=>{
    /* {
        "firstName":"Sean",
        "lastName":"Clair",
        "contact":"9875647382",
        "email":"lohit@unboxsocial.com",
        "password":"5787543444"
    }; */
    response = users.addUser(req.body,function(err,data){
        var response = {
            success:0,
            data:{}
        };

        if (data.insertId !==0) {
            response.success = 1;
            response.data = data;
        }
        
        var emailData={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            to:req.body.email,
            password:req.body.password
        };
        email.accountCreatedEmail(emailData);

        res.setHeader('Content-Type', 'application/json');
        res.json({
            response
        });
    }); 
});

app.get('/api/user/:userId',verifyToken, async (req,res)=>{
    
    addUser = await users.getUserDetails({id:req.params.userId},function (err,data){
        //console.log(data);
        res.json({
            data
        });
    });
});

app.put('/api/user/:userId',verifyToken, async (req,res)=>{
    var updateData={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        contact:req.body.contact,
        /* email:req.body.email,
        password:req.body.password */
    }
    
    updateUser = await users.updateUser({id:req.body.id},updateData,function (err,data){
        var response={
            success:0,
            message:""
        };

        if (data.affectedRows) {
            response.success=1;
        } else {
            response.message="Could not update User"
        }
        res.json({
            response
        });
        
    });
});

app.delete('/api/user/:userId',verifyToken, async (req,res)=>{
    deleteUser = await users.deleteUser({id:req.params.userId},function (err,data){
        res.json({
            data
        });
    });
});

//team API
app.post('/api/team', verifyToken,(req,res)=>{
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