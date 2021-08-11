var config          =   require('../config/config');
const jwt           =   require('jsonwebtoken');
const foodItems     =   require('../model/foodItems');
var express         =   require('express');
const multer        =   require('multer');
var router          =   express.Router();
const path          =   require('path');

var storage = multer.diskStorage({ 
  destination: __dirname+'/../assets/images/public/food/',
  filename:function(req, file, cb){
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
});

const upload = multer({
  storage:storage
}).single("image",2);

// POST /fooditems
/*
  Add food item
*/
const uploadFoodItemImage = multer({
  storage:storage
});//.single("image",2);

router.post('/', 
  uploadFoodItemImage.array("image",4),
  async function (req, res) {//console.log("REQ",req.files);
  res.setHeader('Content-Type', 'application/json');
  var response={
    success:0,
    data:[],
    message:""
  };
  
  try {
    
    let construct={
      itemId:null,
      name:req.body.name,
      price:req.body.price,
      serving:req.body.serving,
      images:req.files,
      eventId:req.body.eventid
    };
    
    const insertState = await new foodItems(construct).addOne();
    //const insertState = {};
    if (insertState) {
      response.success=1;
      response.data = insertState;
    }
    res.end(JSON.stringify(response));
  } catch (error) {
    response.message = error;
    res.end(JSON.stringify(response));
  }
});

// GET /fooditems
/*
  GET multiple food items
*/
router.get('/', async function (req, res) {

  var response={
    success:0,
    data:[],
    message:""
  };

  try {
    const responseData = await new foodItems({}).get();
    if (responseData.length) {
      var items = responseData.map(function(singleItem){
        var temp={
          id:singleItem.id,
          title:singleItem.name,
          serving:singleItem.serving,
          rate:parseInt(singleItem.price),
          image:singleItem.img_src,
          currency:singleItem.currency
        };
        return temp;
      });
      response={
        success:1,
        data:items
      }
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify(response));
  } catch (error) {
    
    response.message=error;
    res.setHeader('Content-Type', 'application/json');
    res.status(404).end(JSON.stringify(response));
  }
  
  
  
  
   
  /* response = model_foodItems.getFoodItems(req.body,function(err,data){
    var response={
      success:0,
      data:[]
    };
    if (err) {
      console.log(err,data);
    } else {
      if (data.length) {
        var items = data.map(function(singleItem){
          var temp={
            id:singleItem.id,
            title:singleItem.name,
            serving:singleItem.serving,
            rate:parseInt(singleItem.price),
            purchaseQuantity:0,
            currency:singleItem.currency
          };
          return temp;
        });
        response={
          success:1,
          data:items
        }
      }
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));  
  }); */
});

// PUT /fooditems
/*
  update multiple food items
*/

//DELETE /fooditems
/*
  delete all food items
*/


// GET /fooditems/{:id}
/*
  Get food item by ID
*/
router.get('/:id', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var response={
    success:0,
    data:[],
    message:""
  };
  
  try {
    const insertState = await new foodItems({itemId:req.params.id}).getOne();

    if (insertState.length) {
      response.success=1;
      response.data = insertState;
      res.status(200).end(JSON.stringify(response));
    }else{
      res.status(404).end(JSON.stringify(response));
    }
  } catch (error) {
    response.message = error;
    res.status(404).end(JSON.stringify(response));
  }
});



// PUT /fooditems/{:id}
/*
  update food item by ID
*/
router.put('/:id', upload, async function (req, res) {
  
  res.setHeader('Content-Type', 'application/json');
  var response={
    success:0,
    data:[],
    message:""
  };
  let construct={
    itemId:req.params.id,
    name:req.body.name,
    price:req.body.price,
    serving:req.body.serving
  };
  try {
    const updateStatus = await new foodItems(construct).updateOne();

    if (updateStatus.affectedRows >= 1) {
      response.success=1;
      response.data = updateStatus;
      res.status(200).end(JSON.stringify(response));
    }else{
      res.status(404).end(JSON.stringify(response));
    }
  } catch (error) {
    response.message = error;
    res.status(404).end(JSON.stringify(response));
  }
});

// DELETE /fooditems/{:id}
/*
  delete food item by ID
*/
router.delete('/:id', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var response={
    success:0,
    data:[],
    message:""
  };
  
  try {
    const foodItemsObj = new foodItems(req.params.id);
    const deleteState = await foodItemsObj.deleteOne();

    if (typeof deleteState != null) {
      response.success=1;
      response.data = deleteState;
      res.status(200).end(JSON.stringify(response));
    }else{
      res.status(404).end(JSON.stringify(response));
    }
  } catch (error) {
    response.message = error;
    res.status(404).end(JSON.stringify(response));
  }
});

module.exports = router