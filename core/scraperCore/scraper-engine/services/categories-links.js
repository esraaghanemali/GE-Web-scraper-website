const cheerio = require('cheerio')
var xml = require(global.appRoot + '/main-process/getXmlFileInfo')
var fs = require('fs')

var URL = require('url-parse')

// var htmlPa|gePath = global.appRoot + '/koora.html'

var res = {

  Href: function getHref(res, cb) {
    var url = new URL(res.request.uri.href);
    var baseUrl = url.protocol + "//" + url.hostname;

    //console.log("url.protocol "+url.protocol)

    page = res.body

    var selectors = xml.navigationSelectors()
    var text = cheerio.load(page)
    links = []
    //console.log("page title : " + res.$("title").text())
    // console.log(" selectors.length; "+ selectors.length)
    var absoluteLinks = []
    text("a[href^='"+url.protocol+"']").each(function(k,element)
    {
  absoluteLinks.push(text(this).attr('href'))

    })
   //  console.log("absoluteLinks "+ absoluteLinks.length)

        for (var i = 0; i < selectors.length; i++) {
         
          if(selectors[i].type == 'multi_level')
          {
             console.log('type multi')
      text(selectors[i].element_selector).each(function (j, em) {

        var link = text(this).closest('a').attr('href')
        console.log('each found '+ link)
       var found = false
         for (var abs = 0; abs < absoluteLinks.length; abs++) {
          if (link == absoluteLinks[abs]) {
           found = true
           break
          }             
        }
         if (found) {
          // console.log("found")
            links.push(link)
            
          }
          else {
              links.push(baseUrl + "/" + link)
           // console.log("added: "+link)
          }
          
          


                  //    links.push(link)

        //  console.log("text href: "+j+" "+link)


      })
        }
      
    }

    cb(links)
    
  }

}

module.exports = res 
