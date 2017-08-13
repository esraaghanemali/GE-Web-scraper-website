/**
 * created by esraa ali 9/7/2017
 * 
 * create csv file
 * convert from json to csv
 * 
 */


var csvWriter = require('csv-write-stream')

var res = {
  buildCsv: function buildCsvFile(jsonData, cb) {


    try {

var writer = csvWriter()
var fs = require('fs')



var writer = csvWriter({ headers:jsonData.head})
// writer.pipe(fs.createWriteStream('esoo.csv'))

for(var j = 0 ; j < jsonData.data.length ; j++)
{
writer.write(jsonData.data[j])
}



     writer.end()

      cb({ code: 1, msg: writer })
    } catch (err) {
      console.error(err);
      cb({ code: 0, msg: err })
      // Errors are thrown for bad options, or if the data is empty and no fields are provided. 
      // Be sure to provide fields if it is possible that your data array will be empty. 

    }


  }
}

module.exports = res


