
var nodemailer = require('nodemailer');
var fs = require('fs')
var smtpTransport = require('nodemailer-smtp-transport');
// var parseXlsx = require('excel');
var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
     port: 465,
    auth: {
        user: 'ge.webscraper@gmail.com',
        pass: 'gewebscraperwebsite'
    }
}));
module.exports = {
    sendFileEmail: function (request,filePath) {
                console.log('in send data')

        return new Promise(function (resolve, reject) {


               var userMail = request.user.email
                var username = request.user.firstName
                                // var username = 'esraa'

                transport.sendMail({
                    from: 'ge.webscraper@gmail.com',
                    to: userMail,
                    subject: 'your Data.',
                    text: 'Hello '+username+', thank you for using our service,' +
                    'We are pleased to work with you, you can find your data in the attachment',

                    attachments: [{filename: 'Result', path: filePath}],
                      

                }, function(err, success) {
                        if (err) {
                           reject(err)
                        }
resolve()});

    
           
        })

    }

}