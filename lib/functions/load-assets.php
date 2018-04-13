<?php
/**
 * Asset loader handler
 *
 * The js-no-js script is enqueueud from no-js.php for easier enabling/disabling of the feature.
 *
 * @package     ChristophHerr\Prometheus2\Functions
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Functions;

use ChristophHerr\Prometheus2\Utilities;

add_action( 'wp_enqueue_scripts', function() {

	wp_enqueue_style(
		'prometheus2-fonts',
		'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,700',
		[],
		CHILD_THEME_VERSION
	);
	wp_enqueue_style( 'dashicons' );

	$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
	wp_enqueue_script(
		'prometheus2-responsive-menu',
		get_stylesheet_directory_uri() . "/js/responsive-menus{$suffix}.js",
		[ 'jquery' ],
		CHILD_THEME_VERSION,
		true
	);

	wp_localize_script(
		'prometheus2-responsive-menu',
		'genesis_responsive_menu',
		responsive_menu_settings()
	);

	wp_enqueue_script(
		'prometheus2',
		get_stylesheet_directory_uri() . "/js/prometheus2{$suffix}.js",
		[ 'jquery' ],
		CHILD_THEME_VERSION,
		true
	);
});

/**
 * Defines responsive menu settings.
 *
 * @since 2.3.0
 *
 * @return array
 */
function responsive_menu_settings() {
	$file   = get_stylesheet_directory() . '/config/responsive-menu-settings.php';
	$config = Utilities\maybe_require_files( $file );

	if ( $config ) {
		return $config;
	}
}
