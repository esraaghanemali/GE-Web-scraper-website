/*
create new browser window 
load the url 
 */
  var fs = require('fs')

const {BrowserWindow} = require('electron').remote

 var result = {
   showWindow : function windowFun(page)
   {
    
    

  let mainWindow = new BrowserWindow({width: 800, height: 600 })


 mainWindow.loadURL('https://github.com/')
 

 mainWindow.webContents.on('did-finish-load', function() {



  })



  mainWindow.webContents.on('dom-ready', function() {
  

  mainWindow.webContents.executeJavaScript(`
    var ipcRenderer = require('electron').ipcRenderer;
    var value = 'esraa 2na'; // Must be a prototype which does not reference the DOM
    var page = document.body.innerHTML
    ipcRenderer.send('query', page);
  `);

  mainWindow.webContents.executeJavaScript('console.log( page) ', function (result) {

  console.log(result)
})
   console.log("ready dom ")
});



   }
 }

 module.exports = result
