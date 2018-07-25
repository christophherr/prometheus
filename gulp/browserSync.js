'use strict';

import browserSync from 'browser-sync';

// Create a BrowserSync instance:
export const server = browserSync.create();

const siteName = 'genesis.test';

export function serve( done ) {
	server.init({
		proxy: `http://${siteName}`,
		host: siteName,
		port: 8000,
		notify: false,
		open: 'external',
		browser: 'chrome'

		// https: {
		// 	key: 'path/to/your/key/file/genesis.key',
		// 	cert: `path/to/your/cert/file/${siteName}.crt`
		// }
	});
	done();
}

// Reload the site:
export function reload( done ) {
	server.reload({ stream: true });

	done();
}
