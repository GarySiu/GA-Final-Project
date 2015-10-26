var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function(){
  return gulp.src(['libs/**/*.js', 'src/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function(){
  return gulp.src(['libs/**/*.css', 'src/**/*.css'])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['scripts', 'styles']);

gulp.watch(['src/**/*.js', 'src/**/*.css'], ['default']);