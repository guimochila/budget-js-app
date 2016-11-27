// Gulpfile.js for the Budgety app
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');

// Serve task
gulp.task('serve', function () {
    return gulp.src('src/**/*')
        .pipe(livereload())
        .pipe(notify({message: 'Page reloaded.'}))
});

// Watch task
gulp.task('watch', ['serve'], function() {
    require('./server');
    livereload.listen();
    gulp.watch('src/**/*', ['serve']);
});

gulp.task('default', ['watch'], function() {});
