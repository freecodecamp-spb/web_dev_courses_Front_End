// Dependencies
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var Settings = require('./settings/settings');
var paths = {
    ejsFiles: "./views/**/*.ejs"
};

// Watching modified files
gulp.task('watch', function() {
    gulp.watch(paths.ejsFiles).on('change', browserSync.reload);
});


gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        port: 7000
    });
});

gulp.task('nodemon', function(callback) {
    var started = false;
    return nodemon({
        script: 'server.js'
    }).on('start', function() {
        if (!started) {
            callback();
            started = true;
        }
    });
});

gulp.task('default', ['watch', 'browser-sync']);
