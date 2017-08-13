var extractService = require(global.appRoot + '/extractor/services/extract_pages')
var xml = require(global.appRoot + '/main-process/getXmlFileInfo')

var storeData = require(global.appRoot + '/models/extractedData')

var res = {
nav_Extract : function getAllData(cb)
{
  var url = xml.url()

  extractService.extract(url,function (result) {
   // console.log("service "+result.code)
   if(result.code==0)
   {
cb({code:0,msg:result.msg})
   }
   else
   {
cb({code:1,msg:result.msg})
   }
    
  })
}

}

module.exports = res
