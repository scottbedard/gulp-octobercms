/**
 * Dependencies
 */
var gulp = require('gulp');
var glob = require('glob');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var uncss = require('gulp-uncss');
var plumber = require('gulp-plumber');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var groupmedia = require('gulp-group-css-media-queries');

/**
 * SCSS / CSS processes
 */
gulp.task('css', function() {
	gulp.src('assets/scss/main.scss')
		.pipe(plumber({								// Logs errors and makes a beep
			errorHandler: function (err) {  
				gutil.beep();
				console.log(err);
			}
		}))
		.pipe(sass())								// Compile our SCSS
		.pipe(autoprefixer('last 20 versions'))		// Add browser prefixes
		.pipe(groupmedia())							// Group media queries
		.pipe(uncss({
			html: glob.sync('**/*.htm')				// Scan the theme and remove unnecessary selectors
		}))
		.pipe(minifycss())							// Minify
		.pipe(gulp.dest('assets/css'));				// Pipe the output to our css directory
});

/**
 * Watches the file system for changes
 */
gulp.task('watch', function() {
	gulp.watch([
		'content/*.htm',							// Watch OctoberCMS .htm files
		'layouts/*.htm',
		'pages/*.htm',
		'partials/*.htm',
		'assets/scss/**/*.scss'						// Watch for .scss files
	], ['css']);
})

gulp.task('default', ['watch']);