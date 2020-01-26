var config = require('../config/config');


module.exports.getAllUsers=(callback)=>{
    var rows=[];
    config.mysqlConnection.connect();
    var query = config.mysqlConnection.query('SELECT * FROM `users`',function(error, results, fields){
        if (results) {
            results.map(function($object){
                rows.push($object);
            });
            callback(null,rows);
        }
    });
    config.mysqlConnection.end();
}