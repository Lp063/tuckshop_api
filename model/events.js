var config      =   require('../config/config');

//get event details for waiter
module.exports.waiterEvent = (input,callback)=>{
    var query='select * from tbl_event where `manager_id`='+config.mysqlConnection.escape(input.manager_id)+' and `active`=1 ';
    var query = config.mysqlConnection.query(query,function(error, results, fields){
        callback(null,results);
    });
}