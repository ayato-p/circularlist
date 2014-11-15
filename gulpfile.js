'use strict';

// gulp plugins
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

// other libraries
var runSequence = require('run-sequence'),
    del = require('del'),
    glob = require('glob');

// for browserify
var browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream');

// filepaths
var SPEC      = './spec',
    DIST_SPEC = './dist_spec';

var JS_FILE_NAME = 'circularlist.js',
    MIN_JS_FILE_NAME = 'circularlist.min.js',
    MAIN_SPEC_FILE_NAME = 'spec.js';

/*
 * Others
 */
gulp.task('clean', function(callback){
  del([DIST_SPEC], callback);
});

var swallowError = function(error){
  console.log(error.toString());
  this.emit('end');
};

/*
 * JavaScript
 */

/*
 * Unit Test
 */
// I really want change to using watchfy. Maybe I will later.
gulp.task('power-assert', function(){
  var testFiles = glob.sync(SPEC + '/**/*.js'),
      bundler = browserify({entries: testFiles, debug: true});

  bundler.transform('espowerify');

  return bundler.bundle().
    on('error', swallowError).
    pipe(source(MAIN_SPEC_FILE_NAME)).
    pipe(gulp.dest(DIST_SPEC));
});

gulp.task('jasmine', function(){
  return gulp.src(DIST_SPEC + '/' + MAIN_SPEC_FILE_NAME).
    pipe($.jasmine()).
    on('error', swallowError);
});

/*
 * Build stuffs
 */
gulp.task('uglify', function(){
  return gulp.src(JS_FILE_NAME).
    pipe($.uglify()).
    pipe($.rename({suffix: '.min'})).
    pipe(gulp.dest('./'));
});

gulp.task('jshint', function(){
  return gulp.src([JS_FILE_NAME, SPEC+'/**/*.js']).
    pipe($.jshint()).
    pipe($.jshint.reporter('jshint-stylish'));
});

/*
 * Main tasks
 */
gulp.task('default', ['build']);

gulp.task('build', function(){
  return runSequence(
    'clean',
    ['power-assert', 'jshint'],
    'jasmine',
    'uglify');
});

gulp.task('watch', ['build'], function(){
  gulp.watch([JS_FILE_NAME, SPEC+'/**/*.js'], function(){
    return runSequence(
      'clean',
      ['power-assert', 'jshint'],
      'jasmine');
  });
});
