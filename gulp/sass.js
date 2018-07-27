'use strict';

import { src, dest } from 'gulp';
import pump from 'pump';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import { paths, gulpPlugins } from '../config/gulpConfig';

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
				autoprefixer(),
				mqpacker({
					sort: true
				})
			]),
			gulpPlugins.stylelint({
				fix: true
			}),
			dest( paths.styles.dest, { sourcemaps: './' })
		],
		done
	);
}
