'use strict';

import { dest, src } from 'gulp';
import pump from 'pump';
import { paths, gulpPlugins } from './config';

/************************
 * Optimize theme images
 ***********************/
export default function images( done ) {
	pump(
		[
			src( paths.images.src ),
			gulpPlugins.newer( paths.images.dest ),
			gulpPlugins.imagemin([
				gulpPlugins.imagemin.gifsicle({ interlaced: true }),
				gulpPlugins.imagemin.jpegtran({ progressive: true }),
				gulpPlugins.imagemin.optipng({ optimizationLevel: 5 }),
				gulpPlugins.imagemin.svgo({
					plugins: [ { removeViewBox: true }, { cleanupIDs: false } ]
				})
			]),
			dest( paths.images.dest )
		],
		done
	);
}
