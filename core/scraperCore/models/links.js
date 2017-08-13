'use strict';
class link
 {
  constructor(url , visited) {
    this._url = url;
     this._visited = visited;
  }

  get url ()
  {
   return this._url
  }
  set url(newUrl){
    this._url = newUrl
  }

    get visited ()
  {
   return this._visited
  }
  set visited(Value)
  {
    this._visited = Value
  }


}

var exportLink = {
  generateLink :  function (url , visited)
{
return new link(url , visited);
}
}

module.exports = exportPage