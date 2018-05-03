var gulp = require('gulp'),
	sass = require('gulp-sass'),
	webserver = require('gulp-webserver'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	runSequence = require('run-sequence'),
	minify = require('gulp-minify-css'),
	merge = require('merge-stream'),
	webpack = require('webpack-stream');

gulp.task('build/admin', function() {
	var scssStream = gulp.src('styles/*.scss')
		.pipe(sass())
		.pipe(concat('scss-files.scss'));
	var cssStream = gulp.src('styles/*.css')
		.pipe(concat('css-files.css'));
	var mergedStream = merge(scssStream, cssStream)
		.pipe(concat('styles.css'))
		.pipe(minify())
		.pipe(gulp.dest('dist/css'));
	return mergedStream;
});


gulp.task('default', function() {
  return gulp.src('src/app.js')
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
    gulp.src('styles/*.scss')
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

var gutil = require('gulp-util');

gulp.task('js', function() {
	return gulp.src('src/*.js')
	.pipe(uglify())
	.pipe(concat('src/*.js'))
	// .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(gulp.dest('dist/js/bundle.js'))
})

//Watch task
gulp.task('watch',function() {
	gulp.watch('styles/*.scss',['styles']);
});

//Run multiple task
gulp.task('develop', function(done) {
	runSequence('watch', 'webserver', function() {
		console.log('run somethinge else');
		done();
	});
});
