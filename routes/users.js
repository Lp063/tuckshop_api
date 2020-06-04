const express   =   require('express');
const router    =   express.Router();

var users       =   require('../model/users');

router.post('/add', (req,res)=>{
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