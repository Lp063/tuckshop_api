var config      =   require('../config/config');
var model_sales =   require('../model/sales');
var express     =   require('express')
var router      =   express.Router()

router.post('/', async function(req, res) {
    var response={
        success:0,
        message:""
    };
    await model_sales.insertSalesData(req.body,(error,modelResponse)=>{
        if (modelResponse.affectedRows === req.body.sales.listOfItems.length ) {
            response.success=1;
        } else {
            response.message=modelResponse.message;
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response)); 
    });
});


module.exports = router