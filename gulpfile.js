// Gulpfile.js for the Budgety app
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    cleanCSS = require('gulp-clean-css'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    eslint = require('gulp-eslint'),
    jasmine = require('gulp-jasmine'),
    browserSync = require('browser-sync').create(),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify');

// Uni Testing task
gulp.task('testing', function () {
    return gulp.src('specs/BudgetControllerSpec.js')
        .pipe(jasmine());
});

// Browser-sync reload
gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

// Style task
gulp.task('styles', function () {
    return gulp.src('src/css/*.css')
        .pipe(plumber(function (err) {
            gutil.log('Style task error: \n' + err);
            this.emit('end');
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/assets/css'));

});

// HTML main file
gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(plumber(function (err) {
            gutil.log('HTML task error: \n' + err);
            this.emit('end');
        }))
        .pipe(gulp.dest('build/'));
});

// Image file
gulp.task('images', function () {
    return gulp.src('src/img/*.png')
        .pipe(plumber(function (err) {
            gutil.log('Images task error: \n' + err);
            this.emit('end');
        }))
        .pipe(gulp.dest('build/img'));
});

// ESlint task
gulp.task('lint', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

// Build scripts using Browserify
gulp.task('build', function () {
    return browserify({
        entries: ['./src/js/app.js'],
        debug: true
    })
        .bundle()
        .on('error', function (e) {
            gutil.log('Scripts task error: \n' + e);
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/assets/js'));
});

// Watch task
gulp.task('watch', ['default'], function () {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });

    gulp.watch('src/css/*.css', ['styles', 'reload']);
    gulp.watch('src/*.html', ['html', 'reload']);
    gulp.watch('src/js/**/*.js', ['build', 'reload']);
});

gulp.task('default', ['html', 'images', 'styles', 'lint', 'testing' ,'build'], function () { });
