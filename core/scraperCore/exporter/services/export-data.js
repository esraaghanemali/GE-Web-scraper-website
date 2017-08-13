var writeFileService =  require(global.appRoot + '/exporter/services/write-file')

var xmlService = require(global.appRoot + '/exporter/services/xml')
var jsonService = require(global.appRoot + '/exporter/services/json')
var csvService = require(global.appRoot + '/exporter/services/csv')
var xlsxService = require(global.appRoot + '/exporter/services/xlsx')

var fs = require('fs')
var result =
    {
        export: function exportFun(choosen,cb)
        {
            //xml
            if (choosen == 1) {
                xmlService.buildXml(function (result)
                {
                    if(result.code==1)
                    {
                        cb({code:1 , msg:result.msg})
                    }
                    else
                    {
                        cb({code:0 , msg:result.msg})
                    }
                }
                )
            }


            
       if (choosen == 2) {

                //json
             xmlService.buildXml(function (result)
                {

                    if(result.code==1)
                    {
                        jsonService.buildJson(result.msg,function (jsoncontent)
                        {

                            if(jsoncontent.code==1)
                            {
                                var strongobj =JSON.stringify(jsoncontent.msg)
                                cb({code:1 , msg:strongobj})
                            }
                            else{
                                cb({code:0 , msg:jsoncontent.msg})
                            }

                        })
                    }
                    else
                    {
                        cb({code:0 , msg:result.msg})
                    }
                     })
            }

            //csv
                if (choosen == 3) {
                       var jsonObject  = require(global.appRoot + '/exporter/services/csv-data')
                        jsonObject.buildJsonObj(function(jsonResult)
                        {
                            if(jsonResult.code==1)
                            {
                           csvService.buildCsv(jsonResult.msg,function (content)
                            {
                                if(content.code==1)
                                {
                                    cb({code:1 , msg:content.msg})

                                } 
                                else
                                {
                                    cb({code:0 , msg:content.msg})
                                }  
                        
                            })
                        }
                        else
                        {
                            cb({code:0 , msg:jsonResult.msg})
                        }
                        })      
            }

            //excel

                if (choosen == 4) {
                 var jsonObject  = require(global.appRoot + '/exporter/services/csv-data')
                 jsonObject.buildJsonObj(function(jsonResult)
                        {

                                   if(jsonResult.code==1)
                            {
                           xlsxService.buildXlsx(jsonResult.msg,function (content)
                            {
                                  if(content.code==1)
                                {
                                    cb({code:1 , msg:content.msg})

                                } 
                                else
                                {
                                    cb({code:0 , msg:content.msg})
                                }  
                            })
                        }
                        else
                        {
                            cb({code:0 , msg:jsonResult.msg})

                        }



                        })

                 
            }



        }
    }

    module.exports = result