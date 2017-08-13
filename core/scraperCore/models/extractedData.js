/**
 * Created by esraa on 6/14/2017.
 */
'use strict';

class extractedData {
  constructor(data) {
     this._data = data;
  }

    get data ()
  {
  return this._data;
  }
  set data(newData)
  {
    this._data = newData
  }
}

//funtion to ceate new xml
var createFile = {
  generateExportFile :  function (data)
{
return new extractedData(data);
}
}

module.exports = createFile
