var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var kmc = require('kmc');
var sass = require('gulp-sass');

kmc.config({
    packages: {
        mock: {
            base: 'http://mockjs.com/dist/'
        },
        components: {
        	base: 'script',
        	ignorePackageNameInUri: true
        }
    }
});

gulp.task('sass', function () {
    gulp.src('sass/*')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('kmc', function() {
  var input = 'script/main.js',
      output = 'build/main.js';
	kmc.build(input, output);
  gulp.src(output)
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});


gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch('script/*.js', ['kmc']);
  livereload.listen();
  gulp.watch(['build/**']).on('change', livereload.changed);
});

gulp.task('default', ['sass', 'kmc']);
