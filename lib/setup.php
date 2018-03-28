<?php
/**
 * Theme setup functions
 *
 * @package     ChristophHerr\Prometheus2
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2;

add_action( 'genesis_setup', function() {
	// Sets Localization (do not remove).
	load_child_theme_textdomain( 'CHILD_TEXT_DOMAIN', CHILD_THEME_DIR . '/languages' );

	adds_theme_supports();

	// Sets theme defaults.
	add_filter( 'genesis_theme_settings_defaults', function( array $defaults ) {
		$config = require_once get_stylesheet_directory() . '\config\theme-settings-defaults.php';

		$defaults = wp_parse_args( $config, $defaults );
		return $defaults;
	});

	// Don't load deprecated functions.
	add_filter( 'genesis_load_deprecated', '__return_false' );
});

/**
 * Adds theme supports to the child theme.
 *
 * @since 1.0.0
 *
 * @return void
 */
function adds_theme_supports() {
	$config = require_once get_stylesheet_directory() . '\config\theme-supports-config.php';

	foreach ( $config as $feature => $args ) {
		add_theme_support( $feature, $args );
	}
}

add_action( 'after_switch_theme', function () {
	$config = require_once get_stylesheet_directory() . '\config\theme-settings-defaults.php';

	if ( function_exists( 'genesis_update_settings' ) ) {
		genesis_update_settings( $config );
	}
	update_option( 'posts_per_page', $config['blog_cat_num'] );
});

// Sets the content width based on the theme's design and stylesheet.
if ( ! isset( $content_width ) ) {
	$content_width = 702; // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound -- Valid use case.
}
