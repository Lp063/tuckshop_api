module.exports.createTeam=(insertObject,callback)=>{
    var query='insert into `teams` SET ?';
    config.mysqlConnection.connect();
    var query = config.mysqlConnection.query(query,insertObject,function(error, results, fields){
        callback(null,results);
    });
    config.mysqlConnection.end();
}