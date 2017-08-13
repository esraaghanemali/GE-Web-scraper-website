const cheerio = require('cheerio')
var xml = require(global.appRoot + '/main-process/getXmlFileInfo')
var crawler = require(global.appRoot + '/crawler/services/navigate-pages')

var fs = require('fs')
var extractedData = []
var Crawler = require("crawler");
var htmlPagePath = global.appRoot + '/koora.html'
//var htmlPagePath = global.appRoot + '/ecommerce.html'
//var htmlPagePath = global.appRoot + '/yomeat.html'

var res = {

  extract: function getData(url, cb) {

    var selectors = xml.dataSelectors()
crawler.navigatePages(url,function(result){
  if(result.code==1)
  {
  var page = result.msg
  var text = cheerio.load(page.body)
 var text = cheerio.load(data)
    console.log("test service"+page)
      for (var i = 0; i < selectors.length; i++) {
        var selectedArray = []
        text(selectors[i].element_selector).each(function (j, em) {

          selectedArray.push(text(this).text())
        })
        extractedData.push({ title: selectors[i].title, data: selectedArray })
      }
       cb({code : 1 , msg:extractedData})
  }
  else
  {
   cb({code :0 , msg :'Erroe'})
  }

     
})
  }

}


module.exports = res


// var res = {

//   extract: function getData(url,mx,cb) {
//     if(url==1)
//     {
// var htmlPagePath = global.appRoot + '/koora.html'
//     }
//     else if(url==2)
//     {
// var htmlPagePath = global.appRoot + '/yomeat.html'

//     }else if (url ==3)
//     {
// var htmlPagePath = global.appRoot + '/ecommerce.html'
//     }
//     var selectors = xml.dataSelectors()
//     fs.readFile(htmlPagePath, function (err, data) {
//       var text = cheerio.load(data)
//       for (var i = 0; i < selectors.length; i++) {
//         var selectedArray = []
//         text(selectors[i].element_selector).each(function (j, em) {

//           selectedArray.push(text(this).text())
//         })
//         extractedData.push({ title: selectors[i].title, data: selectedArray })
//       }
//       cb(extractedData)

//     })
//     // console.log('fs: '+d)
//   }

// }


// module.exports = res 
