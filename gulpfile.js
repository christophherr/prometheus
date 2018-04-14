/**
 * Prometheus 2.
 *
 * This file adds Gulp tasks to the Prometheus 2 theme.
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
const prettierEslint = require( 'gulp-prettier-eslint' );
const rename = require( 'gulp-rename' );
const sass = require( 'gulp-sass' );
const sassLint = require( 'gulp-sass-lint' );
const sourcemaps = require( 'gulp-sourcemaps' );
const sortCSSmq = require( 'sort-css-media-queries' );
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
			title: 'Task Failed [<%= error.message %>]',
			message: '<%= error %> - See console or enable logging in the plugin.'
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

		// Error handling.
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

		// WordPress style fixes.
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

/**
 * Minify style.css
 */
gulp.task( 'css:minify', [ 'postcss' ], () => {
	gulp
		.src( 'style.css' )

		// Error handling.
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

		// Minify and optimize style.css.
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

/**
 * Lint Scss files.
 */
gulp.task( 'sass:lint', [ 'css:minify' ], () => {
	gulp
		.src([ '/scss/style.scss', '!/scss/resets/index.scss' ])
		.pipe( sassLint() )
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() );
});

gulp.task( 'woocommerce', () => {
	gulp
		.src( 'lib/plugins/woocommerce/scss/prometheus2-woocommerce.scss' )

		// Error handling.
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
		.pipe( pixrem({ rootValue: '10px' }) )

		// PostCSS magic.
		.pipe(
			postcss([
				autoprefixer({
					browsers: [ 'last 2 versions' ]
				}),
				mqpacker({
					sort: sortCSSmq.desktopFirst
				})
			])
		)

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
		.pipe( gulp.dest( 'lib/plugins/woocommerce/' ) );
});

gulp.task( 'wc:minify', [ 'woocommerce' ], () => {
	gulp
		.src( 'lib/plugins/woocommerce/prometheus2-woocommerce.css' )

		// Error handling.
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

		// Minify and optimize style.css.
		.pipe(
			cssnano({
				safe: false,
				discardComments: {
					removeAll: true
				}
			})
		)

		.pipe( rename( 'prometheus2-woocommerce.min.css' ) )
		.pipe( gulp.dest( 'lib/plugins/woocommerce/' ) )

		.pipe(
			notify({
				message: 'Styles are built.'
			})
		);
});

gulp.task( 'wc:lint', [ 'wc:minify' ], () => {
	gulp
		.src( '/lib/plugins/woocommerce/scss/prometheus2-woocommerce.scss' )
		.pipe( sassLint() )
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() );
});

/*******************
 * JavaScript Tasks
 *******************/

/**
 * JavaScript Task Handler.
 */
gulp.task( 'js', () => {
	gulp
		.src([
			'js/prometheus2.js',
			'js/prometheus2-nojs.js',
			'js/responsive-menus.js'
		])

		// Error handling.
		.pipe(
			plumber({
				errorHandler: handleErrors
			})
		)

		// Linting and Pretty Printing.
		.pipe( prettierEslint() )

		// Minify JavaScript.
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
gulp.task( 'scripts', [ 'js' ]);
gulp.task( 'styles', [ 'sass:lint' ]);
gulp.task( 'wc-styles', [ 'wc:lint' ]);

gulp.task( 'default', [ 'styles', 'scripts' ]);
