/**
 * created by esraa ali 9/7/2017
 * 
 * create json file
 * convert from xml to json
 * 
 */

const parseString = require('xml2js-parser').parseString;

var res = {
    buildJson: function buildJsonFile(xmlData, cb) {
        parseString(xmlData, (err, result) => {
            if (err) {
                cb({ code: 0, msg: err })
            }
            else {
               // console.log(result)
                cb({ code: 1, msg: result })
            }
        });
    }
}

module.exports = res
