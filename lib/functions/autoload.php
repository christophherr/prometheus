<?php
/**
 * Autoloader for Prometheus 2
 *
 * @package     Prometheus2\Functions
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
	$filenames = array(
		'setup.php',
		// 'functions/formatting.php',
		'functions/load-assets.php',
		// 'functions/markup.php',
		'structure/layouts.php',
		'structure/gravatar-sizes.php',
		'structure/footer.php',
		'structure/header.php',
		'structure/menu.php',
		'structure/post.php',
		'structure/sidebar.php',
		'plugins/simple-social-icon-defaults.php',
		// 'plugins/woocommerce/woocommerce-setup.php',
		// 'plugins/woocommerce/woocommerce-output.php',
		'customizer/css-handler.php',
		'customizer/helpers.php',
		'customizer/customizer.php',
	);
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
	$filenames = array(
		'admin/metaboxes.php',
	);
	load_specified_files( $filenames );
}

/**
 * Load each of the specified files.
 *
 * @since 1.0.0
 *
 * @param array $filenames
 * @param string $folder_root
 *
 * @return void
 */
function load_specified_files( array $filenames, $folder_root = '') {
	$folder_root = $folder_root ?: CHILD_THEME_DIR . '/lib/';
	foreach ( $filenames as $filename ) {
		include( $folder_root . $filename );
	}
}

load_nonadmin_files();
