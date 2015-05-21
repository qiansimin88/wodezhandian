// JavaScript Document
//拖拽接口  为drag
define("dragModule-debug", [ "./range-debug" ], function(require, exports, module) {
    function drag(obj) {
        //在没有移动之前就先创建两个变量
        var disX = 0, disY = 0;
        obj.onmousedown = function(ev) {
            var e = ev || window.event;
            disX = e.clientX - obj.offsetLeft;
            disY = e.clientY - obj.offsetTop;
            document.onmousemove = function(ev) {
                var e = ev || window.event;
                //引入 range 最大值最小值接口
                var L = require("./range-debug").range(e.clientX - disX, 0, document.documentElement.clientWidth - obj.offsetWidth);
                T = require("./range-debug").range(e.clientY - disY, 0, document.documentElement.clientHeight - obj.offsetHeight);
                obj.style["left"] = L + "px";
                obj.style["top"] = T + "px";
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        };
    }
    //曝光接口信息  用exports参数曝光
    exports.drag = drag;
});