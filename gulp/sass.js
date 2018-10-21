'use strict';

import { src, dest } from 'gulp';
import pump from 'pump';
import mqpacker from 'css-mqpacker';
import { paths, gulpPlugins } from '../config/gulpConfig';
import postcssPresetEnv from 'postcss-preset-env';

export default function sass( done ) {

	/**
	 * PostCSS Task Handler
	 */
	pump(
		[
			src( paths.styles.src, { sourcemaps: true }),
			gulpPlugins.sass({
				errLogToConsole: true,
				outputStyle: 'expanded' // Options: nested, expanded, compact, compressed
			}),
			gulpPlugins.pixrem(),
			gulpPlugins.postcss([
				postcssPresetEnv(),
				mqpacker({
					sort: true
				})
			]),
			gulpPlugins.stylelint({
				fix: true,
				reporters: [ { formatter: 'string', console: true } ]
			}),
			dest( paths.styles.dest, { sourcemaps: './' })
		],
		done
	);
}
