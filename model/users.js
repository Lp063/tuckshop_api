var config = require('../config/config');


module.exports.authentication=(input,callback)=>{
    var query='SELECT * FROM `users` WHERE `email` ='+config.mysqlConnection.escape(input.email)+' and `password` ='+config.mysqlConnection.escape(input.password)+' ';
    config.mysqlConnection.connect();
    var query = config.mysqlConnection.query(query,function(error, results, fields){
        callback(null,results);
    });
    config.mysqlConnection.end();
}

module.exports.getAllUsers=(callback)=>{
    var rows=[];
    config.mysqlConnection.connect();
    config.mysqlConnection.query('SELECT * FROM `users`',function(error, results, fields){
        if (results) {
            results.map(function($object){
                rows.push($object);
            });
            callback(null,rows);
        }
    });
    config.mysqlConnection.end();
}

module.exports.addUsers=(insertObject,callback)=>{
    var query='insert into `users` SET ?';
    config.mysqlConnection.connect();
    var query = config.mysqlConnection.query(query,insertObject,function(error, results, fields){
        callback(null,results);
    });
    config.mysqlConnection.end();
}

module.exports.uniqueEmailValidator=(input,callback)=>{
    var query='SELECT COUNT(*) as count FROM `users` WHERE `email` like '+config.mysqlConnection.escape(input.email);
    config.mysqlConnection.connect();
    var query = config.mysqlConnection.query(query,function(error, results, fields){
        callback(null,results);
    });
    config.mysqlConnection.end();
}