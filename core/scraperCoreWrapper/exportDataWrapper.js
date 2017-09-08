const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');
const requestMiddleware = require('../middlewares/scrape-request')
const statusMiddleware = require('../middlewares/status')

var exportService = require('../scraperCore/exporter/services/export-data')


module.exports =
    {

        exportData: function (formateId) {

            return new Promise(function (resolve, reject)
            {
                exportService.export(formateId,function (result)
                {
                    if(result.code==1)
                    {

                            resolve({type:formateId,content:result.msg})
                    }
                    else
                    {
                        reject(esult.msg)
                    }

                })
            })


        }


    }
