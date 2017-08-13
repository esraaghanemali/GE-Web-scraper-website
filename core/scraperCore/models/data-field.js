/**
 * Created by esraa on 6/11/2017.
 */
'use strict';
class data_item {
  constructor(type,title, element_selector) {
    this._type = type;
     this._title = title;
    this._element_selector = element_selector;
  }

  get type ()
  {
   return this._type
  }
  set type(newType){
    this._type = newType
  }

 get title ()
  {
   return this._title
  }
  set title(newTitle){
    this._title = newTitle
  }

    get element_selector ()
  {
  return this._element_selector;
  }
  set element_selector(newElement_selector)
  {
    this._element_selector = newElement_selector
  }


}

var exportdata = {
  generateData :  function (type,title, element_selector)
{
return new data_item(type, title,element_selector);
}
}

module.exports = exportdata
