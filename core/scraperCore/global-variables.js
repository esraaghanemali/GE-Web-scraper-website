var path = require('path');
 var result ={
    gefineGlobals :function () {
        global.appRoot = path.resolve(__dirname)

        var d = require(global.appRoot + '/models/xmlFile');
        global.xmlfile = d.generateXmlFile('', '', '')

        global.finalData = []
        global.finish = false
    }
 }

module.exports =result
