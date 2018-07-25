'use strict';

import { src, dest } from 'gulp';
import pump from 'pump';
import { paths, gulpPlugins } from './config';

/**
 * JavaScript Task Handler.
 */
export default function scripts( done ) {
	pump(
		[
			src( paths.scripts.src ),
			gulpPlugins.newer( paths.scripts.dest ),
			gulpPlugins.babel(),
			gulpPlugins.prettierEslint(),
			dest( paths.scripts.dest )
		],
		done
	);
}
