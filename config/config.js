var mysql       =   require('mysql');
var postmark    =   require("postmark");

module.exports.mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodeapp',
    password : 'nodeapp',
    database : 'myflaskapp'
});

module.exports.emailClient = new postmark.Client("");