<?php
/**
 * Adds the CSS from the Customizer options.
 *
 * @package     Prometheus\Functions
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */
NAMESPACE Prometheus;

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\build_inline_css_from_customizer_settings' );
/**
* Checks the settings for the link color, and accent color.
* If any of these value are set the appropriate CSS is output.
*
* @since 1.0.0
*/
function build_inline_css_from_customizer_settings() {

	$prefix = get_settings_prefix();

	$handle  = defined( 'CHILD_THEME_NAME' ) && CHILD_THEME_NAME ? sanitize_title_with_dashes( CHILD_THEME_NAME ) : 'child-theme';

	$color_link = get_theme_mod( $prefix . '_link_color', get_default_link_color_from_customizer() );
	$color_accent = get_theme_mod( $prefix . '_accent_color', get_default_accent_color_from_customizer() );

	$css = '';



	$css .= ( get_default_link_color_from_customizer() !== $color_link ) ? sprintf( '

		a,
		.content-title a:focus,
		.content-title a:hover,
		.genesis-nav-menu a:focus,
		.genesis-nav-menu a:hover,
		.genesis-nav-menu .current-menu-item > a,
		.genesis-nav-menu .sub-menu .current-menu-item > a:focus,
		.genesis-nav-menu .sub-menu .current-menu-item > a:hover,
		.js nav button:focus,
		.js .menu-toggle:focus {
			color: %s;
		}
		', $color_link ) : '';

	$css .= ( get_default_accent_color_from_customizer() !== $color_accent ) ? sprintf( '

		button:focus,
		button:hover,
		input:focus[type="button"],
		input:focus[type="reset"],
		input:focus[type="submit"],
		input:hover[type="button"],
		input:hover[type="reset"],
		input:hover[type="submit"],
		.archive-pagination li a:focus,
		.archive-pagination li a:hover,
		.archive-pagination .active a,
		.button:focus,
		.button:hover,
		.sidebar .enews-widget input[type="submit"] {
			background-color: %s;
			color: %s;
		}
		', $color_accent, calculate_color_contrast( $color_accent ) ) : '';

	if ( $css ) {
		wp_add_inline_style( $handle, $css );
	}

}