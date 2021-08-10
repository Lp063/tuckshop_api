const dotenv    =   require('dotenv');
const path = require('path');
var mysql       =   require('mysql');
const util      =   require('util');
const fs = require('fs');
//var postmark    =   require("postmark");
dotenv.config({path:path.join(__dirname,"../.env")});

const baseurl = "http://localhost:4000";
exports.jwtPrivateKey = "kamakazi";

const mysqlConnection = mysql.createPool({
    host     : process.env.DB_MYSQL_HOST,
    user     : process.env.DB_MYSQL_USER,
    password : process.env.DB_MYSQL_PASSWORD,
    database : process.env.DB_MYSQL_DATABASE
});



/* mysqlConnection.connect((err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("mysql connected...");
    }
}); */

//module.exports.emailClient = new postmark.Client(process.env.COMM_EMAIL_POSTMARK_API_TOKEN);

var emailDefaults={
    brandUrl:baseurl,
    brandName:"The Game Plan",
    postMarkFrom:"lohit@wire.business",
    brandInstagramLink:"http://instagram.com",
    brandfacebookLink:"http://facebook.com",
    brandTwitterLink:"http://twitter.com",
    brandYoutubeLink:"http://youtube.com",
    helpDeskEmail:"helpdesk@gameplan.com",
    privacyPolicy:"http://google.com",
    reportSpam:"htttp://reportSpam.com",
    mailTypeTransaction:{
        source:"hello@explore.gameplan.com"
    },
    images:{
        imageBaseUrl:"/email/images/",
        header:"header_1.png"
    },
};

exports.emailDefaults = emailDefaults;
exports.mysqlConnection =   mysqlConnection;