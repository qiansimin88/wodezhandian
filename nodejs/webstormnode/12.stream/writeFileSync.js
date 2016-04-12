var fs = require('fs');

fs.writeFileSync('msg.txt', new Buffer(128*1024));   //写一个128K的数据到msg.txt里面