/* global process, __dirname */
(function () {
  'use strict';

  var gulp = require('gulp');
  var runSequence = require('run-sequence');
  var del = require('del');
  var browserSync = require('browser-sync').create();
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');
  var babel = require('gulp-babel');

  var appRoot = './src/';
  var outputRoot = '../public/script';
  var cssRoot = '../public/css'

  var paths = {
    root: appRoot,
    source: appRoot + '**/*.jsx',
    sass: './sass/**/*.scss',
    output: outputRoot
  }

  gulp.task('build-js', function () {
    return gulp.src(paths.source)
      .pipe(babel({ presets: ['es2015', 'react'] }))
      .pipe(gulp.dest(paths.output));
  });

  gulp.task('clean', function () {
    return del([outputRoot,cssRoot], {force: true});
  });

  gulp.task('build-sass', function () {
    return gulp.src(paths.sass)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(cssRoot));
  });

  gulp.task('webserver', function () {
    browserSync.init({
      startPath: '/',
      server: {
        baseDir: "../public",
        host: "0.0.0.0"
      },
      browser: 'chrome'
    });
  });


  gulp.task('build', function (callback) {
    return runSequence(
      'clean',
      ['build-js', 'build-sass'],
      callback
    );
  });

  gulp.task('serve', ['clean', 'build-js', 'build-sass'], function (cb) {
    gulp.watch('src/**/*.jsx', ['build-js', browserSync.reload]);
    gulp.watch('sass/**/*.scss', ['build-sass', browserSync.reload]);

    return runSequence('webserver', cb);
  });

  gulp.task('default', ['serve']);

} ());
