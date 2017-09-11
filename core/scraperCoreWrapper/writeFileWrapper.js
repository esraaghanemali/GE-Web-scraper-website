const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');
const requestMiddleware = require('../middlewares/scrape-request')
const statusMiddleware = require('../middlewares/status')

var writeFileService = require('../scraperCore/exporter/services/write-file')


module.exports =
    {

        writeFile: function (type,content,fileName) {

            return new Promise(function (resolve, reject)
            {
                writeFileService.write(type,content,fileName,function (result)
                {
                    if(result.code==1)
                    {

                            resolve(result.msg)
                        // console.log(result.msg)

                    }
                    else
                    {
                        console.log(result.msg)
                        reject(result.msg)
                    }
                })
            })


        }


    }
