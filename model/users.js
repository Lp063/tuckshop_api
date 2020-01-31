var config = require('../config/config');


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

module.exports.addUser=(data)=>{
    var rows=[];
    config.mysqlConnection.connect();
    config.mysqlConnection.query('insert into users SET ?',data,function(error, results, fields){
        console.log({error,results,fields});
        callback(null,{error,results,fields});
    });
    config.mysqlConnection.end();
}