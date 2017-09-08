

var parseWrapper = require( '../../../scraperCoreWrapper/parseXmlFileWrapper')
var extractWrapper = require( '../../../scraperCoreWrapper/extractPagesWrapper')
var exportWrapper = require('../../../scraperCoreWrapper/exportDataWrapper')
var writeFileWrapper = require('../../../scraperCoreWrapper/writeFileWrapper')
var sendMail = require('./sendData')
var requests = require('../../../middlewares/scrape-request')
var status = require('../../../middlewares/status')
var extractedData = require('../../../middlewares/extracted-data')
 function serialProcessing(i,arrayofRequests) {
console.log('in the process'+i)
     console.log('in the process length'+ arrayofRequests.length)


    if(i>=arrayofRequests.length)
    {
        return
    }
    var request = arrayofRequests[i]
    parseWrapper.parseXmlFile(request)
        .then(function (curentRequest)
        {

            //finish parsing correctly and return current request so it dont lost
            var xml = require(global.appRoot + '/main-process/getXmlFileInfo')
            var url = xml.url()
            console.log('done parse')

            //start extract the
            extractWrapper.startEctract(url).then(function () {

                console.log('finished extract')
                var type = 1

                requests.getExtractedDataTypes(request)
                    .then(function (extractedDataTypes)
                    {
                        // var urls = []
                        for(var typeIndex = 0 ; typeIndex<extractedDataTypes.length;typeIndex++)
                        {
                            switch (extractedDataTypes[typeIndex].type)
                            {
                                case 'XML':
                                {

                                    type = 1

                                    break
                                }
                                case 'CSV':
                                {
                                    type = 3
                                    break
                                }
                                case 'JSON':
                                {
                                    type = 2
                                    break
                                }
                                case 'EXCEL':
                                {
                                    type = 4
                                    break
                                }
                            }

                            exportWrapper.exportData(type)
                                .then(function (exportWrapperResult) {
                                    console.log('type is : '+ exportWrapperResult.type)
                                    // console.log('content')
                                    // console.log( exportWrapperResult.content)
                                    var fileNmae =global.coreRoot+ '/uploads/extractedData'+ new Date().getTime()
                                    writeFileWrapper.writeFile(exportWrapperResult.type,
                                        exportWrapperResult.content,fileNmae)
                                        .then(function (currentfileNmae)
                                        {
                                    //  urls.push(currentfileNmae)
                                     sendMail.sendFileEmail(request,currentfileNmae).then(function(res)
                                     {
                                                extractedData.createExtractedData(
                                                {
                                                    extractedDataId :  new Date().getTime(),
                                                    maxRecords:global.finalData.length,
                                                    url:currentfileNmae,
                                                    date:new Date().getTime(),
                                                    scrapeRequest:request
                                                }
                                            ).then(function (data) {
                                                console.log('data saved')

                                                requests.updateScrapeRequest(request._id,
                                                    'message','the request finishe processing you can get your data.')
                                                    .then(function (data) {
                                                        status.getStatusByName('Finished')
                                                            .then(function (data) {
                                                                requests.changeScrapeRequestStatus(request._id,data)
                                                                    .then(function () {
                                                                        serialProcessing(i+1,arrayofRequests)

                                                                    }).catch(function (err) {
                                                                    console.log(err)

                                                                })

                                                            }).catch(function (err) {
                                                            console.log(err)

                                                        })

                                                    }).catch(function (err) {
                                                    console.log(err)
                                                })

                                            }).catch(function (err) {
                                                console.log(err)
                                            })
                                         console.log('send email')
                                     }).catch(function(err)
                                     {
                                         console.log(err)
                                     })
                                            // extractedData.createExtractedData(
                                            //     {
                                            //         extractedDataId :  new Date().getTime(),
                                            //         maxRecords:4,
                                            //         url:currentfileNmae,
                                            //         date:new Date().getTime(),
                                            //         scrapeRequest:request
                                            //     }
                                            // ).then(function (data) {
                                            //     console.log('data saved')

                                            //     requests.updateScrapeRequest(request._id,
                                            //         'message','the request finishe processing you can get your data.')
                                            //         .then(function (data) {
                                            //             status.getStatusByName('Finished')
                                            //                 .then(function (data) {
                                            //                     requests.changeScrapeRequestStatus(request._id,data)
                                            //                         .then(function () {
                                            //                             serialProcessing(i+1,arrayofRequests)

                                            //                         }).catch(function (err) {
                                            //                         console.log(err)

                                            //                     })

                                            //                 }).catch(function (err) {
                                            //                 console.log(err)

                                            //             })

                                            //         }).catch(function (err) {
                                            //         console.log(err)
                                            //     })

                                            // }).catch(function (err) {
                                            //     console.log(err)
                                            // })

                                        }).catch(function (err) {
                                        console.log(err)

                                        console.log('writeFileWrapper data error')

                                    })

                                }).catch(function (err) {
                                console.log('export data error')

                                console.log(err)

                            })

                        }

                    }).catch(function (err) {
                    console.log('catch typrs')

                    console.log(err)
                })



            }).catch(function () {
                console.log('failed extract')
                requests.updateScrapeRequest(request._id,
                    'message','the request failed to extract data, call the developer please.')
                    .then(function (data) {
                        status.getStatusByName('Failed')
                            .then(function (data) {
                                requests.changeScrapeRequestStatus(request._id,data)
                                    .then(function () {
                                        serialProcessing(i+1,arrayofRequests)

                                    }).catch(function (err) {
                                    console.log(err)

                                })

                            }).catch(function (err) {
                            console.log(err)

                        })

                    }).catch(function (err) {
                    console.log(err)
                })
            })
        })
        .catch(function (err) {
            console.log(err)
            console.log('failed parse')

        })

}


module.exports =
    {

       process : function (i,array) {

           serialProcessing(i,array)
       }

    }
