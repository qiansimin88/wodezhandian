// JavaScript Document
//限制范围接口
define("range", [], function(require, exports, module) {
    //val 当前值   minN最小值  maxN最大值
    function range(val, minN, maxN) {
        if (val >= maxN) {
            return maxN;
        } else if (val <= minN) {
            return minN;
        } else {
            return val;
        }
    }
    exports.range = range;
});