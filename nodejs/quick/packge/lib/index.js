var toshow = require('./testpackge.js');

	toshow();



	//通过npm init 来初始化packge.JSON  
	 // 然后 npm install packge/ 通过main字段来引入入口文件 这个JSON  就创建了一个自定义的包 在项目根目录node_module里面，
	 // 然后进入node环境 就可以require（‘自定义的包’）了