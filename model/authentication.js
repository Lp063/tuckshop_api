var config      =   require('../config/config');

module.exports.userDetails = (input,callback)=>{
    var query='SELECT * FROM `tbl_users` WHERE `email` ='+config.mysqlConnection.escape(input.email)+' and `password` ='+config.mysqlConnection.escape(input.password)+' ';
    var query = config.mysqlConnection.query(query,function(error, results, fields){
        callback(null,results);
    });
}

module.exports.getDetailsForUserType = (input,callback)=>{
    var query='SELECT * FROM `tbl_users` WHERE `email` ='+config.mysqlConnection.escape(input.email)+' and `password` ='+config.mysqlConnection.escape(input.password)+' ';
    var query = config.mysqlConnection.query(query,function(error, results, fields){
        callback(null,results);
    });
}