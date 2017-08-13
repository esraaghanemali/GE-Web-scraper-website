var builder = require('xmlbuilder');
var xml = require(global.appRoot + '/main-process/getXmlFileInfo')

var result =
  {

    buildXml: function buildXmlfile(cb) {
      try
      {     var selectors = xml.dataSelectors()


          var root = builder.create('finalData');
          var pages = root.ele('all_pages')
          for (var i = 0; i < global.finalData.length; i++) {
              var page = pages.ele('page')
              var page_url = page.ele('page_url').txt(global.finalData[i].page.url)
              var page_title = page.ele('page_title').txt(global.finalData[i].page.title)
              var content = page.ele('allData')
              for (var j = 0; j < global.finalData[i].extracted.length; j++) {
                  var item = content.ele('table')
                  item.ele('tableTitle').txt(global.finalData[i].extracted[j].title)
                  var dataContent = item.ele('tableContent')
                  for (var k = 0; k < global.finalData[i].extracted[j].data.length; k++) {
                      dataContent.ele('row').txt(global.finalData[i].extracted[j].data[k])
                  }
              }
          }
                   cb({code:1,msg:root})


      }
      catch(err)
      {
          cb({code:0,msg:err})
      }


    }
  }


module.exports = result