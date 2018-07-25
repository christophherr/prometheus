/* eslint-env es6 */
'use strict';

/**
 * Prometheus 2.
 *
 * This file adds Gulp tasks to the Prometheus 2 theme.
 *
 * @author Christoph Herr
 */

import { parallel, series } from 'gulp';
import { bumpRootFiles, bumpSass } from './gulp/bump';
import { serve } from './gulp/browserSync';
import images from './gulp/images';
import lintSass from './gulp/lintSass';
import minifyStyles from './gulp/minifyStyles';
import sass from './gulp/sass';
import scripts from './gulp/scripts';
import minifyScripts from './gulp/minifyScripts';
import watch from './gulp/watch';

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
	watch
);

export default allTasks;

/**
 * Create a task for all style related tasks.
 */
export const styles = series(lintSass, sass, minifyStyles);

/**
 * Create a task for all script related tasks.
 */
export const js = series(scripts, minifyScripts);

/**
 * Create the bump task.
 * Instructions can be found in the task.
 */
export const bump = parallel(bumpRootFiles, bumpSass);

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
	watch
};
