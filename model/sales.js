var config      =   require('../config/config');

module.exports.insertSalesData = (input,callback)=>{
    
    var salesValues = input.sales.listOfItems.map((singleItem)=>{
        return [singleItem.id, singleItem.purchaseQuantity, input.waiterId, input.eventId];
    });console.log(salesValues);
    
    var bulkInsertQuery = "insert into `tbl_sales` (item_id,quantity,user_id,event_id) values?";
    config.mysqlConnection.query(bulkInsertQuery,[salesValues],function(error, results, fields){
        if (results) {
            callback(null,results);
        }
        if (error) {
            callback(null,error);
        }
    });
}