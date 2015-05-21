// 包装函数
module.exports = function(grunt) {

  // 任务配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
   
   //合并
   concat : {
	   
	  	aler: {
			
				files : {
						
						 'dist/distAler.js' : ['a.js','show.js']
					}
			}
		 
	  },
	  uglify : {
		  
		 	aler: {
				
				files : {
					
					 'dist/main.min.js' : ['dist/distAler.js']	
				}
					
			} 
		 }
   
  });

  // 任务加载
  grunt.loadNpmTasks('grunt-contrib-concat');
  // 任务加载
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 自定义任务
  grunt.registerTask('default', ['concat','uglify']);

};