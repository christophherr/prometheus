/**
 * Prometheus 2.
 *
 * This file adds gulp tasks to the Prometheus 2 theme.
 *
 * @author Christoph Herr
 */

// Set up dependencies.
const autoprefixer = require( 'autoprefixer' ),
	del = require( 'del' ),
	mqpacker = require( 'css-mqpacker' ),
	fs = require( 'fs' ),
	gulp = require( 'gulp' ),
	cleancss = require( 'gulp-clean-css' ),
	cssnano = require( 'gulp-cssnano' ),
	notify = require( 'gulp-notify' ),
	pixrem = require( 'gulp-pixrem' ),
	plumber = require( 'gulp-plumber' ),
	postcss = require( 'gulp-postcss' ),
	rename = require( 'gulp-rename' ),
	sass = require( 'gulp-sass' ),
	sassLint = require( 'gulp-sass-lint' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	stylefmt = require( 'gulp-stylefmt' );

/**
 * Error handling
 *
 * @function
 */
function handleErrors() {
	var args = Array.prototype.slice.call( arguments );

	notify
		.onError({
			title: 'Task Failed [<%= error.message %>',
			message: 'See console.'

			//sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
		})
		.apply( this, args );

	//gutil.beep(); // Beep 'sosumi' again

	// Prevent the 'watch' task from stopping
	this.emit( 'end' );
}

/*************
 * CSS Tasks
 ************/

/**
 * PostCSS Task Handler
 */
gulp.task( 'postcss', function() {
	return (
		gulp
			.src( 'scss/style.scss' )

			// Error handling
			.pipe(
				plumber({
					errorHandler: handleErrors
				})
			)

			// Wrap tasks in a sourcemap.
			.pipe( sourcemaps.init() )

			// Sass magic.
			.pipe(
				sass({
					errLogToConsole: true,
					outputStyle: 'expanded' // Options: nested, expanded, compact, compressed
				})
			)

			// Pixel fallbacks for rem units.
			.pipe( pixrem() )

			// PostCSS magic.
			.pipe(
				postcss([
					autoprefixer({
						browsers: [ 'last 2 versions' ]
					}),
					mqpacker({
						sort: true
					})
				])
			)

			// Change spaces to tabs.
			.pipe( stylefmt() )

			// Create the source map.
			.pipe(
				sourcemaps.write( './', {
					includeContent: false
				})
			)

			.pipe( gulp.dest( './' ) )
	);
});

gulp.task( 'rename:map', [ 'postcss' ], function() {
	return gulp
		.src( 'style.css.map' )
		.pipe( rename( 'style.min.css.map' ) )
		.pipe( gulp.dest( './' ) );
});

gulp.task( 'clean:map', [ 'rename:map' ], function() {
	return del( 'style.css.map' );
});

gulp.task( 'css:minify', [ 'clean:map' ], function() {
	return (
		gulp
			.src( 'style.css' )

			// Error handling
			.pipe(
				plumber({
					errorHandler: handleErrors
				})
			)

			// Combine similar rules.
			.pipe(
				cleancss({
					level: {
						2: {
							all: true
						}
					}
				})
			)

			// Minify and optimize style.css again.
			.pipe(
				cssnano({
					safe: false,
					discardComments: {
						removeAll: true
					}
				})
			)

			.pipe( rename( 'style.min.css' ) )
			.pipe( gulp.dest( './' ) )

			.pipe(
				notify({
					message: 'Styles are built.'
				})
			)
	);
});

gulp.task( 'sass:lint', [ 'css:minify' ], function() {
	gulp
		.src([ '/scss/style.scss', '!/scss/resets/index.scss' ])
		.pipe( sassLint() )
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() );
});

/********************
 * All Tasks Listeners
 *******************/

gulp.task( 'watch', function() {
	gulp.watch( 'scss/**/*.scss', [ 'styles' ]);
});

/**
 * Individual tasks.
 */
// gulp.task('scripts', [''])
gulp.task( 'styles', [ 'sass:lint' ]);

gulp.task( 'default', [ 'styles' ]);
