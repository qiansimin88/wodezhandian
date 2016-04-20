var url = require('url')

module.exports = function (req) {
	var urlObj = url.parse(req.url,true);
	console.log(urlObj);
	// console.log(req);
	var pathname = urlObj.pathname;   //路径名称
	req.pathname = urlObj.pathname;
	req.query = urlObj.query;
	req.cookie = req.headers.cookie;
}