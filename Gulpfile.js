/* global require */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer');

gulp.task('styles', function() {
  gulp.src('stylesheets/app.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(prefix("last 15 version"))
      .pipe(gulp.dest('assets/'));
});

gulp.task('default', function(){
  gulp.run('styles');

  gulp.watch('stylesheets/**/*.scss', function() {
    gulp.run('styles');
  })
});
