var url = require('url')

module.exports = function (req) {
	var urlObj = url.parse(req.url,true);
	var pathname = urlObj.pathname;   //路径名称
	req.pathname = urlObj.pathname;
	req.query = urlObj.query;
	req.cookie = req.headers.cookie;
}