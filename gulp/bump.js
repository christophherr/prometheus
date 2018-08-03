'use strict';

import { dest, src } from 'gulp';
import pump from 'pump';
import { rootPath, paths, gulpPlugins } from '../config/gulpConfig';
import { arg } from '../js/tooling/gulp-fetch-cl-arguments';

/**************************************************
 * Bump theme version.
 *
 * Usage:
 *
 * If you have Gulp 4 installed globally:
 *  gulp bump --major -> from 1.0.0 to 2.0.0
 *  gulp bump --minor -> from 1.0.0 to 1.1.0
 *  gulp bump --patch -> from 1.0.0 to 1.0.1
 *
 * If you have Gulp 3 installed globally:
 *  npm run bump -- --major -> from 1.0.0 to 2.0.0
 *  npm run bump -- --minor -> from 1.0.0 to 1.1.0
 *  npm run bump -- --patch -> from 1.0.0 to 1.0.1
 *
 * The theme version in PHP is updated
 * automatically from the stylesheet.
 *************************************************/
export function bumpRootFiles( done ) {
	pump(
		[
			src([ './package.json', './composer.json', './style.css' ]),
			gulpPlugins.bump({
				type: versionBump()
			}),

			dest( rootPath + '/' )
		],
		done
	);
}

export function bumpSass( done ) {
	pump(
		[
			src( paths.styles.src ),
			gulpPlugins.bump({
				type: versionBump()
			}),
			dest( './scss/' )
		],
		done
	);
}

function versionBump() {
	if ( arg.major ) {
		return 'major';
	}

	if ( arg.minor ) {
		return 'minor';
	}

	if ( arg.patch ) {
		return 'patch';
	}
}
