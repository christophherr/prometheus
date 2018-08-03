'use strict';

// Make all installed plugins available to tasks.
export const gulpPlugins = require('gulp-load-plugins')();

// Root path is where npm run commands happen
export const rootPath = process.env.INIT_CWD;

// Project paths
export const paths = {
	config: {
		theme: {
			author: 'Christoph Herr <info@christophherr.com>',
			domain: 'prometheus2',
			package: 'prometheus-2',
			bugs: 'https://github.com/christophherr/prometheus/issues'
		},
		watch: {
			siteName: 'genesis.test',
			port: 8000,
			notify: false,
			open: 'external',
			browser: 'chrome',
			httpsKey: 'path/to/your/key/file/placeholder.key',
			httpsCert: `path/to/your/cert/file/siteName.crt`
		}
	},
	php: {
		src: [
			`${rootPath}/*.php`,
			`${rootPath}/lib/*.php`,
			`${rootPath}/lib/**/*.php`,
			`${rootPath}/lib/**/**/*.php`
		]
	},
	styles: {
		src: `${rootPath}/scss/*.scss`,
		partials: `${rootPath}/scss/**/*.scss`,
		minSrc: [`${rootPath}/*.css`, `!${rootPath}/*.min.css`],
		dest: `${rootPath}/`
	},
	wcStyles: {
		src: `${rootPath}/lib/plugins/woocommerce/scss/prometheus2-woocommerce.scss`,
		partials: `${rootPath}/lib/plugins/woocommerce/scss/**/*.scss`,
		minSrc: [
			`${rootPath}/lib/plugins/woocommerce/*.css`,
			`!${rootPath}/lib/plugins/woocommerce/*.min.css`
		],
		dest: `${rootPath}/lib/plugins/woocommerce/`
	},
	scripts: {
		src: `${rootPath}/js/src/*.js`,
		minSrc: [`${rootPath}/js/*.js`, `!${rootPath}/js/*.min.js`],
		min: `${rootPath}/js/*.min.js`,
		dest: `${rootPath}/js/`
	},
	images: {
		src: [`${rootPath}/images/src/*.{jpg,JPG,png,svg}`],
		dest: `${rootPath}/images/`
	},
	languages: {
		src: [
			`${rootPath}/config/*.php`,
			`${rootPath}/*.php`,
			`${rootPath}/lib/*.php`,
			`${rootPath}/lib/**/*.php`,
			`${rootPath}/lib/**/**/*.php`
		],
		dest: `${rootPath}/languages/prometheus-2.pot`
	}
};
