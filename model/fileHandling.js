var config      =   require('../config/config');
const fs = require('fs');

class fileHandling{
    
    constructor({content,absoluteFilePath,fileName}){
        this.content     =   content;
        this.absoluteFilePath     =   absoluteFilePath;
        this.fileName     =   fileName;
    }

    saveOne(){console.log(123);
        const write = fs.appendFileSync(this.absoluteFilePath,this.content);
        console.log(write);
    }
}

module.exports = fileHandling;