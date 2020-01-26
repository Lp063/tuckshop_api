var mysql       =   require('mysql');

module.exports.mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodeapp',
    password : 'nodeapp',
    database : 'myflaskapp'
});