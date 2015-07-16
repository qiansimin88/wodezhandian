var gulp = require('gulp'),
    
    seajstransport = require('gulp-seajs-transport');

gulp.task('default',function () {

	return gulp.src(['./js/control/*.js','./js/lib/*.js','./js/module/*.js'])

			.pipe(seajstransport())
			.pipe(gulp.dest('./js/bulid/'))
})