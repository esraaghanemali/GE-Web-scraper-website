var constants = {
  user:{ defaultFields: 'firstName lastName isActive email phone userPackage role'},
    model: {defautlFields: 'fileName fileLocation user'   },
    status: { defautlFields: 'statusName statusMessege' },
    extractedData : { defautlFields : 'scrapeRequest maxPages url' },
    scrapeRequest : {defautlFields : 'maxPages maxItemsPerPage model'},
    webScraperConstants: {defautlFields : 'maxPages maxItemsPerPage model'},
    userPackage: {defautlFields : 'packageName  maxRecords totalPrice'},
    category : {defautlFields : 'categoryName'},
    extractedDataType : {defautlFields: 'type'}
};

module.exports = constants;