'use strict';

import { src } from 'gulp';
import pump from 'pump';
import { paths, gulpPlugins } from '../config/gulpConfig';

export default function lintStyles( done ) {

	/**
	 * Lint Scss files.
	 */
	pump(
		[
			src( paths.styles.src ),
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
