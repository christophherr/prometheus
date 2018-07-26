'use strict';

import { src, dest } from 'gulp';
import pump from 'pump';
import { paths, gulpPlugins } from './config';

/**
 * JavaScript Minifer Handler.
 */
export default function minifyScripts( done ) {
	pump(
		[
			src( paths.scripts.minSrc ),
			gulpPlugins.newer( paths.scripts.min ),
			gulpPlugins.minify({
				ext: {
					src: '.js',
					min: '.min.js'
				},
				noSource: true
			}),
			dest( paths.scripts.dest )
		],
		done
	);
}
