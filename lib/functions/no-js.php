<?php
/**
 * Adds a no-js body class.
 * Used to hide the desktop menu on slow mobile networks.
 *
 * @package     ChristophHerr\Prometheus2\Functions
 * @since       1.0.0
 * @author      Gary Jones
 * @link        https://github.com/GaryJones/genesis-js-no-js/
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Functions;

use function ChristophHerr\Prometheus2\Utilities\is_amp_response;

/**
 * Add the no-js body class if it is not an AMP request.
 *
 * @since 2.0.0
 *
 * @return void
 */
add_action( 'wp_head', function() {

	if ( function_exists( 'ChristophHerr\Prometheus2\Utilities\is_amp_response' ) && is_amp_response() ) {
			return;
	}

	add_filter( 'body_class', function( array $classes ) {
		$classes[] = 'no-js';
		return $classes;
	});
});

/**
 * Add the no-js script if it is not an AMP request.
 *
 * @since 2.0.0
 *
 * @return void
 */
add_action( 'wp_enqueue_scripts', function() {

	if ( function_exists( 'ChristophHerr\Prometheus2\Utilities\is_amp_response' ) && is_amp_response() ) {
		return;
	}

	$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
	wp_enqueue_script(
		'prometheus2NoJs',
		get_stylesheet_directory_uri() . "/js/prometheus2-nojs{$suffix}.js",
		[],
		CHILD_THEME_VERSION,
		false
	);
});
