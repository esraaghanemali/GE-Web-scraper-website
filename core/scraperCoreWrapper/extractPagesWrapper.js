const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');
const Promise = require('bluebird');
const requestMiddleware = require('../middlewares/scrape-request')
const statusMiddleware = require('../middlewares/status')

var extractService = require('../scraperCore/extractor/services/extract_pages')


module.exports =
    {

        startEctract: function (url) {

            return new Promise(function (resolve, reject)
            {
                extractService.extract(url,function (result)
{
   if(result.code==1)
   {
       if(global.finish)
       resolve()
   }
   else
   {
       reject()
   }
    })
            })


        }


    }
