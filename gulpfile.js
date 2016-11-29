// Gulpfile.js for the Budgety app
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    cleanCSS = require('gulp-clean-css'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    eslint = require('gulp-eslint'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify');

// Style task
gulp.task('styles', function () {
    return gulp.src('src/css/*.css')
        .pipe(plumber(function (err) {
            gutil.log('Style task error: \n' + err);
            this.emit('end');
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(livereload());
});

// HTML main file
gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(plumber(function (err) {
            gutil.log('HTML task error: \n' + err);
            this.emit('end');
        }))
        .pipe(gulp.dest('build/'))
        .pipe(livereload());
});

// Image file
gulp.task('images', function () {
    return gulp.src('src/img/*.png')
        .pipe(plumber(function (err) {
            gutil.log('Images task error: \n' + err);
            this.emit('end');
        }))
        .pipe(gulp.dest('build/img'))
        .pipe(livereload());
});

// ESlint task
gulp.task('lint', function() {  
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
        .pipe(gulp.dest('build/assets/js'))
        .pipe(livereload());
});

// Watch task
gulp.task('watch', ['default'], function () {
    require('./server');
    livereload.listen();
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/js/**/*.js', ['build']);
});

gulp.task('default', ['html', 'images', 'styles', 'lint', 'build'], function () { });
