// JavaScript Document
define("main-debug", [ "./dragModule-debug", "./range-debug" ], function(require, exports, module) {
    var oDrag = document.getElementById("red");
    //用require来接收接口文件
    require("./dragModule-debug").drag(oDrag);
});