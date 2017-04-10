const execSync = require('child_process').execSync;

//新开同步的子进程
var result = execSync(`npm info tm-c-baidu`, {
   encoding: 'utf-8' 
});

console.log(result.trim());