var config = require('../config/config');
var fs = require('fs');
var hogan = require('hogan.js');

postmarkEmailService = (data,html,attachments) =>{
    var emailTrigger = config.emailClient.sendEmail({
        "From": data.emailDefaults.postMarkFrom,
        "Tag": data.tag,
        "TrackOpens": true,
        "TrackLinks": "HtmlAndText",
        "To": data.to,
        "Subject": data.subject,
        "HtmlBody": html
    });
    return emailTrigger;
}

sendmail = (data,html,attachments) => {

    data.emailDefaults = config.emailDefaults;
    
    var compiledTemplate = hogan.compile(html);
    var completeTemplate = compiledTemplate.render(data);

    return postmarkEmailService(data,completeTemplate,attachments);
}

module.exports.accountCreatedEmail = async(data, callback) => {
    var email_header = fs.readFileSync('./comm_templates/email/email_header.html','utf-8');
    var email_footer = fs.readFileSync('./comm_templates/email/email_footer.html','utf-8');
    var accountCreated =fs.readFileSync('./comm_templates/email/accountCreated.html','utf-8');

    data.subject="Welcome to The Game Plan";
    data.tag="accountCreated";

    var emailResponse = await sendmail(data,email_header+accountCreated+email_footer);
    return emailResponse;
}