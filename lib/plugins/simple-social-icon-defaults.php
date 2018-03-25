<?php
/**
 * Simple Social Icon Default Settings
 *
 * @package     ChristophHerr\Prometheus2
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */
namespace ChristophHerr\Prometheus2\Plugins;

add_filter( 'simple_social_default_styles', function( $defaults ) {
	$args = array(
		'alignment'              => 'alignleft',
		'background_color'       => '#f5f5f5',
		'background_color_hover' => '#333333',
		'border_radius'          => 3,
		'border_width'           => 0,
		'icon_color'             => '#333333',
		'icon_color_hover'       => '#ffffff',
		'size'                   => 40,
	);

	$args = wp_parse_args( $args, $defaults );
	return $args;
});
