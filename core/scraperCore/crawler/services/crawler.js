// var Crawler = require("crawler");

// var c = new Crawler({
// maxConnections : 10,
// // This will be called for each crawled page
// callback : function (error, result, $) {

//     if (error){
//         // Handle error
//     } 

//     // $ is Cheerio by default
//     //a lean implementation of core jQuery designed specifically for the server
//     $('a').each(function(index, a) {
//         var toQueueUrl = $(a).attr('href');
//         //show urls in console
//         console.log(toQueueUrl);
//         c.queue(toQueueUrl);
//     });
// },

// // This will be called when crawler has empty queue
// onDrain : function(){
//     console.log('nothing more to crawl');
// }

// });