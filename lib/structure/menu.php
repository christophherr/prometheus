<?php
/**
 * Changes to the menus.
 *
 * @package     ChristophHerr\Prometheus2\Structure
 * @since       1.0.0
 * @author      Christoph Herr
 * @link        https://www.christophherr.com
 * @license     GNU General Public License 2+
 */

namespace ChristophHerr\Prometheus2\Structure;

use function ChristophHerr\Prometheus2\Utilities\is_amp_response;


add_action( 'genesis_setup', function() {

	// Repositions primary navigation menu.
	remove_action( 'genesis_after_header', 'genesis_do_nav' );
	add_action( 'genesis_header', 'genesis_do_nav', 12 );

	// Repositions the secondary navigation menu.
	remove_action( 'genesis_after_header', 'genesis_do_subnav' );
	add_action( 'genesis_footer', 'genesis_do_subnav', 10 );

	add_filter( 'wp_nav_menu_args', function( $args ) {

		if ( 'secondary' !== $args['theme_location'] ) {
			return $args;
		}

		$args['depth'] = 1;
		return $args;
	});
});

/**
 * Add mobile-responsive menu markup for AMP requests.
 *
 * Does not work for sub-menus right now.
 *
 * @since 2.0.0
 *
 * @return void
 */
add_action( 'wp_head', function() {

	if ( ! function_exists( 'ChristophHerr\Prometheus2\Utilities\is_amp_response' ) || ! is_amp_response() ) {
		return;
	}

	add_filter( 'genesis_markup_title-area_close', function( $close_html, $args ) {
		if ( $close_html ) {
			$close_html .= '<amp-state id="siteNavigationMenu"><script type="application/json">{"expanded": false}</script></amp-state>';
			$close_html .= '<button id="genesis-mobile-nav-primary" class="menu-toggle dashicons-before dashicons-menu" aria-expanded="false" aria-pressed="false" on="tap:AMP.setState( { siteNavigationMenu: { expanded: ! siteNavigationMenu.expanded } } )"
			[class]="siteNavigationMenu.expanded ? \'menu-toggle dashicons-before dashicons-menu activated\' : \'menu-toggle dashicons-before dashicons-menu\'" [aria-expanded]="siteNavigationMenu.expanded ? \'true\' : \'false\'" [aria-pressed]="siteNavigationMenu.expanded ? \'true\' : \'false\'">Menu</button>';
		}

		return $close_html;
	}, 10, 2 );

	add_filter( 'genesis_attr_nav-primary', function( $attributes ) {
		$attributes['class'] .= ' amp-nav';
		return $attributes;
	});
});
