var openfile = require('electron').remote
var dialog = openfile.dialog
var parse = require(global.appRoot + '/scraper-engine/services/parseXml')

var selectFile =
  {
    openSelectDialog: function openDialog(cb) {
      dialog.showOpenDialog(function (fileNames) {
        if (fileNames === undefined) {

          global.notification.show("Oops!", "you dont choose any thing :\ nothing saved.", 0)
          cb({ code: 0, msg: 'nothing selected' })

        } else {
          parse.parseFile(fileNames[0], function (result) {
            if (result.code == 1) {
              cb({ code: 1, msg: 'u select: ' + fileNames[0] })
            }
            else {

                      
              cb({ code: 0, msg: result.result })
            }

          })


        }
      })
    }
  }
module.exports = selectFile