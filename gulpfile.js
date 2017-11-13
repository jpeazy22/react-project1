var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task('styles', function() {
    gulp.src('styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles'));
});

gulp.task('webserver', function() {
	return gulp.src('./')
	.pipe(webserver({
		livereload: true,
		directoryListing: {
			enable: true,
			path: 'app'
		},
		open: true
	}));
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('styles/main.scss',['styles']);
});