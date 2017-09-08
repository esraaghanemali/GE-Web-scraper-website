var fs = require('fs')

var result = {
    write: function writeFun(type,content,fileName,cb) {
if(type==3)
{
    try{
content.pipe(fs.createWriteStream(fileName+'.csv'))
        cb({ code:1, msg: fileName+'.csv' })

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
        cb({ code:1, msg:fileName+'.xlsx' })

    }catch(err)
    {
        cb({ code: 0, msg: err })

    }
} 
else


    if (type == 2) {
        fs.writeFile(fileName, content, (err) => {
            if (err) {
                cb({ code: 0, msg: err })
            }
            cb({ code:1, msg: fileName})
        });
    }
    else if (type == 1)
    {
        fs.writeFile(fileName+'.xml', content, (err) => {
            if (err) {
                cb({ code: 0, msg: err })
            }
            cb({ code:1, msg: fileName+'.xml' })
        });
    }


 



    }
}

module.exports = result