var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('usemin', function() {
	gulp.src("index.html")
		.pipe(usemin({
			css: [minifyCss(), 'concat'],
			html: [minifyHtml({empty: true})],
      		js: [uglify()]
		}))
		.pipe(gulp.dest('build/'));

	gulp.src('img/*')
		.pipe(gulp.dest('build/img/'));
});

gulp.task('develop', function() {
	connect.server({
		livereload: true
	});
	watch(['css/*.css', 'script/*.js'])
		.pipe(connect.reload());
});

gulp.task('product', ['usemin']);
