<?php
/**
 * This file makes changes to the Customizer.
 *
 * @package     ChristophHerr\Prometheus2\Customizer
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Customizer;

// Remove header settings and AdSense ID setting from Customizer.
add_filter( 'genesis_customizer_theme_settings_config', function( $config ) {
	unset( $config['genesis']['sections']['genesis_header'] );
	return $config;
});


