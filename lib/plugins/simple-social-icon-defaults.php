<?php
/**
 * Simple Social Icon Default Settings
 *
 * @package     ChristophHerr\Prometheus2\Plugins
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Plugins;

use ChristophHerr\Prometheus2\Utilities;

add_filter( 'simple_social_default_styles', function( $defaults ) {
	$file = get_stylesheet_directory() . '/config/simple-social-icon-settings.php';
	$args = Utilities\maybe_require_files( $file );

	if ( ! $args ) {
		return $defaults;
	}

	$args = wp_parse_args( $args, $defaults );
	return $args;
});
