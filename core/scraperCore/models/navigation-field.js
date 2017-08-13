/**
 * Created by esraa on 6/14/2017.
 */
'use strict';
 class nav_item {
 constructor(type, element_selector) {
    this._type = type;
    this._element_selector = element_selector;
  }

  get type ()
  {
   return this._type
  }
  set type(newType){
    this._type = newType
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

var exportNav = {
  generateNav :  function (type, element_selector)
{
return new nav_item(type, element_selector);
}
}

module.exports = exportNav