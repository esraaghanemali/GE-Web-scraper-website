
var xmlFileInfo = {
dataSelectors:
function getDataSelectors () 
{
   return global.xmlfile.data
  
}
,
navigationSelectors :
function getNavSelectors () 
{
    return  global.xmlfile.navigations
}
,
url:
function getUrl () 
{
    return global.xmlfile.url
}

}

module.exports = xmlFileInfo