const cheerio = require('cheerio')
var xml = require(global.appRoot + '/main-process/getXmlFileInfo')

var crawler = require(global.appRoot + '/crawler/services/navigate-pages')

var currentPageModel = require(global.appRoot + '/models/page')


var map = {}

var res = {

  extract: function getData(url, cb) {
    console.log("extract_pages service begin")
    var selectors = xml.dataSelectors()
    crawler.navigatePages(url, function (result) {
      var extractedData = []
      if(result.code==0)
      {
    
 cb({code:0,msg:'error from crawler'})
      }
      else
      {
        var page = result.msg
      var pageTitle = page.$("title").text()
    //  console.log("uri: "+page.request.uri.href)
 
      var text = cheerio.load(page.body)
      for (var i = 0; i < selectors.length; i++) {
        var selectedArray = []
        text(selectors[i].element_selector).each(function (j, em) {

          selectedArray.push(text(this).text())
        })
        // generate current page info
        currentPage = currentPageModel.generatePage(page.request.uri.href ,pageTitle ,page.body)
        //pass info
        extractedData.push({ title: selectors[i].title, data: selectedArray })

        map[selectors[i].title] = selectedArray
      
      //  global.finalData[selectors[i].title] = selectedArray
      }
 global.finalData.push({page : currentPage , extracted : extractedData})

      cb({code:1,msg:extractedData})
      }

    })
  }

}


module.exports = res

