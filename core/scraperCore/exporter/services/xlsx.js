/**
 * created by esraa ali 15/7/2017
 * 
 * create Excel file
 * convert from json to excel
 * 
 */

var XLSXWriter = require('xlsx-writestream');
var fs = require('fs');

var res = {
  buildXlsx: function buildXlsxFile(jsonData, cb) {


    try {


        

var writer = new XLSXWriter('mySpreadsheet.xlsx', {} /* options */);

// After instantiation, you can grab the readstream at any time.
// writer.getReadStream().pipe(fs.createWriteStream('mySpreadsheet.xlsx'));


dataObj = []

var obj = {}
for(var j = 0 ; j < jsonData.data.length ; j++)
{
    for(var k = 0 ; k < jsonData.data[j].length ; k++)
{
    
    obj[jsonData.head[k]] = jsonData.data[j][k]
    
    
}
writer.addRow(obj)

}
// Finalize the spreadsheet. If you don't do this, the readstream will not end.
writer.finalize();

      cb({ code: 1, msg: writer })
    } catch (err) {
      console.error(err);
      cb({ code: 0, msg: err })
   
    }


  }
}

module.exports = res




