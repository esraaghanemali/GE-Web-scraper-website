const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');
const requestMiddleware = require('../middlewares/scrape-request')

const statusMiddleWare = require('../middlewares/status')

var parse = require('../scraperCore/scraper-engine/services/parseXml')


module.exports =
    {

    parseXmlFile: function (request) {

        return new Promise(function (resolve, reject) {
            parse.parseFile(request.model.fileLocation,function (result)
            {
                if(result.code==1)
                {
                    console.log('done in wraper')

                    resolve(request)

                }
                else
                {
                    console.log('failed in wraper')

                    console.log(result.msg)
                    requestMiddleware.updateScrapeRequest(request._id,
                        'message','error in model file Please request a correct model file')
                        .then(function (data) {

                        }).catch(function () {
                        reject()
                    })
                    statusMiddleWare.getStatusByName('Failed').then(function (data) {
                        requestMiddleware.changeScrapeRequestStatus(request._id,data)

                    }).catch(function (err) {
                        console.log(err)
                        reject()

                    })
                }


            })

        })


    }


}
