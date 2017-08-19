var constants = {
  user:{defaultFields: 'firstName lastName isActive email phone userPackage role'},
  model: {defaultFields: 'fileName fileLocation user'},
  status: {defaultFields: 'statusName statusMessage' },
  extractedData: {defaultFields : 'scrapeRequest maxPages url'},
  scrapeRequest: {defaultFields : 'maxPages maxItemsPerPage model'},
  webScraperConstants: {defaultFields : 'maxPages maxItemsPerPage model'},
  userPackage: {defaultFields : 'packageName  maxRecords totalPrice'},
    category : {defaultFields : 'categoryName'},
    extractedDataType : {defaultFields: 'type'}
};

module.exports = constants;