var config = require('../config/config');


module.exports.authentication=(input,callback)=>{
    var query='SELECT * FROM `users` WHERE `email` ='+config.mysqlConnection.escape(input.email)+' and `password` ='+config.mysqlConnection.escape(input.password)+' ';
    var query = config.mysqlConnection.query(query,function(error, results, fields){
        callback(null,results);
    });
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

module.exports.getUserDetails= async (dataObject,callback)=>{
    var query='SELECT * FROM `users` where id = '+dataObject.id;//console.log(query);return;
    var query = await config.mysqlConnection.query(query,function(error, results, fields){
        callback(null,results[0]);
    });
};

module.exports.addUser= async (insertObject,callback)=>{
    var query='insert into `users` SET ?';
    var query = await config.mysqlConnection.query(query,insertObject,function(error, results, fields){
        callback(null,results);
    });
}

module.exports.deleteUser= async (insertObject,callback)=>{
    var query='DELETE FROM `users` WHERE ?';
    var query = await config.mysqlConnection.query(query,insertObject,function(error, results, fields){
        callback(null,results);
    });
}

module.exports.uniqueEmailValidator=(input,callback)=>{
    var query='SELECT COUNT(*) as count FROM `users` WHERE `email` like '+config.mysqlConnection.escape(input.email);
    config.mysqlConnection.connect();
    var query = config.mysqlConnection.query(query,function(error, results, fields){
        callback(null,results);
    });
    config.mysqlConnection.end();
}