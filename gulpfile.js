var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var csso = require('gulp-csso');
var sass = require('gulp-sass');
var sassImport 	= require('gulp-sass-import');




gulp.task('sass', function () {
    return gulp.src('./style/*.sass')
        .pipe(sassImport({
            filename : '*.sass',
            marker : '/*'
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(gulp.dest('./public/css/'));
});


gulp.task('js', function() {
    return gulp.src(['./js/**/*.js'])
        .pipe(concat('min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
});


gulp.task('images', function() {
    return gulp.src('./img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images/'))

});


gulp.task('watch', function () {
    gulp.watch('./style/*.sass', gulp.series('sass'));
    gulp.watch('./js/**/*.js', gulp.series('js'));
    gulp.watch('./img/**/*', gulp.series('images'));
});
gulp.task('default', gulp.series('js', 'sass', 'images', 'watch'));