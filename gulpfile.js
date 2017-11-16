var gulp = require('gulp'),
	sass = require('gulp-sass'),
	webserver = require('gulp-webserver'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	runSequence = require('run-sequence'),
	minify = require('gulp-minify-css'),
	merge = require('merge-stream'),
	webpack = require("webpack"),
	webpack = require('webpack-stream'),
	WebpackDevServer = require("webpack-dev-server");

gulp.task('build/admin', function() {
	var scssStream = gulp.src('styles/*.scss')
		.pipe(sass())
		.pipe(concat('scss-files.scss'));
	var cssStream = gulp.src('styles/*.css')
		.pipe(concat('css-files.css'));
	var mergedStream = merge(scssStream, cssStream)
		.pipe(concat('styles.css'))
		.pipe(minify())
		.pipe(gulp.dest('web/css'));
	return mergedStream;
});

gulp.task("webpack", function(callback) {
    // run webpack
    webpack({
        // configuration
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('default', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack({
        // configuration
    });

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
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

gulp.task('js', function() {
	gulp.src('scripts/*.js')
	.pipe(uglify())
	.pipe(concat('script.js'))
	.pipe(gulp.dest('assests'))
})

//Watch task
gulp.task('watch',function() {
	gulp.watch('styles/*.scss',['styles']);
});

//Run multiple task
gulp.task('develop', function(done) {
	runSequence('watch', 'js', 'webserver', function() {
		console.log('run somethinge else');
		done();
	});
});
