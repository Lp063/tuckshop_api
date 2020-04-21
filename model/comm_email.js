var config = require('../config/config');

module.exports.accountCreatedEmail = (data) => {
    config.emailClient.sendEmail({
        "From": "lohit@wire.business",
        "To": "lohit@unboxsocial.com",
        "Subject": "Test",
        "TextBody": "Hello from Postmark!"
    });
}