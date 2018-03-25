<?php
/**
 * Theme initialization
 *
 * @package     ChristophHerr\Prometheus2
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */
namespace ChristophHerr\Prometheus2;

/**
 * Initialize the theme's constants.
 *
 * @since 1.0.0
 *
 * @return void
 */
function init_constants() {
	$child_theme = wp_get_theme();

	define( 'CHILD_THEME_NAME', $child_theme->get( 'Name' ) );
	define( 'CHILD_THEME_URL', $child_theme->get( 'ThemeURI' ) );
	define( 'CHILD_THEME_VERSION', $child_theme->get( 'Version' ) );
	define( 'CHILD_TEXT_DOMAIN', $child_theme->get( 'TextDomain' ) );
	define( 'CHILD_THEME_DIR', get_stylesheet_directory() );
}

init_constants();
