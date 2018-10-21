'use strict';

import { src, dest, series } from 'gulp';
import pump from 'pump';
import mqpacker from 'css-mqpacker';
import postcssPresetEnv from 'postcss-preset-env';
import sortCSSmq from 'sort-css-media-queries';
import { paths, gulpPlugins } from '../config/gulpConfig';

export function lintWC( done ) {

	/**
	 * Lint WooCommerce Scss files.
	 */
	pump(
		[
			src( paths.wcStyles.src ),
			gulpPlugins.sassLint({
				rules: {
					quotes: {
						style: 'double'
					}
				}
			}),
			gulpPlugins.sassLint.format(),
			gulpPlugins.sassLint.failOnError()
		],
		done
	);
}

export function wcSass( done ) {

	/**
	 * PostCSS Task Handler
	 */
	pump(
		[
			src( paths.wcStyles.src, { sourcemaps: true }),
			gulpPlugins.sass({
				errLogToConsole: true,
				outputStyle: 'expanded' // Options: nested, expanded, compact, compressed
			}),
			gulpPlugins.pixrem({ rootValue: '10px' }),
			gulpPlugins.postcss([
				postcssPresetEnv(),
				mqpacker({
					sort: sortCSSmq.desktopFirst
				})
			]),
			gulpPlugins.stylelint({
				fix: true
			}),
			dest( paths.wcStyles.dest, { sourcemaps: './' })
		],
		done
	);
}

export function minifyWCStyles( done ) {

	/**
	 * Minify WooCommerce style.css
	 */
	pump(
		[
			src( paths.wcStyles.minSrc ),
			gulpPlugins.cleanCss({
				level: {
					1: {
						specialComments: 0
					},
					2: {
						all: true
					}
				}
			}),
			gulpPlugins.rename({ suffix: '.min' }),
			dest( paths.wcStyles.dest )
		],
		done
	);
}

const WC = series( lintWC, wcSass, minifyWCStyles );

export default WC;
