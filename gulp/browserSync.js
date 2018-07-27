'use strict';

import browserSync from 'browser-sync';
import { paths } from '../config/gulpConfig';

// Create a BrowserSync instance:
export const server = browserSync.create();

export function serve( done ) {
	server.init({
		proxy: `http://${paths.config.watch.siteName}`,
		host: paths.config.watch.siteName,
		port: paths.config.watch.port,
		notify: paths.config.watch.notify,
		open: paths.config.watch.open,
		browser: paths.config.watch.browser

		// https: {
		// 	key: paths.config.watch.httpsKey,
		// 	cert: paths.config.watch.httpsCert
		// }
	});
	done();
}

// Reload the site:
export function reload( done ) {
	if ( server.paused ) {
		server.resume();
	}

	server.reload({ stream: true });

	done();
}
