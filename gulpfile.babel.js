import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import del from 'del';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import filter from 'gulp-filter';
import rename from 'gulp-rename';

import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config';


let CONFIG = {
	entryJs: './src/index.js',

	destDir: './dist',
	outputName: 'blendr-loader'
};


// scripts
gulp.task('scripts', () => {
	return gulp.src(['babel-polyfill', CONFIG.entryJs])
			.pipe(webpackStream(webpackConfig))
			.pipe(gulp.dest(CONFIG.destDir))
			.pipe(filter(['**', '!**/*.js.map']))
			.pipe(rename(`${CONFIG.outputName}.min.js`))
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(CONFIG.destDir));
});

// clean
gulp.task('clean', function () {
	return del(['dist/']);
});

// default task
gulp.task('default', ['watch'], () => {});

// build
gulp.task('build', ['clean', 'scripts']);

// watch
//gulp.task('watch', ['clean', 'styles', 'vendor', 'scripts', 'fonts'], () => {
gulp.task('watch', ['scripts'], () => {
	// watch .js files
	gulp.watch('src/**/*.js', ['scripts']);
});
