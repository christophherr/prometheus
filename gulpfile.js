/**
 * Prometheus 2.
 *
 * This file adds gulp tasks to the Prometheus 2 theme.
 *
 * @author Christoph Herr
 */

// Set up dependencies.
const autoprefixer = require( 'autoprefixer' );
const del = require( 'del' );
const mqpacker = require( 'css-mqpacker' );
const fs = require( 'fs' );
const gulp = require( 'gulp' );
const cleancss = require( 'gulp-clean-css' );
const cssnano = require( 'gulp-cssnano' );
const minify = require( 'gulp-minify' );
const notify = require( 'gulp-notify' );
const pixrem = require( 'gulp-pixrem' );
const plumber = require( 'gulp-plumber' );
const postcss = require( 'gulp-postcss' );
const rename = require( 'gulp-rename' );
const sass = require( 'gulp-sass' );
const sassLint = require( 'gulp-sass-lint' );
const sourcemaps = require( 'gulp-sourcemaps' );
const stylefmt = require( 'gulp-stylefmt' );
const styleLint = require( 'gulp-stylelint' );

/**
 * Error handling
 *
 * @function
 */
function handleErrors() {
	const args = Array.prototype.slice.call( arguments );

	notify
		.onError({
			title: 'Task Failed [<%= error.message %>',
			message: 'See console.'
		})
		.apply( this, args );

	// Prevent the 'watch' task from stopping
	this.emit( 'end' );
}

/*************
 * CSS Tasks
 ************/

/**
 * PostCSS Task Handler
 */
gulp.task( 'postcss', () => {
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

		// Change spaces to tabs and other fixes.
		.pipe( stylefmt() )

		// Additional WordPress style fixes.
		.pipe(
			styleLint({
				fix: true
			})
		)

		// Create the source map.
		.pipe(
			sourcemaps.write( './', {
				includeContent: false
			})
		)
		.pipe( gulp.dest( './' ) );
});

gulp.task( 'rename:map', [ 'postcss' ], () => {
	gulp
		.src( 'style.css.map' )
		.pipe( rename( 'style.min.css.map' ) )
		.pipe( gulp.dest( './' ) );
});

gulp.task( 'clean:map', [ 'rename:map' ], () => {
	return del( 'style.css.map' );
});

gulp.task( 'css:minify', [ 'clean:map' ], () => {
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
		);
});

gulp.task( 'sass:lint', [ 'css:minify' ], () => {
	gulp
		.src([ '/scss/style.scss', '!/scss/resets/index.scss' ])
		.pipe( sassLint() )
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() );
});

/*******************
 * JavaScript Tasks
 *******************/

gulp.task( 'js:minify', () => {
	gulp
		.src([ 'js/prometheus2.js', 'js/responsive-menus.js' ])

		// Error handling
		.pipe(
			plumber({
				errorHandler: handleErrors
			})
		)

		// Minify JavaScript
		.pipe(
			minify({
				ext: {
					src: '.js',
					min: '.min.js'
				},
				noSource: true
			})
		)
		.pipe( gulp.dest( 'js' ) );
});

/********************
 * All Tasks Listeners
 *******************/

gulp.task( 'watch', () => {
	gulp.watch( 'scss/**/*.scss', [ 'styles' ]);
});

/**
 * Individual tasks.
 */
gulp.task( 'scripts', [ 'js:minify' ]);
gulp.task( 'styles', [ 'sass:lint' ]);

gulp.task( 'default', [ 'styles', 'scripts' ]);
