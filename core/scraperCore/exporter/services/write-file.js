var fs = require('fs')

var result = {
    write: function writeFun(type,content,fileName,cb) {
if(type==3)
{
    try{
content.pipe(fs.createWriteStream(fileName+'.csv'))
        cb({ code:1, msg: 'yes' })

    }catch(err)
    {
        cb({ code: 0, msg: err })

    }

}  
else 
if(type==4)
{
    try{
content.getReadStream().pipe(fs.createWriteStream(fileName+'.xlsx'));
        cb({ code:1, msg: 'finish' })

    }catch(err)
    {
        cb({ code: 0, msg: err })

    }
} 
else


    if (type == 2) {
        fs.writeFile(fileName+'.json', content, (err) => {
            if (err) {
                cb({ code: 0, msg: err })
            }
            cb({ code:1, msg: 'yes xml saved' })
        });
    }
    else if (type == 1)
    {
        fs.writeFile(fileName+'.xml', content, (err) => {
            if (err) {
                cb({ code: 0, msg: err })
            }
            cb({ code:1, msg: 'yes xml saved' })
        });
    }


 



    }
}

module.exports = result