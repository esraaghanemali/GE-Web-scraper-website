/**
 * Created by esraa on 6/14/2017.
 */
'use strict';

class xmlFile {
  constructor(url,data, navigations) {
     this._url = url;
     this._data = data;
     this._navigations = navigations;
  }

  get url ()
  {
   return this._url
  }
  set url(newUrl)
  {
    this._url = newUrl
  }

    get data ()
  {
  return this._data;
  }
  set data(newData)
  {
    this._data = newData
  }
    get navigations ()
  {
  return this._navigations
  }
  set navigations(newNavigations)
  {
    this._navigations=newNavigations
  }
}

//funtion to ceate new xml
var exportXmlFile = {
  generateXmlFile :  function (url,data,nav)
{
return new xmlFile(url,data,nav);
}
}

module.exports = exportXmlFile
