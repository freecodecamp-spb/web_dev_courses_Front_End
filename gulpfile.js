// Dependencies
var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var del = require('del');

var browserSync = require('browser-sync')
    .create();

var Settings = require('./settings/settings');

var paths = {
    ejsFiles: "./views/**/*.ejs",
    jsFiles: "client/**/*.js",
    cssFiles: "client/**/*.css"
};

// Watching modified files
gulp.task(
    'watch',
    function() {
        watch(
            [
                paths.ejsFiles,
                paths.jsFiles,
                paths.cssFiles
            ],
            batch(function(events, done) {
                gulp.start('build:dev', done);
            }));
    }
);

gulp.task(
    'browser-sync',
    ['nodemon'],
    function() {
        browserSync.init(null, {
            proxy: "http://localhost:3000",
            files: ["public/**/*.*"],
            port: 7000
        });
    }
);

gulp.task(
    'nodemon',
    function(callback) {
        var started = false;
        return nodemon({
            script: 'server.js'
        })
            .on('start', function() {
                if (!started) {
                    callback();
                    started = true;
                }
            });
    }
);

gulp.task(
    'build:dev',
    ['build:js', 'build:css', 'copy:templates']
);

gulp.task(
    'build:js',
    ['clean:js'],
    function() {
        return gulp.src(
            [
                'client/app.js', /* must be first */
                paths.jsFiles
            ]
        )
            .pipe(concat('build.js'))
            .pipe(gulp.dest('public/js/'));
    }
);

gulp.task(
    'build:css',
    ['clean:css'],
    function() {
        return gulp.src(
            [
                'client/components/main/main.css', /* must be first */
                paths.cssFiles
            ]
        )
            .pipe(concat('build.css'))
            .pipe(gulp.dest('public/css/'));
    }
);

gulp.task(
    'copy:templates',
    function() {
        gulp
            .src('client/components/**/*.html')
            .pipe(gulp.dest('public/templates/'));
    }
);

gulp.task(
    'clean:js',
    function() {
        return del([
            'public/js/'
        ]);
    }
);

gulp.task(
    'clean:css',
    function() {
        return del([
            'public/css/'
        ]);
    }
);

gulp.task(
    'default',
    ['build:dev', 'watch', 'nodemon']
);
