/**
 * Created by esraa on 6/14/2017.
 */
'use strict';
 class page_item {
 constructor(url, title,page) {
    this._url = url;
    this._title = title;
    this._page = page;
  }

  get url ()
  {
   return this._url
  }
  set url (newUrl){
    this._url = newUrl
  }

  get title ()
  {
   return this._title
  }
  set title (newTitle){
    this._title = newTitle
  }

    get page ()
  {
  return this._page;
}

  set page(newPage)
  {
    this._page = newPage
  }
}

var exportPage = {
  generatePage :  function (url,title, page) 
{
return new page_item(url,title, page) ;
}
}

module.exports = exportPage