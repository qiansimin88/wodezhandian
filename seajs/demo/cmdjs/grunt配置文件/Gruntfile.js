module.exports = function(grunt) {
	
	grunt.initConfig({
		
		 pkg: grunt.file.readJSON('package.json'),
		 //自动提取依赖
		 transport : {
			webqq : {
				files : {
					 '.temp' : ['range.js','main.js','dragModule.js']	
				}	
			} 
		},
		//自动合并
		 concat : {
			 webqq : {
				 //必写的
				 files : {				//建议最外层的直接执行的模块放在最前面
					 'dist/main.js' : ['.temp/main.js','.temp/range.js','.temp/dragModule.js']
				 }
			 }
		 },
		 //自动压缩
		 uglify: {
			 webqq : {
					files: {
						'dist/main.min.js' : ['dist/main.js']	
					} 
				} 
		 }	
	});
	//依赖插件
	grunt.loadNpmTasks('grunt-cmd-transport');
	//合并插件
	grunt.loadNpmTasks('grunt-cmd-concat');
	//压缩插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	//所用的插件
  	grunt.registerTask('default', ['transport','concat','uglify']);

	
};