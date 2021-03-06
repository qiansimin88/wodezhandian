var gulp = require('gulp'),
    
    less = require('gulp-less');           //编译less

    // mincss = require('gulp-minify-css'),   //压缩CSS

    // sourcemaps = require('gulp-sourcemaps'),   //生成maps文件

    // uglify  = require('gulp-uglify'),      //JS压缩

    // changed = require('gulp-changed'),

    // plumber = require('gulp-plumber'),

    // notify = require('gulp-notify'),

    // autoprefixer = require('gulp-autoprefixer');   //css自动补全



var pathOption = {

    'localcss' : './less/lib/less/*.less',

    // 'localjs': './data/skin/ilongre/minjs/*.js',


    'distcss': './less/dist/css'

    // 'distjs': './dist/js'


};


 gulp.task('css',function () {

    return gulp.src(pathOption.localcss)

            // .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))

            // .pipe(changed(pathOption.distcss))


            .pipe(less())

            //  .pipe(mincss({

            //     advanced:true,   //合并选择器
            //     compatibility:'ie7'//兼容IE7

            // }))

            // .pipe(sourcemaps.init())


            // .pipe(autoprefixer({

            //     browsers:['last 3 versions','iOS 7'],
            //     cascade: true  //美化：自动空格

            // }))

            // .pipe(sourcemaps.write('./map'))

           

            .pipe(gulp.dest(pathOption.distcss));

 });

 //JS压缩暂时对我弊大于利

 // gulp.task('js',function () {

 //    return gulp.src(pathOption.localjs)

 //             .pipe(changed(pathOption.distjs))

 //              .pipe(sourcemaps.init())

 //              .pipe(sourcemaps.write())

 //              .pipe(uglify())

 //             .pipe(gulp.dest(pathOption.distjs))

 // })

 gulp.task('watch',function () {

     gulp.watch(pathOption.localcss,function (event){

        console.log(typeof event.type);

        if(typeof event.type == 'string') {

            gulp.start('css');

        }

     });

 });

 gulp.task('default',['css'],function () {

    gulp.start('watch');

 });