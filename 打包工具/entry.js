require('./style.css')  //载入style.css     cssloader复制读取文件  style-loader负责把文件写进 html 的head里面
document.write('it works');
document.write(require('./module.js'))