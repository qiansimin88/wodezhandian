define("index", [ "jquery", "module/b.js", "lib/jquery.show.js" ], function(require, exports, module) {
    var $ = require("jquery");
    var num = require("module/b.js");
    require("lib/jquery.show.js")($);
    num.shownum(10);
});