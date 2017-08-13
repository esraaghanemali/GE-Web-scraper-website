const cheerio = require('cheerio')
var xml = require(global.appRoot + '/main-process/getXmlFileInfo')
var fs = require('fs')

var URL = require('url-parse')

// var htmlPagePath = global.appRoot + '/koora.html'
var map = {};

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
          if(selectors[i].type != 'multi_level')
          {
      text(selectors[i].element_selector).each(function (j, em) {

        var link = text(this).closest('a').attr('href')
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
      // extractedData.push({ title: selectors[i].title, data: selectedArray })
    }
//     for (var i = 0; i < selectors.length; i++) {
//        console.log("nav "+i+" "+ selectors[i].element_selector)
// //console.log("link: "+link)
//       text(selectors[i].element_selector).each(function (j, em) {

//         var link = text(this).closest('a').attr('href')
//         console.log("link with selec: "+link)
//         for (var abs = 0; abs < absoluteLinks.length; abs++) {
//           console.log(" absoluteLinks[abs] "+ absoluteLinks[abs])
//           if (link == absoluteLinks[abs]) {
//             links.push(link)
//             console.log("url pushed ==: "+link)
//           }
//           else {
//             links.push(baseUrl + "/" + link)
//           }
//                   //    links.push(link)

//         }
//         //  console.log("text href: "+j+" "+link)


//       })
//       // extractedData.push({ title: selectors[i].title, data: selectedArray })
//     }
    cb(links)
    // console.log('fs: '+d)
  }

}

module.exports = res 
