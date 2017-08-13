var xml = require(global.appRoot + '/main-process/getXmlFileInfo')

var result =
  {

    buildJsonObj: function buildJsonObjFun(cb) {
        try {
    headers = []
            
   var contentArray = []
    var allDataObj = {}
 for (var i = 0; i < global.finalData.length; i++) {
      for (var j = 0; j < global.finalData[i].extracted.length; j++) {
         
allDataObj[global.finalData[i].extracted[j].title] =[]
         

      }
 }

  for (var i = 0; i < global.finalData.length; i++) {
      for (var j = 0; j < global.finalData[i].extracted.length; j++) {
         
for(var k=0 ; k<global.finalData[i].extracted[j].data.length;k++)
{
allDataObj[global.finalData[i].extracted[j].title].push(global.finalData[i].extracted[j].data[k])
}
         

      }
 }
 var maxRow = 0

 for(var key in allDataObj) {
     headers.push(key)
    if(allDataObj[key].length>maxRow)
    {
        maxRow = allDataObj[key].length
    }
}

for (var i = 0 ; i<maxRow ; i++)
{
    dataRow = []
     for(var key in allDataObj) {
    if(allDataObj[key].length>i)
    {
          dataRow.push(allDataObj[key][i])
    }
    else
    {
         dataRow.push('no result')
       
    }
  
}
 contentArray.push(dataRow)
}

      
      var res = {
          head: headers,
          data : contentArray

      }
       cb({code : 1 , msg :res })
        }
        catch(err)
        {
            console.log(err)
 cb({code : 0 , msg :err })
        }

     
    }
  }


module.exports = result