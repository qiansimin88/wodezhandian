module.exports = function(grunt) {
	
	grunt.initConfig({
		
		 pkg: grunt.file.readJSON('package.json'),
		 
		 concat : {
			 webqq : {
				 //必写的
				 files : {
					 'dist/main.js' : ['range.js','main.js','dragModule.js']
				 }
			 }
		 },
		 uglify: {
			 webqq : {
					files: {
						'dist/main.min.js' : ['dist/main.js']	
					} 
				} 
		 }	
	});
	//合并插件
	grunt.loadNpmTasks('grunt-contrib-concat');
	//压缩插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	//所用的插件
  	grunt.registerTask('default', ['concat','uglify']);

	
};