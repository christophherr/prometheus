'use strict';

import { src, dest } from 'gulp';
import pump from 'pump';
import { paths, gulpPlugins } from './config';

export default function minifyStyles( done ) {

	/**
	 * Minify style.css
	 */
	pump(
		[
			src( paths.styles.minSrc ),
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
			dest( paths.styles.dest )
		],
		done
	);
}
