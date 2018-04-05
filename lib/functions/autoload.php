<?php
/**
 * Autoloader for Prometheus 2
 *
 * @package     ChristophHerr\Prometheus2\Functions
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Functions;

/**
 * Loads nonadmin files
 *
 * @since 1.0.0
 *
 * @return void
 */
function load_nonadmin_files() {
	$config = get_stylesheet_directory() . '/config/autoload-nonadmin-files.php';

	if ( ! is_readable( $config ) ) {
		\ChristophHerr\Prometheus2\config_unavailable_message();
		return;
	}

	$filenames = require $config;
	load_specified_files( $filenames );
}

add_action( 'admin_init', __NAMESPACE__ . '\load_admin_files' );
/**
 * Loads admin files.
 *
 * @since 1.0.0
 *
 * @return void
 */
function load_admin_files() {
	$config = get_stylesheet_directory() . '/config/autoload-admin-files.php';

	if ( ! is_readable( $config ) ) {
		\ChristophHerr\Prometheus2\config_unavailable_message();
		return;
	}

	$filenames = require $config;
	load_specified_files( $filenames );
}

/**
 * Load each of the specified files.
 *
 * @since 1.0.0
 *
 * @param array  $filenames Array of filenames to load.
 * @param string $folder_root Root of the file folder structure.
 *
 * @return void
 */
function load_specified_files( array $filenames, $folder_root = '' ) {
	$folder_root = $folder_root ?: get_stylesheet_directory() . '/lib/';
	foreach ( $filenames as $filename ) {
		include $folder_root . $filename;
	}
}

load_nonadmin_files();
