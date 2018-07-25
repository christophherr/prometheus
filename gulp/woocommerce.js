const cleancss = require( 'gulp-clean-css' );
const autoprefixer = require( 'autoprefixer' );
const browserSync = require( 'browser-sync' );
const pixrem = require( 'gulp-pixrem' );
const postcss = require( 'gulp-postcss' );
const sass = require( 'gulp-sass' );
const sassLint = require( 'gulp-sass-lint' );
const sourcemaps = require( 'gulp-sourcemaps' );
const styleLint = require( 'gulp-stylelint' );
const rename = require( 'gulp-rename' );
const sortCSSmq = require( 'sort-css-media-queries' );

gulp.task( 'woocommerce', () => {
	gulp
		.src( './lib/plugins/woocommerce/scss/prometheus2-woocommerce.scss' )

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
				autoprefixer(),
				mqpacker({
					sort: sortCSSmq.desktopFirst
				}),
				require( 'styleLint' )({
					fix: true
				})
			])
		)

		// Create the source map.
		.pipe(
			sourcemaps.write( './', {
				includeContent: false
			})
		)

		.pipe( gulp.dest( './lib/plugins/woocommerce/' ) );
});

gulp.task( 'wc:minify', [ 'woocommerce' ], () => {
	gulp
		.src( './lib/plugins/woocommerce/prometheus2-woocommerce.css' )

		// Error handling.
		.pipe(
			plumber({
				errorHandler: handleErrors
			})
		)

		// Combine similar rules and minify styles.
		.pipe(
			cleancss({
				level: {
					1: {
						specialComments: 0
					},
					2: {
						all: true
					}
				}
			})
		)

		.pipe( rename( 'prometheus2-woocommerce.min.css' ) )

		.pipe( gulp.dest( './lib/plugins/woocommerce/' ) )

		.pipe(
			notify({
				message: 'Styles are built.'
			})
		);
});

gulp.task( 'wc:lint', [ 'wc:minify' ], () => {
	gulp
		.src( './lib/plugins/woocommerce/scss/prometheus2-woocommerce.scss' )
		.pipe(
			sassLint({
				rules: {
					quotes: {
						style: 'double'
					}
				}
			})
		)
		.pipe( sassLint.format() )
		.pipe( sassLint.failOnError() );
});
