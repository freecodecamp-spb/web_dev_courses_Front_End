// Dependencies
var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var del = require('del');
var image = require('gulp-image-optimization');

var browserSync = require('browser-sync')
    .create();

var Settings = require('./settings/settings');

var paths = {
    ejsFiles: "./views/**/*.ejs",
    jsFiles: "client/**/*.js",
    templateFiles: "client/components/**/*.html",
    cssFiles: "client/**/*.css",
    imageFiles: "client/images/**/*.jpg"
};

// Watching modified files
gulp.task(
    'watch',
    function() {
        watch(
            [
                paths.ejsFiles,
                paths.jsFiles,
                paths.templateFiles,
                paths.cssFiles,
                paths.imageFiles
            ],
            batch(function(events, done) {
                gulp.start('build:dev', done);
            }));
    }
);

gulp.task(
    'browser-sync', ['nodemon'],
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
                script: 'server.js',
                ignore: [
                    'public/**/*.*',
                    paths.jsFiles,
                    paths.cssFiles
                ]
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
    'build:dev', ['processImages','build:js', 'build:css', 'copy:templates']
);

gulp.task('processImages', ['clean:img'], function(cb) {
    gulp.src(paths.imageFiles).pipe(image({
        optimizationLevel: 6,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/images/')).on('error', cb);
});

gulp.task(
    'build:js', ['clean:js'],
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
    'build:css', ['clean:css'],
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
    'copy:templates', ['clean:templates'],
    function() {
        gulp
            .src(paths.templateFiles)
            .pipe(gulp.dest('public/templates/'));
    }
);

gulp.task(
    'clean:templates',
    function() {
        return del([
            'public/templates/'
        ]);
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
    'clean:img',
    function() {
        return del([
            'public/images'
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
    'default', ['build:dev', 'watch', 'browser-sync']
);
