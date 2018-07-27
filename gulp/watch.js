'use strict';

import { paths } from '../config/gulpConfig';
import { watch as gulpWatch, series } from 'gulp';
import { styles, scripts, images } from '../gulpfile.babel';
import { reload } from './browserSync';

/**********************
 * All Tasks Listeners
 *
 * Not working on Windows 10.
 * Please see gulpfile.babel.js for workaround.
 *********************/
export default function watch() {

	// Watch Scss files. Changes are injected into the browser from within the task.
	gulpWatch( paths.styles.partials, series( styles, reload ) );

	// Watch JavaScript files. Changes are injected into the browser from within the task.
	gulpWatch( paths.scripts.src, series( scripts, reload ) );

	// // Watch Image files. Changes are injected into the browser from within the task.
	gulpWatch( paths.images.src, series( images, reload ) );

	// // Watch PHP files and reload the browser if there is a change. Add directories if needed.
	gulpWatch( paths.php.src ).on( 'change', reload );
}
