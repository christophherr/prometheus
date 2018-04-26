<?php
/**
 * Changes for Gutenberg.
 *
 * @package     ChristophHerr\Prometheus2\Gutenberg
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Gutenberg;

// Needs to run before admin_init.
add_action( 'after_setup_theme', function() {

	// add_theme_support( 'disable-custom-colors' ); -  Disables custom colors in block color palette.
	// Adds support for editor color palette.
	add_theme_support( 'editor-color-palette',
		'#f5f5f5',
		'#999999',
		'#333333',
		get_theme_mod( 'genesis_sample_link_color', genesis_sample_customizer_get_default_link_color() ),
		get_theme_mod( 'genesis_sample_accent_color', genesis_sample_customizer_get_default_accent_color() )
	);
});
