var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var js = './src/**/*.js';
var scss = './src/**/*.scss';

gulp.task('lint', function() {
	gulp.src(js)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('dist-js', function() {
	gulp.src(js)
	.pipe(concat('./dist'))
	.pipe(rename('dist.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist'));
});

gulp.task('dist-css', function() {
	gulp.src(scss)
	.pipe(sass())
	.pipe(concat('./dist'))
	.pipe(rename('dist.min.css'))
	.pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
	gulp.run('lint', 'dist-js', 'dist-css');
	gulp.watch(js, function() { gulp.run('lint', 'dist-js') });
	gulp.watch(scss, function() { gulp.run('dist-css') });
});
