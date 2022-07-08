const express   =   require('express');
const jwt       =   require('jsonwebtoken');
var cors        =   require('cors');
const app       =   express();
var config      =   require('./config/config');

app.use(cors());
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use("/email/images",express.static(__dirname + '\\assets\\images\\comm_mail'));
app.use("/images/food",express.static(__dirname + '\\assets\\images\\public\\food'));

//var email       =   require('./model/comm_email');
var users       =   require('./model/users');

var authentication  =   require('./controller/authentication');
var foodItems       =   require('./controller/foodItems');
var sales           =   require('./controller/sales');

app.use('/authentication',authentication);
app.use('/foodItems',verifyToken,foodItems);
app.use('/sales',sales);

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
        response = users.authentication(data,function(err,uaseAuthData){ 
            res.setHeader('Content-Type', 'application/json');
            const thisUser = uaseAuthData[0];
            if (uaseAuthData.length) {
                jwt.sign({userData:thisUser},config.jwtPrivateKey,{expiresIn:60*60},(err,token)=>{
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


function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader == "undefined"){
        res.sendStatus(403);
    }else{
        const bearer        = bearerHeader.split(' ');
        const bearerToken   = bearer[1];
        //const jwtVerify     = jwt.verify(bearerToken, config.jwtPrivateKey);

        var verified = new Promise((resolve,reject) => {
            jwt.verify(bearerToken, config.jwtPrivateKey,(err,decode)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(decode)
                }
            });
        }).then( success => {
            req.token = success;
            next();
        }).catch( error => {
            req.token = null;
            var data={
                message:"invalid token"
            }
            res.status(404).send(data).end();
        });

        // if(jwtVerify){
        //     req.token = jwtVerify.userData;
        //     next();
        // }else{
        //     req.token = null;
        //     res.sendStatus(404).end();
        // }
    }
}

process.on("unhandledRejection",err =>{
    console.log(err);
})

app.listen(4000,()=>{
    console.log("listening on port 4000");
});