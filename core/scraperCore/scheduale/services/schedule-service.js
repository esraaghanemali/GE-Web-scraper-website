var schedule = require('node-schedule')
const Promise = require('bluebird');

var globals = require('../../global-variables')

globals.gefineGlobals()


var parseWrapper = require( '../../../scraperCoreWrapper/parseXmlFileWrapper')
var extractWrapper = require( '../../../scraperCoreWrapper/extractPagesWrapper')
var exportWrapper = require('../../../scraperCoreWrapper/exportDataWrapper')
var writeFileWrapper = require('../../../scraperCoreWrapper/writeFileWrapper')

var requests = require('../../../middlewares/scrape-request')
var serial = require('./serialProcessing')

var config =require( global.coreRoot + '/config/config')

var delay = config.schedule.time
module.exports = schedule.scheduleJob(delay,function ()
{
    requests.getPendingScrapeRequest().then(function (data)
    {
        var i =0
        console.log('in scedual '+data.length)
        serial.process(i,data)

    })

})

//
//     schedule.scheduleJob('1 * * * * *',function ()
// {
//     requests.getPendingScrapeRequest().then(function (data)
//     {
//         var i =0
//         console.log('in scedual '+data.length)
//         serial.process(i,data)
//
//     })
//
// })