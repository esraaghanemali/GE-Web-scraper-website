const cheerio = require('cheerio')
var request = require('request');

var res = {

    extract : function extractData (url,selectors,cb)
 {
     var extractedData = []
try {
    request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
   
      var text = cheerio.load(html)
       for(var i =0 ; i<selectors.length ; i++)
  {
      var selectedArray = []
           text(selectors[i]).each( function (j,em)
        {
             
               selectedArray.push(text(this).text())
        }
        )
       // extractedData.push({title: selectors[i].title , data: selectedArray})
       extractedData.push( selectedArray)
   }
     cb({code : 1 , msg :extractedData})
  }
  else
  {
       cb({code : 0 , msg :'connection error'})
  }
});

}catch (err)
{
     cb({code : 0 , msg :err})
}

      

 
 
}

}

module.exports = res 