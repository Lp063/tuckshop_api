const jwt                   =   require('jsonwebtoken');
var config                  =   require('../config/config');
var model_authentication    =   require('../model/authentication');
var model_event             =   require('../model/events');
var express                 =   require('express');
var router                  =   express.Router();

router.post('/login', async function(req, res) {
    
    res.setHeader('Content-Type', 'application/json');
    var response={
        success:0,
        message:"",
        data:{}
    };
    var data ={
        email   :   req.body.email,
        password:   req.body.password
    };
    await model_authentication.userDetails(data,(error,modelResponse)=>{
        var detailsObject = modelResponse[0];
        if (modelResponse.length) {

            switch (detailsObject.tbl_user_type_id) {
                case 2:
                    response.success        =   1;
                    response.data           =   detailsObject;
                    res.end(JSON.stringify(response));
                    break;
                case 3:
                    model_event.waiterEvent({manager_id:detailsObject.senior_id},(error,eventModelResponse)=>{
                        
                        if (eventModelResponse.length > 1) {
                            response.success        =   0;
                            response.message        =   "The Manager has more than one event is currently active.";
                            res.end(JSON.stringify(response));
                        } else {
                            response.success        =   1;
                            detailsObject.eventData =   eventModelResponse[0];
                            response.data           =   detailsObject;
                            res.end(JSON.stringify(response));
                        } 
                    });
                    break;
            
                default:
                    res.end(JSON.stringify(response));
                    break;
            }

            
        }else{
            response.message    =   "Please check Username and Password";
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        }
    });
});


module.exports = router