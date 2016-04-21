///////////////////////////////
// basic 认证是当客户端与服务器请求时，允许用户 //
// 输入用户名和密码，然后服务器验证，         //
// 成功可以继续访问，不成功返回401（未授权）    //
// 成功后 ，每次访问都会自动填充用户名和密码     //
///////////////////////////////

var http = require('http');
	
function send401(res){
	res.setHeader('WWW-Authenticate','Basic realm="Secure Area"');
	res.writeHead(401);
	res.end();
}


http.createServer(function (req,res){
	var auths = req.headers['authorization'];   //客户端传给服务端 上次 由WWW-Authen用户输入的账户信息
	// console.log(auths);  //加密的数据  Basic MjI6MjI=

	if(auths) {  //如果用户的确上次输入了信息
		var auths = auths.split(' ');
		var method = auths[0];		//Basic
		var encoded = auths[1]; //base64加密的信息  MjI6MjI=
		// console.log(new Buffer(encoded,'base64').toString('utf8'));    22:22   帐号和密码
		var decoded = new Buffer(encoded,'base64').toString('utf8').split(':');
		if(decoded[0] == decoded[1]){  //如果账户和密码是一模一样 就通过
			res.end('Ok')
		}else {
			send401(res);
		}
	}else {
		send401(res);
	}
}).listen(8585)