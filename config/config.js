const dotenv    =   require('dotenv');
var mysql       =   require('mysql');
var postmark    =   require("postmark");

dotenv.config();

module.exports.mysqlConnection = mysql.createConnection({
    host     : process.env.DB_MYSQL_HOST,
    user     : process.env.DB_MYSQL_USER,
    password : process.env.DB_MYSQL_PASSWORD,
    database : process.env.DB_MYSQL_DATABASE
});

module.exports.emailClient = new postmark.Client(process.env.COMM_EMAIL_POSTMARK_API_TOKEN);

var emailDefaults={
    brandUrl:"google.com",
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
    }
};

exports.emailDefaults = emailDefaults;