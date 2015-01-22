var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var kmc = require('kmc');

kmc.config({
    packages: {
        mock: {
            base: 'http://mockjs.com/dist/'
        },
        components: {
        	base: 'script'
        }
    }
});

gulp.task('css', function() {
	gulp.src("css/*.css")
		.pipe(minifyCss())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('build'));
});

gulp.task('kmc', function() {
	var input = 'script/components/main.js',
		output = 'build/components/main.js';
	kmc.build(input, output);
	gulp.src(output)
		.pipe(uglify())
		.pipe(gulp.dest('build/components'));
});

gulp.task('develop', function() {
	connect.server({
		livereload: true
	});
	watch(['css/*.css', 'script/*.js'])
		.pipe(connect.reload());
});

gulp.task('default', ['css', 'kmc']);
