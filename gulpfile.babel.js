/* eslint-env es6 */
'use strict';

/**
 * Prometheus 2.
 *
 * This file adds Gulp tasks to the Prometheus 2 theme.
 *
 * @author Christoph Herr
 */

import { parallel, series, task, watch as gulpWatch } from 'gulp';
import { bumpRootFiles, bumpSass } from './gulp/bump';
import { serve, reload } from './gulp/browserSync';
import images from './gulp/images';
import lintSass from './gulp/lintSass';
import minifyStyles from './gulp/minifyStyles';
import sass from './gulp/sass';
import scripts from './gulp/scripts';
import minifyScripts from './gulp/minifyScripts';
import translation from './gulp/translation';
import wc from './gulp/woocommerce';

// import watch from './gulp/watch';

/**
 * Create a task for all style related tasks.
 */
export const styles = series( lintSass, sass, minifyStyles );

/**
 * Create a task for all script related tasks.
 */
export const js = series( scripts, minifyScripts );

/**
 * Task to watch files because something is not working importing it from './gulp/watch' on Windows.
 * Paths are hard coded because globs from './gulp/config' are not triggering the series on Windows.
 */
task(
	'watchFiles',
	parallel(

		// () => gulpWatch('./lib/plugins/woocommerce/scss/**/*.scss', series(wc, reload)),
		() => gulpWatch( './js/src/*.js', series( js, reload ) ),
		() => gulpWatch( './scss/**/*.scss', series( styles, reload ) ),
		() => gulpWatch( './images/src/*.*', series( images, reload ) ),
		() =>
			gulpWatch(
				[ '*.php', './lib/*.php', './lib/**/*.php', './lib/**/**/*.php' ],
				series( reload )
			)
	)
);

/**
 * Create the watch task
 */
export const watch = series( serve, 'watchFiles' );

/**
 * Create an order of all the tasks and make it the default task.
 */
export const allTasks = series(
	lintSass,
	sass,
	minifyStyles,
	scripts,
	minifyScripts,
	images,
	serve,
	'watchFiles'
);

export default allTasks;

/**
 * Create the bump task.
 * Instructions can be found in the task.
 */
export const bump = parallel( bumpRootFiles, bumpSass );

/**
 * Export all imported functions as tasks
 */
export {
	lintSass,
	minifyStyles,
	sass,
	images,
	scripts,
	minifyScripts,
	serve,
	translation,
	wc
};
