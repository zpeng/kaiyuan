'use strict';

var gulp = require('gulp');
var del = require('del');

// Load plugins
var $ = require('gulp-load-plugins')();
var _ = require('underscore');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

// Styles
gulp.task('styles', function () {
    return gulp.src('app/*/styles/*.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/bower_components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/'))
        .pipe($.size());
});


gulp.task('lint', function() {
  return gulp.src('./app/*/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

// Scripts
gulp.task('scripts', function () {
    var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src(['./app/ChromeExt/*.js']) // hello `gulp.src()` my old friend
    .pipe(browserified)
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/ChromeExt/'));
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/*/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/*/images/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/'))
        .pipe($.size());
});



// Clean
gulp.task('clean', function (cb) {
    cb(del.sync(['dist/bower_components', 'dist/chromeExt', 'dist/server_master', 'dist/server_worker']));
});


// Bundle
gulp.task('bundle', ['styles', 'lint', 'scripts', 'bower'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});

// Webserver
gulp.task('livereload', function () {
    gulp.src('./dist')
        .pipe($.webserver({
            livereload: true,
            port: 9000,
            open: true
        }));
});

// Bower helper
gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task('json', function() {
    gulp.src('app/**/*.json', {base: 'app'})
        .pipe(gulp.dest('dist/'));
});

// Robots.txt and favicon.ico
gulp.task('extras', function () {
    return gulp.src(['app/*/*.txt', 'app/*/*.ico'])
        .pipe(gulp.dest('dist/'))
        .pipe($.size());
});

// serve = Watch + livereload
gulp.task('serve', ['html', 'bundle', 'livereload'], function () {
    // Watch .json files
    gulp.watch('app/**/*.json', ['json']);
    // Watch .html files
    gulp.watch('app/**/*.html', ['html']);    
    // Watch .scss files
    gulp.watch('app/**/styles/*.scss', ['styles']);
    // Watch image files
    gulp.watch('app/**/images/*', ['images']);
    // Watch javascripts
    gulp.watch('app/**/*.js', ['lint', 'scripts']);    
});

// Build
gulp.task('build', ['html', 'bundle', 'images', 'extras']);

// Default task
gulp.task('default', ['clean', 'build']);
