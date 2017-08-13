var urlsService = require(global.appRoot + '/scraper-engine/services/all-links')


var Crawler = require("crawler")

var navResult =
    {
        navigatePages: function getPages(navUrls, cb) {

var links = []
            console.log("crawler service begin")
            console.log("start url "+navUrls)

            //define crawler
            var c = new Crawler({
                maxConnections: 10, callback: function (error, res, done) {
                    
                    if (error) {
                        cb({ code: 0, msg: 'error in crawler in the file ' + __dirname + ' the error : ' + error })
                    } else {
                        if (res.statusCode != 200) {
                            console.log("not 200 ")
                            cb({ code: 0, msg: 'error the page status code of the page + ' + res.request.uri.href + ' is not 200! it is' + res.statusCode })
                        }

                        else {
                            global.curPage = res
                            var exist = false
                            var index = -1

               for (var j = 0; j < links.length; j++) {
                                if (links[j].url == res.request.uri.href) {

                                    exist = true
                                    index = j
                                    break
                                }
                            }
                            if (exist == false) {
                                var link = { url: res.request.uri.href, visited: true }
                                links.push(link)
                                if (res.request.uri.href == navUrls) {
                                    console.log('reach the url')
                                    var urlsCategoryService = require(global.appRoot + '/scraper-engine/services/categories-links')
                                    urlsCategoryService.Href(res, function (Categorylinks) {
                                        console.log('correspoending '+Categorylinks.length)
                                        for (var i = 0; i < Categorylinks.length; i++) {
                                         console.log('multi-level ' + Categorylinks[i])
                                            //   console.log("enque "+links[i].visited)
                                            c.queue(Categorylinks[i]);
                                            // links[i].visited = true;

                                        }
                                    })
                                }


                            }
                            else {
                                links[index].visited = true
                            }

                            urlsService.Href(res, function (hrefArray) {

                                for (var i = 0; i < hrefArray.length; i++) {
                                    var found = false;
                                    for (var j = 0; j < links.length; j++) {
                                        if (links[j].url == hrefArray[i]) {

                                            found = true;
                                            break;
                                        }
                                    }
                                    if (found == false) {

                                        links.push({ url: hrefArray[i], visited: false })
                                    }
                                }

                                for (var i = 0; i < links.length; i++) {
                                    if (links[i].visited == false) {
                                         console.log("pagination "+links[i].url)
                                        c.queue(links[i].url);
                                        // links[i].visited = true;
                                    }
                                }
                                global.finish =true
                                  for (var i = 0; i < links.length; i++) {
                                    if (links[i].visited == false) {

                                        global.finish=false
                                        // links[i].visited = true;
                                    }
                                }
                            })
                            cb({ code: 1, msg: res })

                        }
                    }
                    done();

                }
            });

            c.queue(navUrls);

        }
    }

module.exports = navResult