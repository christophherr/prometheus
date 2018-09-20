<?php
/**
 * Prometheus 2.
 *
 * This file starts the Prometheus 2 Theme.
 *
 * @package ChristophHerr\Prometheus2
 * @author  Christoph Herr
 * @license GPL-2.0+
 * @link    https://www.christophherr.com/
 */

/**
 * Get the version of the Genesis framework.
 *
 * @since 2.0
 *
 * @return string
 */
function prometheus_2_get_genesis_version() {
	return wp_get_theme( 'genesis' )->get( 'Version' );
}

// Check minimum requirements.
if ( version_compare( $GLOBALS['wp_version'], '4.8', '<' ) || version_compare( PHP_VERSION, '5.6', '<' ) || version_compare( get_genesis_version(), '2.6', '<' ) ) {
	require_once 'lib/minimum-requirements.php';
	return;
}

// Start the Child Theme.
require_once 'lib/init.php';

// Load the Child Theme files.
require_once 'lib/functions/autoload.php';

// Start the Genesis Framework.
require_once get_template_directory() . '/lib/init.php';
