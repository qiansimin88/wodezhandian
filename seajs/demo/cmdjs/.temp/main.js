// JavaScript Document
define("main", [ "./dragModule", "./range" ], function(require, exports, module) {
    var oDrag = document.getElementById("red");
    //用require来接收接口文件
    require("./dragModule").drag(oDrag);
});