
var nodemailer = require('nodemailer');
var fs = require('fs')
// mailer.SMTP = {
//     host: 'www.gmail.com',
//     port:587,
//     use_authentication: true,
//     user: 'esraa.ghanem.ali@gmail.com',
//     pass: 'esraa 9874123456'
// };
// var transporter = mailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'esraa.ghanem.ali@gmail.com',
//         pass: 'esraa 9874123456'
//     }
// });
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'esraa.ghanem.ali@gmail.com',
        pass: 'esraaAli9874123456'
    }
}));
module.exports = {
    sendFileEmail: function (request,filePath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, function (err, data) {
var userMail = request.user.email
                var username = request.user.firstName
                transport.sendMail({
                    from: 'esraa.ghanem.ali@gmail.com',
                    to: userMail,
                    subject: 'youe Data!',
                    body: 'hello '+username+', thank you for using our service,' +
                    'We are pleased to work with you, ou can find your data in the attachment',
                    attachments: [{'filename': 'attachment.txt', 'content': data}]

                }, function(err, success) {
                        if (err) {
                           reject(err)
                        }
resolve()});

                // mailer.send_mail({
                //     sender: 'esraa.ghanem.ali@gmail.com',
                //     to: userMail,
                //     subject: 'Attachment!',
                //     body: 'mail content...',
                //     attachments: [{'filename': 'attachment.txt', 'content': data}]
                // }), function(err, success) {
                //     if (err) {
                //         console.log(err)
                //     }
                //
                // }
            });
        })

    }

}